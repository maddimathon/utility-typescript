/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.4
 * @license MIT
 */
import { arrayUnique } from '../functions/arrays/arrayUnique.js';
import { timestamp } from '../functions/strings/timestamp.js';
import { typeOf } from '../functions/typeOf.js';
import { MiniConsole } from './MiniConsole.js';
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
 * @category Classes
 *
 * @since 0.1.1
 * @since 2.0.0-beta.3 — Added support for objects with public `toVariableInspection()` method to change the value to be inspected. Added T_InspectionType type param.
 *
 * @example
 * ```ts
 * VariableInspector.dump( { mysteryVariable } );
 * // console: 'mysteryVariable = <type> ...'
 * ```
 *
 * @experimental
 */
export class VariableInspector {
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
    /** Testing ==================================== **/
    /**
     * Used for testing.
     *
     * @category Static
     *
     * @internal
     */
    static get sampleComplexObject() {
        const { undefined, null: null_val, true: true_val, false: false_val, bigint, number, NaN, string, stringMultiline, array, set, objectEmpty, objectSimple, map, date, regex, functionParams, } = VariableInspector.Samples.getVars(true);
        return {
            undefined,
            null: null_val,
            true: true_val,
            false: false_val,
            bigint,
            number,
            NaN,
            string,
            stringMultiline,
            array,
            set,
            objectEmpty,
            objectSimple,
            map,
            date,
            regex,
            functionParams,
        };
    }
    /**
     * Prints sample output to the console via VariableInspector.dump().
     *
     * @category Static
     *
     * @returns  An example, constructed instance for a sample object.
     */
    static sample(_args, _console) {
        const console = _console ?? new MiniConsole();
        console.log('\nVariableInspector.sample() @ ' + timestamp(null, { date: true, time: true }));
        console.log('\n');
        const args = {
            ...VariableInspector.prototype.ARGS_DEFAULT,
            debug: true,
            ..._args,
            console,
        };
        /**
         * Calls `VariableInspector.dump() with args.`.
         */
        const varDump = (variable) => {
            VariableInspector.dump(variable, args);
            console.log('\n');
        };
        const t = VariableInspector.Samples.getVars(!!args.debug);
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
    /**
     * A completed args object.
     *
     * @category Args
     */
    args;
    /**
     * @category Args
     *
     * @source
     */
    get ARGS_DEFAULT() {
        return {
            childArgs: {
                includeValue: true,
            },
            /**
             * @since 2.0.0-beta.3
             */
            console: new MiniConsole(),
            debug: false,
            equalString: ' =',
            fallbackToJSON: true,
            /**
             * @since 2.0.0-beta.3
             */
            formatKeys: true,
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
            stringQuoteCharacter: '"',
        };
    }
    /**
     * @since 2.0.0-beta.3
     */
    console;
    /**
     * Default name for unnamed variables passed for inspection.
     *
     * @since 2.0.0-beta.3
     */
    _defaultName = 'variable';
    /**
     * Value to inspect.
     *
     * @category Inputs
     *
     * @expandType T_InspectionType
     *
     * @since 2.0.0-beta.3
     */
    _inspectionValue;
    /**
     * Value’s name, used in output.
     *
     * @category Inputs
     */
    _name;
    /**
     * Value to inspect as passed to the constructor.
     *
     * @category Inputs
     */
    _rawValue;
    /**
     * Alias for this.typeOf( this._rawValue ).
     *
     * @category Inputs
     *
     * @expandType typeOf.Return
     */
    _typeOf;
    /**
     * These are the properties of the input object, if any.
     *
     * @category Inputs
     */
    _properties;
    /**
     * @since 2.0.0-beta.3
     */
    get properties() {
        return this._properties;
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * @category Constructor
     *
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    constructor(variable, args = {}, 
    /**
     * @since 2.0.0-beta.3
     */
    console) {
        this.args = {
            ...this.ARGS_DEFAULT,
            ...args,
        };
        this.console = console ?? new MiniConsole();
        const params = this._parseInputParams(this._validateInputVariable(variable));
        this._name = params.name;
        this._rawValue = params.rawValue;
        this._inspectionValue = params.inspectionValue;
        this._typeOf = params.typeOf;
        // must be last so that this._inspectionValue and this._typeOf are set
        this._properties = this._indexProperties();
    }
    /**
     * @category Inputs
     *
     * @see {@link VariableInspector.constructor}
     *
     * @since 2.0.0-beta.3
     */
    _parseInputParams(validVar) {
        const name = Object.keys(validVar)[0] ?? this._defaultName;
        const rawValue = validVar[name];
        const rawOrObject = typeof rawValue === 'object' ? rawValue : false;
        const inspectionValue = (rawOrObject
            && typeof rawOrObject.toVariableInspection === 'function')
            ? rawOrObject.toVariableInspection()
            : rawValue;
        // this.console.log( { inspectionValue } );
        return {
            name,
            rawValue,
            inspectionValue,
            typeOf: typeOf(inspectionValue),
        };
    }
    /**
     * Validates the first input parameter to ensure it is an object with a
     * single string key.
     *
     * @category Inputs
     *
     * @see {@link VariableInspector.constructor}
     *
     * @since 2.0.0-beta.3 — Renamed from validateInput to _validateInputVariable.
     * Changed from static to local.
     */
    _validateInputVariable(variable) {
        const inputKeys = Object.keys(variable);
        const inputHasOneStringKey = inputKeys.length === 1
            && typeof inputKeys[0] === 'string';
        // returns
        if (inputHasOneStringKey) {
            return variable;
        }
        return { [this._defaultName]: variable };
    }
    /* LOCAL METHODS
     * ====================================================================== */
    /**
     * Formats an object property name into a string for display.
     *
     * @category Formatters
     *
     * @since 2.0.0-beta.3 — Renamed from keyFormatter to _keyFormatter.
     */
    _keyFormatter(key) {
        // returns
        if (!this.args.formatKeys) {
            return String(key);
        }
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
     * Builds an array of the property names.  Used by
     * {@link VariableInspector._indexProperties}
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from getPropertyNames to _getPropertyNames.
     */
    _getPropertyNames() {
        // returns on array or unsupported types
        switch (this._typeOf) {
            case 'array':
                const indices = [];
                for (let index = 0; index < this._inspectionValue.length; index++) {
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
            Object.keys(this._inspectionValue),
            Object.getOwnPropertyNames(this._inspectionValue),
            Object.getOwnPropertySymbols(this._inspectionValue),
            // Object.getOwnPropertyDescriptors( this._inspectionValue as object ),
        ].flat().filter(name => name !== '_getSet');
        return arrayUnique(propertyNames);
    }
    /**
     * Builds an array of the properties for the current
     * {@link VariableInspector._inspectionValue| this._inspectionValue}.
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from indexProperties to _indexProperties.
     */
    _indexProperties() {
        const properties = [];
        // returns
        if (!this._inspectionValue) {
            return properties;
        }
        // returns if it doesn't match a supported type
        switch (this._typeOf) {
            case 'array':
            case 'object':
                const value = this._inspectionValue;
                // returns
                if (value instanceof Date || value instanceof RegExp) {
                    return properties;
                }
                // returns
                if (value instanceof Map) {
                    return Array.from(this._inspectionValue.entries(), ([key, value]) => ({
                        key: {
                            name: key,
                            type: typeof key,
                        },
                        vi: this._new({ [this._keyFormatter(key)]: value }, {
                            equalString: ':',
                            includePrefix: true,
                        }),
                    }));
                }
                // returns
                if (value instanceof Set) {
                    return Array.from(this._inspectionValue.values(), (value, index) => ({
                        key: {
                            name: index,
                            type: 'number',
                        },
                        vi: this._new({ [this._keyFormatter(index)]: value }, {
                            equalString: ':',
                            includePrefix: true,
                        }),
                    }));
                }
                break;
            default:
                return properties;
        }
        const propertyNames = this._getPropertyNames();
        // now add them to the array
        propertyNames.forEach((name) => {
            const value = this._inspectionValue[name];
            properties.push({
                key: {
                    name: name,
                    type: typeof name,
                },
                vi: this._new({ [this._keyFormatter(name)]: value }, {
                    equalString: ':',
                    includePrefix: true,
                }),
            });
        });
        return properties;
    }
    /* Compilers ===================================== */
    /**
     * Filters for the ouput of different inspection parts.
     *
     * @since 2.0.0-beta.3
     */
    get _filter() {
        const valueVia = (viaMethod, skipFormatting) => {
            const str = `<via ${viaMethod}>`;
            return skipFormatting ? str : this._formatter('via', str);
        };
        return {
            /**
             * Filters the value's type for output.
             *
             * @since 2.0.0-beta.3
             */
            type: (type, skipFormatting) => {
                type = type.replace(/(^[\n\s]+|[\n\s]+$)/gi, '');
                // returns
                if (skipFormatting) {
                    return type;
                }
                return this._formatter('type', `<${type}>`);
            },
            /**
             * Filters the value for output.
             *
             * @since 2.0.0-beta.3
             */
            value: (str, viaMethod, skipFormatting) => {
                const ret = [];
                if (viaMethod) {
                    ret.push(valueVia(viaMethod, skipFormatting));
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
                    ret.push(str ?? '');
                }
                else {
                    ret.push(this._formatter('value', str ?? ''));
                }
                return ret.join(' ');
            },
            /**
             * Add 'via' info to value filter.
             *
             * @since 2.0.0-beta.3
             */
            valueVia: valueVia,
        };
    }
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
     *
     * @since 2.0.0-beta.3 — Renamed from formatter to _formatter.
     */
    _formatter(stage, str) {
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
        // returns if stage _formatter exists
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
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
     */
    prefix(skipFormatting = false) {
        const str = this._name + this.args.equalString;
        // returns
        if (skipFormatting) {
            return str;
        }
        return this._formatter('prefix', str);
    }
    /**
     * String to print for variable type.
     *
     * In the case of non-Object objects with a constructor, the class name is
     * displayed.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
     */
    type(skipFormatting = false) {
        // returns on match
        switch (this._typeOf) {
            case 'NaN':
                return this._filter.type(typeof Number.NaN, skipFormatting);
            case 'object':
                const constructorName = this._inspectionValue.constructor?.name ?? 'Object';
                return this._filter.type(constructorName === 'Object' ? 'object' : constructorName, skipFormatting);
        }
        return this._filter.type(this._typeOf, skipFormatting);
    }
    /**
     * Representation of the variable’s value to print, not including the
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
     */
    value(skipFormatting = false) {
        /**
         * Returns a string formatted to represent the
         * value-getting method. (e.g., when using a fallback)
         */
        const via = (viaMethod) => this._filter.valueVia(viaMethod, skipFormatting);
        /** Filters the type value before return. */
        const valueFilter = (str, viaMethod) => this._filter.value(str, viaMethod, skipFormatting);
        /**
         * PARSE BY TYPE
         */
        // returns on match
        switch (this._typeOf) {
            case 'null':
            case 'undefined':
                return valueFilter(this._inspectionValue);
            case 'bigint':
            case 'number':
                return valueFilter(this.args.localizeNumbers
                    ? this._inspectionValue.toLocaleString(this.args.locale, this.args.localizeNumberOptions)
                    : this._inspectionValue.toString());
            case 'boolean':
                return valueFilter(this._inspectionValue.toString().toUpperCase());
            case 'class':
                let classValue = this._inspectionValue.prototype.constructor.name + ' {}';
                if (this.args.inspectClasses) {
                    classValue = this._inspectionValue.toString();
                }
                return valueFilter(classValue);
            case 'function':
                let functionValue = this._inspectionValue.toString();
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
                return valueFilter(this._inspectionValue.toString());
            case 'array':
            case 'object':
                const value = this._inspectionValue;
                // returns
                if (value instanceof Date) {
                    return valueFilter(this.args.localizeDates
                        ? value.toLocaleString(this.args.locale, this.args.localizeDateOptions)
                        : value.toString());
                }
                // returns
                if (value instanceof RegExp) {
                    return valueFilter(this._inspectionValue.toString().replace(/\\/g, '\\\\'));
                }
                return valueFilter(this._valueAsObject());
            case 'string':
                return valueFilter(this.args.stringQuoteCharacter + this._inspectionValue + this.args.stringQuoteCharacter);
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
                if (typeof this._inspectionValue[fn] === 'function') {
                    const fnReturn = this._inspectionValue[fn]();
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
            if (typeof this._inspectionValue[fn] === 'function') {
                const fnReturn = this._inspectionValue[fn]();
                if (typeof fnReturn === 'string') {
                    return `${via(`.${fn}()`)} ${fnReturn}`;
                }
            }
        }
        /**
         * FALLBACK
         * Interpolation
         */
        return `${via('interpolation')} ${String(this._inspectionValue)}`;
    }
    /* Exporters ===================================== */
    /**
     * Print the contents to the console.
     *
     * @category Exporters
     */
    dump() {
        return this.console.log(this.toString());
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
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString() {
        const strs = [
            this.args.includePrefix && this.prefix(),
            this.args.includeType && this.type(),
            this.args.includeValue && this.value(),
        ];
        return strs.filter(v => v).join(' ');
    }
    /* Recursion ===================================== */
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    _new(variable, args = {}) {
        const fullArgs = {
            ...this.args,
            ...this.args.childArgs,
            ...args,
        };
        fullArgs.formatter = {
            ...this.args.formatter ?? {},
            ...this.args.childArgs.formatter ?? {},
            ...args.formatter ?? {},
        };
        return new VariableInspector(variable, fullArgs);
    }
    /* Translators ===================================== */
    /**
     * Creates a readable representation of {@link VariableInspector._inspectionValue}
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
/**
 * Used only for {@link VariableInspector}.
 *
 * @category Classes
 *
 * @since 0.1.1
 */
(function (VariableInspector) {
    ;
    ;
    ;
    /**
     * Used to sample/test/demo functions.
     *
     * @since 2.0.0-beta.3
     * @internal
     */
    let Samples;
    (function (Samples) {
        class TestClass {
            undefinedProperty;
            property = 'property sample value';
            static methodName(param) { return param; }
            _getSet = '_getSet sample value';
            get getSetProp() { return this._getSet; }
            set getSetProp(param) { this._getSet = param; }
        }
        ;
        /**
         * Used for testing.
         *
         * @since 2.0.0-beta.3
         * @internal
         */
        function getVars(verbose) {
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
                stringMultiline: [
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec bibendum in',
                    'justo vulputate euismod.Vivamus vel lectus dolor.Curabitur ullamcorper',
                    'interdum diam, sit amet pulvinar odio tristique eget.Pellentesque sodales',
                    'aliquam ex in convallis.Morbi tristique, risus et imperdiet aliquam, libero',
                    'dolor faucibus lacus, in tempus metus elit non ante.'
                ].join('\n'),
                array: ['string sample value', Number(207), {},],
                set: new Set(['string sample value', Number(207), {},]),
                objectEmpty: {},
                objectSimple: {
                    one: 1,
                    two: 2,
                },
                map: new Map([['one', 1], ['two', 2]]),
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
        Samples.getVars = getVars;
    })(Samples = VariableInspector.Samples || (VariableInspector.Samples = {}));
})(VariableInspector || (VariableInspector = {}));
