/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.3
 */
/*!
 * @maddimathon/utility-typescript@0.4.3
 * @license MIT
 */
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { arrayUnique, mergeArgs, timestamp, typeOf, } from '../functions/index.js';
/**
 * Inspects the value of a variable for debugging.
 *
 * Can statically return a readable string ({@link VariableInspector.stringify})
 * or output it straight to console ({@link VariableInspector.dump}).  By
 * constructing an instance, you can get individual parts of the output
 * inspection ({@link VariableInspector.prefix}, {@link VariableInspector.type},
 * {@link VariableInspector.value}) or get a json-compatible object representing
 * the inspected value {@link VariableInspector.toJSON}.
 *
 * Not currently tested, marked beta.
 *
 * @example
 * ```ts
 * VariableInspector.dump( { mysteryVariable } );
 * // console: 'mysteryVariable = <type> ...'
 * ```
 *
 * @beta
 */
export class VariableInspector extends AbstractConfigurableClass {
    /* STATIC METHODS
     * ====================================================================== */
    /**
     * Alias for `new VariableInspector( ...).dump()`.
     *
     * @category Static
     *
     * @see {@link VariableInspector.dump}
     */
    static dump(...params) {
        const vi = new VariableInspector(...params);
        return vi.dump();
    }
    /**
     * Alias for `new VariableInspector( ...).toString()`.
     *
     * @category Static
     *
     * @see {@link VariableInspector.toString}
     */
    static stringify(...params) {
        const vi = new VariableInspector(...params);
        return vi.toString();
    }
    /**
     * Validates the first input parameter to ensure it is an object with a single string key.
     *
     * @category Static
     *
     * @see {@link VariableInspector.constructor}
     */
    static validateInput(variable) {
        const inputKeys = Object.keys(variable);
        const inputHasOneStringKey = inputKeys.length === 1
            && typeof inputKeys[0] === 'string';
        // returns
        if (inputHasOneStringKey) {
            return variable;
        }
        return { 'var': variable };
    }
    /** Testing ==================================== **/
    /**
     * Used for testing.
     *
     * @internal
     */
    static get _testClass() {
        class TestClass {
            constructor() {
                this.property = 'property sample value';
                this._getSet = '_getSet sample value';
            }
            static methodName(param) { return param; }
            get getSetProp() { return this._getSet; }
            set getSetProp(param) { this._getSet = param; }
        }
        ;
        return TestClass;
    }
    /**
     * Used for testing.
     *
     * @internal
     */
    static _testVars(verbose) {
        const TestClass = VariableInspector._testClass;
        const classInstance = new TestClass();
        const vars = {
            undefined,
            null: null,
            true: true,
            false: false,
            bigint: BigInt(9007199254740991),
            number: Number(207),
            'NaN': Number.NaN,
            string: 'string sample value',
            stringMultiline: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec bibendum in\njusto vulputate euismod.Vivamus vel lectus dolor.Curabitur ullamcorper\ninterdum diam, sit amet pulvinar odio tristique eget.Pellentesque sodales\naliquam ex in convallis.Morbi tristique, risus et imperdiet aliquam, libero\ndolor faucibus lacus, in tempus metus elit non ante.`,
            array: ['string sample value', Number(207), {},],
            objectEmpty: {},
            objectSimple: {
                one: 1,
                two: 2,
            },
            date: new Date('2024-02-08'),
            regex: /^regex$/g,
            functionSimple: () => { return 'hello'; },
            functionParams: (value1, value2) => { const test = value2; return test + value1; },
            'class': TestClass,
            classInstance,
        };
        if (!verbose) {
            delete vars['undefined'];
            delete vars['true'];
            delete vars['bigint'];
            delete vars['stringMultiline'];
            delete vars['array'];
            delete vars['objectEmpty'];
            delete vars['objectSimple'];
            delete vars['date'];
            delete vars['regex'];
            delete vars['functionSimple'];
            delete vars['functionParams'];
            delete vars['class'];
            delete vars['classInstance'];
        }
        return vars;
    }
    /**
     * Used for testing.
     *
     * @internal
     */
    static get sampleComplexObject() {
        const t = VariableInspector._testVars(true);
        return {
            undefined: t.undefined,
            null: t.null,
            true: t.true,
            false: t.false,
            bigint: t.bigint,
            number: t.number,
            NaN: t.NaN,
            string: t.string,
            stringMultiline: t.stringMultiline,
            array: t.array,
            objectEmpty: t.objectEmpty,
            objectSimple: t.objectSimple,
            date: t.date,
            regex: t.regex,
            functionParams: t.functionParams,
        };
    }
    /**
     * Prints sample output to the console via VariableInspector.dump().
     *
     * @category Static
     *
     * @returns  An example, constructed instance for a sample object.
     */
    static sample(_args = {}) {
        console.log('\nVariableInspector.sample() @ ' + timestamp(null, { date: true, time: true }));
        console.log('\n');
        const args = VariableInspector.prototype.buildArgs({
            debug: true,
            ...(_args !== null && _args !== void 0 ? _args : {})
        });
        /**
         * Calls `VariableInspector.dump() with args.`.
         */
        const varDump = (variable) => {
            VariableInspector.dump(variable, args);
            console.log('\n');
        };
        const t = VariableInspector._testVars(!!args.debug);
        for (const key in t) {
            varDump({ [key]: t[key] });
        }
        const complexVarInspect = new VariableInspector({ complexObject: VariableInspector.sampleComplexObject }, args);
        complexVarInspect.dump();
        console.log('\n');
        return complexVarInspect;
    }
    /* LOCAL PROPERTIES
     * ====================================================================== */
    get ARGS_DEFAULT() {
        return {
            childArgs: {
                includeValue: true,
            },
            debug: false,
            equalString: ' =',
            fallbackToJSON: true,
            formatter: null,
            includePrefix: true,
            includeType: true,
            includeValue: true,
            indent: '    ',
            inspectClasses: false,
            inspectFunctions: false,
            locale: 'en-CA',
            localizeDates: true,
            localizeDateOptions: {},
            localizeNumbers: false,
            localizeNumberOptions: {},
            argsRecursive: false,
            stringQuoteCharacter: '"',
        };
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = AbstractConfigurableClass.abstractArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        // UPGRADE - this could probably use better typing
        return mergeArgs(mergedDefault, args, false);
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     *
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    constructor(variable, args = {}) {
        super(args);
        const validVar = VariableInspector.validateInput(variable);
        this._name = Object.keys(validVar)[0];
        this._rawValue = validVar[this._name];
        this._typeOf = typeOf(this._rawValue);
        // must be last so that this._rawValue and this._typeOf are set
        this._properties = this.indexProperties();
    }
    /* LOCAL METHODS
     * ====================================================================== */
    /**
     * Formats an object property name into a string for display.
     *
     * @category Formatters
     */
    keyFormatter(key) {
        // returns for number and string
        switch (typeof key) {
            case 'number':
                return key.toString();
            case 'string':
                return `"${key}"`;
        }
        return `{${String(key)}}`;
    }
    /**
     * Builds an array of the property names.  Used by {@link VariableInspector.indexProperties}
     *
     * @category Inputs
     */
    getPropertyNames() {
        // returns on array or unsupported types
        switch (this._typeOf) {
            case 'array':
                const indices = [];
                for (let index = 0; index < this._rawValue.length; index++) {
                    indices.push(index);
                }
                indices.push('length');
                return indices;
            case 'object':
                break;
            default:
                return [];
        }
        const propertyNames = [
            Object.keys(this._rawValue),
            Object.getOwnPropertyNames(this._rawValue),
            Object.getOwnPropertySymbols(this._rawValue),
            // Object.getOwnPropertyDescriptors( this._rawValue as object ) as PropName[],
        ].flat().filter(name => name !== '_getSet');
        return arrayUnique(propertyNames);
    }
    /**
     * Builds an array of the properties for the current {@link VariableInspector._rawValue| this._rawValue()}.
     *
     * @category Inputs
     */
    indexProperties() {
        var _a;
        const properties = [];
        // returns
        if (!this._rawValue) {
            return properties;
        }
        // returns if it doesn't match a supported type
        switch (this._typeOf) {
            case 'array':
            case 'object':
                const constructorName = (_a = this._rawValue.constructor) === null || _a === void 0 ? void 0 : _a.name;
                // returns on match
                switch (constructorName) {
                    case 'Date':
                    case 'RegExp':
                        return properties;
                }
                break;
            default:
                return properties;
        }
        const propertyNames = this.getPropertyNames();
        // now add them to the array
        propertyNames.forEach((name) => {
            const value = this._rawValue[name];
            properties.push({
                key: {
                    name: name,
                    type: typeof name,
                },
                vi: this._new({ [this.keyFormatter(name)]: value }, {
                    equalString: ':',
                    includePrefix: true,
                })
            });
        });
        return properties;
    }
    /* Compilers ===================================== */
    /**
     * Applies any formatting functions as defined in the args.
     *
     * @category Formatters
     *
     * @see {@link VariableInspector.Formatter}
     * @see {@link VariableInspector.Args['formatter']}
     *
     * @param stage  The stage being formatted.
     * @param str    Value to format.
     *
     * @return  Formatted value.
     */
    formatter(stage, str) {
        // returns
        if (!this.args.formatter) {
            return str;
        }
        // returns
        if (typeof this.args.formatter[stage] === 'function') {
            return this.args.formatter[stage](str);
        }
        // returns
        if (stage === '_') {
            return str;
        }
        // returns if stage formatter exists
        if (stage === 'via') {
            if (typeof this.args.formatter.type === 'function') {
                return this.args.formatter.type(str);
            }
        }
        // returns
        if (typeof this.args.formatter._ === 'function') {
            return this.args.formatter._(str);
        }
        return str;
    }
    /**
     * Prefix to print, not including the {@link VariableInspector.type}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    prefix(skipFormatting = false) {
        const str = this._name + this.args.equalString;
        // returns
        if (skipFormatting) {
            return str;
        }
        return this.formatter('prefix', str);
    }
    /**
     * String to print for variable type.
     *
     * In the case of non-Object objects with a constructor, the class name is
     * displayed.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    type(skipFormatting = false) {
        var _a;
        /** Filters the type value before return. */
        const typeFilter = (str) => {
            str = str.replace(/(^[\n\s]+|[\n\s]+$)/gi, '');
            // returns
            if (skipFormatting) {
                return str;
            }
            return this.formatter('type', `<${str}>`);
        };
        // returns on match
        switch (this._typeOf) {
            case 'NaN':
                return typeFilter(typeof Number.NaN);
            case 'object':
                const constructorName = (_a = this._rawValue.constructor) === null || _a === void 0 ? void 0 : _a.name;
                return typeFilter(constructorName === 'Object'
                    ? 'object'
                    : constructorName);
        }
        return typeFilter(this._typeOf);
    }
    /**
     * Representation of the variable’s value to print, not including the
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    value(skipFormatting = false) {
        var _a;
        /**
         * Returns a string formatted to represent the
         * value-getting method. (e.g., when using a fallback)
         */
        const via = (viaMethod) => {
            const str = `<via ${viaMethod}>`;
            return skipFormatting ? str : this.formatter('via', str);
        };
        /** Filters the type value before return. */
        const valueFilter = (str, viaMethod) => {
            const ret = [];
            if (viaMethod) {
                ret.push(via(viaMethod));
            }
            if (!this.args.includeType) {
                if (typeof str === 'undefined') {
                    str = 'undefined';
                }
                else if (str === null) {
                    str = 'NULL';
                }
            }
            if (skipFormatting) {
                ret.push(str !== null && str !== void 0 ? str : '');
            }
            else {
                ret.push(this.formatter('value', str !== null && str !== void 0 ? str : ''));
            }
            return ret.join(' ');
        };
        /**
         * PARSE BY TYPE
         */
        // returns on match
        switch (this._typeOf) {
            case 'null':
            case 'undefined':
                return valueFilter(this._rawValue);
            case 'bigint':
            case 'number':
                return valueFilter(this.args.localizeNumbers
                    ? this._rawValue.toLocaleString(this.args.locale, this.args.localizeNumberOptions)
                    : this._rawValue.toString());
            case 'boolean':
                return valueFilter(this._rawValue.toString().toUpperCase());
            case 'class':
                let classValue = this._rawValue.prototype.constructor.name + ' {}';
                if (this.args.inspectClasses) {
                    classValue = this._rawValue.toString();
                }
                return valueFilter(classValue);
            case 'function':
                let functionValue = this._rawValue.toString();
                const paramRegex = /^\s*\(([^\(|\)]*)\)\s*(\=\>|\{).*$/gs;
                if (!this.args.inspectFunctions) {
                    if (!functionValue.match(paramRegex)) {
                        functionValue = '';
                    }
                    else {
                        functionValue = functionValue.replace(paramRegex, '( $1 )')
                            .replace(/\s*\b\s*,\s*\b\s*/gs, ', ')
                            .replace(/^\s*\(\s+\)\s*$/gs, '()');
                    }
                }
                return valueFilter(functionValue);
            case 'NaN':
                return valueFilter(this._rawValue.toString());
            case 'array':
            case 'object':
                switch ((_a = this._rawValue.constructor) === null || _a === void 0 ? void 0 : _a.name) {
                    /**
                     * DATE
                     */
                    case 'Date':
                        const date = this._rawValue;
                        return valueFilter(this.args.localizeDates
                            ? date.toLocaleString(this.args.locale, this.args.localizeDateOptions)
                            : date.toString());
                    /**
                     * toString() classes
                     */
                    case 'RegExp':
                        return valueFilter(this._rawValue.toString().replace(/\\/g, '\\\\'));
                }
                return valueFilter(this._valueAsObject());
            case 'string':
                return valueFilter(this.args.stringQuoteCharacter + this._rawValue + this.args.stringQuoteCharacter);
        }
        /**
         * FALLBACK
         * Check for json-ing methods
         */
        // returns if json-ing method is found and returns a string
        if (this.args.fallbackToJSON) {
            for (const fn of [
                'toJSON',
                // 'valueOf',
            ]) {
                if (typeof this._rawValue[fn] === 'function') {
                    const fnReturn = this._rawValue[fn]();
                    if (fnReturn) {
                        return `${via(`.${fn}()`)} ${JSON.stringify(fnReturn, null, 4)}`;
                    }
                }
            }
        }
        /**
         * FALLBACK
         * Check for string-ing methods
         */
        // returns if string-ing method is found and returns a string
        for (const fn of [
            'toString',
            'stringify',
        ]) {
            if (typeof this._rawValue[fn] === 'function') {
                const fnReturn = this._rawValue[fn]();
                if (typeof fnReturn === 'string') {
                    return `${via(`.${fn}()`)} ${fnReturn}`;
                }
            }
        }
        /**
         * FALLBACK
         * Interpolation
         */
        return `${via('interpolation')} ${String(this._rawValue)}`;
    }
    /* Exporters ===================================== */
    /**
     * Print the contents to the console.
     *
     * @category Exporters
     */
    dump() {
        return console.log(this.toString());
    }
    ;
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON() {
        const json = {
            name: this._name,
            type: this._typeOf,
            inspection: this.value(true),
        };
        const properties = {};
        this._properties.forEach((property) => {
            properties[property.key.name] = {
                key: property.key,
                value: property.vi.toJSON(),
            };
        });
        json.properties = properties;
        return json;
    }
    /**
     * Overrides the default function to return a string representation of the
     * inspected variable’s value.
     *
     * @category Exporters
     *
     * @see {@link AbstractConfigurableClass.toString)}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString() {
        const strs = [
            this.args.includePrefix ? this.prefix() : false,
            this.args.includeType ? this.type() : false,
            this.args.includeValue ? this.value() : false,
        ];
        return strs.filter(v => v).join(' ');
    }
    /**
     * Overrides the default function to return a string representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf | Object.prototype.valueOf()}
     * @see {@link VariableInspector.toJSON | VariableInspector.toJSON()}
     */
    valueOf() { return this.toJSON(); }
    /* Recursion ===================================== */
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    _new(variable, args = {}) {
        var _a, _b, _c;
        const fullArgs = this.buildArgs({
            ...this.args,
            ...this.args.childArgs,
            ...args,
        });
        fullArgs.formatter = this.mergeArgs((_a = this.args.formatter) !== null && _a !== void 0 ? _a : {}, this.mergeArgs((_b = this.args.childArgs.formatter) !== null && _b !== void 0 ? _b : {}, (_c = args.formatter) !== null && _c !== void 0 ? _c : {}));
        return new VariableInspector(variable, fullArgs);
    }
    /* Translators ===================================== */
    /**
     * Creates a readable representation of {@link VariableInspector._rawValue}
     * as if its type is object (including arrays).
     *
     * @category Translators
     */
    _valueAsObject() {
        const openBrace = this._typeOf === 'array' ? '[' : '{';
        const closeBrace = this._typeOf === 'array' ? ']' : '}';
        // returns
        if (!this._properties.length) {
            return openBrace + closeBrace;
        }
        const propStrs = this._properties.map(prop => prop.vi.toString());
        /**
         * Used to map each line of a property string.
         */
        const lineMapper = (line) => this.args.indent + line;
        /**
         * String before each property string.
         */
        const propPrefix = propStrs.length > 2 ? '\n' : '';
        /**
         * Used to map each property string.
         */
        const propMapper = (str) => propPrefix + str.split(/\n/g).map(lineMapper).join('\n');
        return [
            openBrace,
            ...propStrs.map(propMapper),
            closeBrace,
        ].join('\n');
    }
}
//# sourceMappingURL=VariableInspector.js.map