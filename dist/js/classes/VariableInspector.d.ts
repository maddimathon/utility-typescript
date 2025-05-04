/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.4.0-draft
 * @license MIT
 */
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { typeOf } from '../functions/index.js';
import { LangLocaleCode } from '../types/string-literals/html.js';
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
export declare class VariableInspector<Type extends typeOf.TestType = typeOf.TestType> extends AbstractConfigurableClass<VariableInspector.Args> {
    /**
     * Alias for `new VariableInspector( ...).dump()`.
     *
     * @category Static
     *
     * @see {@link VariableInspector.dump}
     */
    static dump(...params: ConstructorParameters<typeof VariableInspector>): void;
    /**
     * Alias for `new VariableInspector( ...).toString()`.
     *
     * @category Static
     *
     * @see {@link VariableInspector.toString}
     */
    static stringify(...params: ConstructorParameters<typeof VariableInspector>): string;
    /**
     * Validates the first input parameter to ensure it is an object with a single string key.
     *
     * @category Static
     *
     * @see {@link VariableInspector.constructor}
     */
    protected static validateInput<Type extends typeOf.TestType>(variable: Type | {
        [key: string]: Type;
    }): {
        [key: string]: Type;
    };
    /** Testing ==================================== **/
    /**
     * Used for testing.
     *
     * @internal
     */
    private static get _testClass();
    /**
     * Used for testing.
     *
     * @internal
     */
    private static _testVars;
    /**
     * Used for testing.
     *
     * @internal
     */
    static get sampleComplexObject(): {
        undefined: undefined;
        null: null;
        true: true | undefined;
        false: false | undefined;
        bigint: bigint | undefined;
        number: number;
        NaN: number;
        string: string;
        stringMultiline: string | undefined;
        array: any[] | undefined;
        objectEmpty: object | undefined;
        objectSimple: object | undefined;
        date: Date | undefined;
        regex: RegExp | undefined;
        functionParams: ((a: string, b: string) => any) | undefined;
    };
    /**
     * Prints sample output to the console via VariableInspector.dump().
     *
     * @category Static
     *
     * @returns  An example, constructed instance for a sample object.
     */
    static sample(_args?: Partial<VariableInspector.Args>): VariableInspector<typeof VariableInspector.sampleComplexObject>;
    get ARGS_DEFAULT(): VariableInspector.Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<VariableInspector.Args>): VariableInspector.Args;
    /**
     * Value’s name, used in output.
     *
     * @category Inputs
     */
    protected readonly _name: string;
    /**
     * Value to inspect.
     *
     * @category Inputs
     *
     * @expandType Type
     */
    protected readonly _rawValue: Type;
    /**
     * Alias for this.typeOf( this._rawValue ).
     *
     * @category Inputs
     *
     * @expandType typeOf.Return
     */
    protected readonly _typeOf: typeOf.Return<Type>;
    /**
     * These are the properties of the input object, if any.
     *
     * @category Inputs
     */
    protected readonly _properties: VariableInspector.Child[];
    /**
     *
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    constructor(variable: Type | {
        [key: string]: Type;
    }, args?: Partial<VariableInspector.Args>);
    /**
     * Formats an object property name into a string for display.
     *
     * @category Formatters
     */
    protected keyFormatter(key: number | string | symbol): string;
    /**
     * Builds an array of the property names.  Used by {@link VariableInspector.indexProperties}
     *
     * @category Inputs
     */
    protected getPropertyNames(): ((number | string | symbol) & keyof typeof this._rawValue)[];
    /**
     * Builds an array of the properties for the current {@link VariableInspector._rawValue| this._rawValue()}.
     *
     * @category Inputs
     */
    protected indexProperties(): VariableInspector.Child[];
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
    protected formatter(stage: VariableInspector.StageKeys, str: string): string;
    /**
     * Prefix to print, not including the {@link VariableInspector.type}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    prefix(skipFormatting?: boolean): string;
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
    type(skipFormatting?: boolean): string;
    /**
     * Representation of the variable’s value to print, not including the
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    value(skipFormatting?: boolean): string;
    /**
     * Print the contents to the console.
     *
     * @category Exporters
     */
    dump(): void;
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON(): VariableInspector.JSON<Type>;
    /**
     * Overrides the default function to return a string representation of the
     * inspected variable’s value.
     *
     * @category Exporters
     *
     * @see {@link AbstractConfigurableClass.toString)}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString(): string;
    /**
     * Overrides the default function to return a string representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf | Object.prototype.valueOf()}
     * @see {@link VariableInspector.toJSON | VariableInspector.toJSON()}
     */
    valueOf(): VariableInspector.JSON<Type>;
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    protected _new(variable: ConstructorParameters<typeof VariableInspector>[0], args?: Partial<VariableInspector.Args>): VariableInspector;
    /**
     * Creates a readable representation of {@link VariableInspector._rawValue}
     * as if its type is object (including arrays).
     *
     * @category Translators
     */
    protected _valueAsObject(): string;
}
/**
 * Used only for {@link VariableInspector}.
 */
export declare namespace VariableInspector {
    /**
     * A function for formatting inspection output strings.
     *
     * @expand
     */
    type Formatter = (str: string) => string;
    /**
     * Stages at which formatter functions may be used.
     *
     * `_` is used if the applicable formatter is not present.
     *
     * @expand
     */
    type StageKeys = "_" | "prefix" | "type" | "value" | "via";
    /**
     * Optional configuration for {@link VariableInspector}.
     */
    type Args = AbstractConfigurableClass.Args & {
        /**
         * These args should never be recursive.
         */
        argsRecursive: false;
        /**
         * Arguments to use as an override for child inspections (i.e., of the
         * property values).
         *
         * Useful to change things like the
         * {@link VariableInspector.Args['formatter']} functions.
         *
         * @default
         * { includeValue: true }
         */
        childArgs: Partial<Omit<Args, "argsRecursive" | "childArgs" | "debug" | "locale" | "localizeDateOptions">>;
        /**
         * Outputs some var dumps to the console.
         *
         * @internal
         *
         * @default false
         */
        debug: boolean;
        /**
         * String to use directly following the variable name in the prefix.
         *
         * @see {@link VariableInspector.prefix}
         *
         * @default ' ='
         */
        equalString: string;
        /**
         * Whether to include a search for toJSON for unidentified var types.
         *
         * @default true
         */
        fallbackToJSON: boolean;
        /**
         * An optional callback for formatting the output values.
         *
         * @default null
         */
        formatter: null | {
            [K in StageKeys]?: Formatter;
        };
        /**
         * Whether to include the prefix in the output string.
         *
         * @see {@link VariableInspector.prefix}
         *
         * @default true
         */
        includePrefix: boolean;
        /**
         * Whether to include the type in the output string.
         *
         * @see {@link VariableInspector.type}
         *
         * @default true
         */
        includeType: boolean;
        /**
         * Whether to include the value in the output string.
         *
         * @see {@link VariableInspector.value}
         *
         * @default true
         */
        includeValue: boolean;
        /**
         * Text used to indent text.
         *
         * @default '    '
         */
        indent: string;
        /**
         * Whether to include a string representation of classes.
         *
         * @default false
         */
        inspectClasses: boolean;
        /**
         * Whether to include a string representation of functions.
         *
         * @default false
         */
        inspectFunctions: boolean;
        /**
         * Locale to use when formatting dates and numbers.
         *
         * Passed to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales | MDN} for allowed values.
         *
         * @default 'en-CA'
         */
        locale: undefined | LangLocaleCode;
        /**
         * Whether to format dates according to locale.
         *
         * If true, `toLocaleString()` is used in place of `toString()`.
         *
         * @default true
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}
         */
        localizeDates: boolean;
        /**
         * Options for formatting dates.
         *
         * @default {}
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options | MDN} for allowed values.
         */
        localizeDateOptions: Intl.DateTimeFormatOptions;
        /**
         * Whether to format numbers according to locale.
         *
         * If true, `toLocaleString()` is used in place of `toString()`.
         *
         * @default false
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString | Date.toLocaleString()}
         */
        localizeNumbers: boolean;
        /**
         * Options for formatting numbers.
         *
         * @default {}
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | MDN (numbers)} for allowed values.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toLocaleString#options | MDN (bigint)} for allowed values.
         */
        localizeNumberOptions: Intl.NumberFormatOptions & BigIntToLocaleStringOptions;
        /**
         * Character used to represent strings.
         *
         * @default '"'
         */
        stringQuoteCharacter: string;
    };
    /**
     * The shape used for {@link VariableInspector._properties}.
     */
    type Child = {
        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };
        vi: VariableInspector;
    };
    /**
     * The shape used when converting this object to JSON.
     *
     * @expandType ReturnType
     */
    interface JSON<Type extends typeOf.TestType = typeOf.TestType> {
        /**
         * A string representation of the inspection. May have tabs and line breaks.
         *
         * @see {@link VariableInspector.toString}
         */
        inspection: string;
        /**
         * The provided name for the inspecte variable.
         *
         * @see {@link VariableInspector._name}
         */
        name: string;
        /**
         * If this is an object with properties or methods, they are included
         * here.
         *
         * @see {@link VariableInspector._properties}
         */
        properties?: {
            [key: number | string | symbol]: JSON_Child;
        };
        /**
         * The simple type name.
         *
         * @see {@link VariableInspector._typeOf}
         */
        type: VariableInspector<Type>['_typeOf'];
    }
    /**
     * The shape used when converting this object to JSON.
     */
    type JSON_Child = {
        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };
        value: JSON;
    };
}
//# sourceMappingURL=VariableInspector.d.ts.map