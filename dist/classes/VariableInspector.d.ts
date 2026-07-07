/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5
 * @license MIT
 */
import type { ConsoleUtility, LangLocaleCode } from '../types/index.js';
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
export declare class VariableInspector<T_InspectionType extends VariableInspector.InspectionType = VariableInspector.InspectionType> {
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
    /** Testing ==================================== **/
    /**
     * Used for testing.
     *
     * @category Static
     *
     * @internal
     */
    static get sampleComplexObject(): VariableInspector.Samples.Vars;
    /**
     * Prints sample output to the console via VariableInspector.dump().
     *
     * @category Static
     *
     * @returns  An example, constructed instance for a sample object.
     */
    static sample(_args?: Partial<VariableInspector.Args>, _console?: ConsoleUtility): VariableInspector<typeof VariableInspector.sampleComplexObject>;
    /**
     * A completed args object.
     *
     * @category Args
     */
    readonly args: VariableInspector.Args;
    /**
     * @category Args
     *
     * @source
     */
    get ARGS_DEFAULT(): {
        childArgs: {
            includeValue: true;
        };
        console: MiniConsole;
        debug: false;
        equalString: ' =';
        fallbackToJSON: true;
        formatKeys: true;
        formatter: null;
        includePrefix: true;
        includeType: true;
        includeValue: true;
        indent: '    ';
        inspectClasses: false;
        inspectFunctions: false;
        locale: 'en-CA';
        localizeDates: true;
        localizeDateOptions: {};
        localizeNumbers: false;
        localizeNumberOptions: {};
        stringQuoteCharacter: '"';
    };
    /**
     * @since 2.0.0-beta.3
     */
    readonly console: ConsoleUtility;
    /**
     * Default name for unnamed variables passed for inspection.
     *
     * @since 2.0.0-beta.3
     */
    protected readonly _defaultName: string;
    /**
     * Value to inspect.
     *
     * @category Inputs
     *
     * @expandType T_InspectionType
     *
     * @since 2.0.0-beta.3
     */
    protected readonly _inspectionValue: T_InspectionType | undefined;
    /**
     * Value’s name, used in output.
     *
     * @category Inputs
     */
    protected readonly _name: string;
    /**
     * Value to inspect as passed to the constructor.
     *
     * @category Inputs
     */
    protected readonly _rawValue: VariableInspector.InputType<T_InspectionType> | undefined;
    /**
     * Alias for this.typeOf( this._rawValue ).
     *
     * @category Inputs
     *
     * @expandType typeOf.Return
     */
    protected readonly _typeOf: typeOf.Return<Extract<T_InspectionType, typeOf.TestType> | undefined>;
    /**
     * These are the properties of the input object, if any.
     *
     * @category Inputs
     */
    protected readonly _properties: VariableInspector.Child[];
    /**
     * @since 2.0.0-beta.3
     */
    get properties(): VariableInspector.Child[];
    /**
     * @category Constructor
     *
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    constructor(variable: {
        [key: string]: VariableInspector.InputType<T_InspectionType>;
    }, args?: Partial<VariableInspector.Args>, 
    /**
     * @since 2.0.0-beta.3
     */
    console?: ConsoleUtility);
    /**
     * @category Inputs
     *
     * @see {@link VariableInspector.constructor}
     *
     * @since 2.0.0-beta.3
     */
    protected _parseInputParams(validVar: {
        [key: string]: VariableInspector.InputType<T_InspectionType>;
    }): {
        name: string;
        rawValue: VariableInspector.InputType<T_InspectionType> | undefined;
        inspectionValue: T_InspectionType | undefined;
        typeOf: typeOf.Return<Extract<T_InspectionType, typeOf.TestType> | undefined>;
    };
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
    protected _validateInputVariable(variable: {
        [key: string]: VariableInspector.InputType<T_InspectionType>;
    }): {
        [key: string]: VariableInspector.InputType<T_InspectionType>;
    };
    /**
     * Formats an object property name into a string for display.
     *
     * @category Formatters
     *
     * @since 2.0.0-beta.3 — Renamed from keyFormatter to _keyFormatter.
     */
    protected _keyFormatter(key: number | string | symbol): string;
    /**
     * Builds an array of the property names.  Used by
     * {@link VariableInspector._indexProperties}
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from getPropertyNames to _getPropertyNames.
     */
    protected _getPropertyNames(): ((number | string | symbol) & keyof typeof this._inspectionValue)[];
    /**
     * Builds an array of the properties for the current
     * {@link VariableInspector._inspectionValue| this._inspectionValue}.
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from indexProperties to _indexProperties.
     */
    protected _indexProperties(): VariableInspector.Child[];
    /**
     * Filters for the ouput of different inspection parts.
     *
     * @since 2.0.0-beta.3
     */
    protected get _filter(): {
        /**
         * Filters the value's type for output.
         *
         * @since 2.0.0-beta.3
         */
        readonly type: (type: string, skipFormatting: boolean) => string;
        /**
         * Filters the value for output.
         *
         * @since 2.0.0-beta.3
         */
        readonly value: (str: null | undefined | string, viaMethod: string | undefined, skipFormatting: boolean) => string;
        /**
         * Add 'via' info to value filter.
         *
         * @since 2.0.0-beta.3
         */
        readonly valueVia: (viaMethod: string, skipFormatting: boolean) => string;
    };
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
    protected _formatter(stage: VariableInspector.StageKeys, str: string): string;
    /**
     * Prefix to print, not including the {@link VariableInspector.type}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
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
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
     */
    type(skipFormatting?: boolean): string;
    /**
     * Representation of the variable’s value to print, not including the
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     *
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
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
    toJSON(): VariableInspector.JSON<T_InspectionType>;
    /**
     * Overrides the default function to return a string representation of the
     * inspected variable’s value.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString(): string;
    /**
     * Returns an instance of this class that inherits this instances’s args.
     *
     * Meant for children/recursion of this inspection.
     *
     * @category Recursion
     */
    protected _new<T_InspectionType extends VariableInspector.InspectionType>(variable: ConstructorParameters<typeof VariableInspector<T_InspectionType>>[0], args?: Partial<VariableInspector.Args>): VariableInspector<T_InspectionType>;
    /**
     * Creates a readable representation of {@link VariableInspector._inspectionValue}
     * as if its type is object (including arrays).
     *
     * @category Translators
     */
    protected _valueAsObject(): string;
}
/**
 * Used only for {@link VariableInspector}.
 *
 * @category Classes
 *
 * @since 0.1.1
 */
export declare namespace VariableInspector {
    /**
     * A function for formatting inspection output strings.
     *
     * @since 0.1.1
     */
    type Formatter = (str: string) => string;
    /**
     * @since 2.0.0-beta.3
     */
    type InputObject<T_InspectionType extends InspectionType> = (T_InspectionType & {
        toVariableInspection?: never | undefined;
    }) | {
        toVariableInspection: () => T_InspectionType;
    };
    /**
     * @since 2.0.0-beta.3
     */
    type InputType<T_InspectionType extends InspectionType> = Exclude<T_InspectionType, object> | InputObject<T_InspectionType>;
    /**
     * @since 2.0.0-beta.3
     */
    type InspectionType = typeOf.TestType | unknown;
    /**
     * Stages at which _formatter functions may be used.
     *
     * `_` is used if the applicable _formatter is not present.
     *
     * @since 0.1.1
     *
     * @expand
     */
    type StageKeys = "_" | "prefix" | "type" | "value" | "via";
    /**
     * Optional configuration for {@link VariableInspector}.
     *
     * @since 0.1.1
     */
    interface Args {
        /**
         * Arguments to use as an override for child inspections (i.e., of the
         * property values).
         *
         * Useful to change things like the
         * {@link VariableInspector.Args['_formatter']} functions.
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
         * @default true
         *
         * @since 2.0.0-beta.3
         */
        formatKeys: boolean;
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
    }
    /**
     * The shape used for {@link VariableInspector._properties}.
     *
     * @since 0.1.1
     */
    interface Child {
        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };
        vi: VariableInspector;
    }
    /**
     * The shape used when converting this object to JSON.
     *
     * @since 0.1.1
     */
    interface JSON<T_Type extends InspectionType = InspectionType> {
        /**
         * A string representation of the inspection. May have tabs and line breaks.
         *
         * @see {@link VariableInspector.toString}
         */
        inspection: string;
        /**
         * The provided name for the inspected variable.
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
        type: VariableInspector<T_Type>['_typeOf'];
    }
    /**
     * The shape used when converting this object to JSON.
     *
     * @since 0.1.1
     */
    interface JSON_Child {
        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };
        value: JSON;
    }
    /**
     * Used to sample/test/demo functions.
     *
     * @since 2.0.0-beta.3
     * @internal
     */
    namespace Samples {
        class TestClass {
            undefinedProperty: any;
            property: string;
            static methodName(param: any): any;
            _getSet: string;
            get getSetProp(): string;
            set getSetProp(param: string);
        }
        /**
         * @since 2.0.0-beta.3
         * @internal
         */
        export type Vars = {
            undefined?: undefined;
            null: null;
            true?: true;
            false?: false;
            bigint?: bigint;
            number: number;
            NaN: number;
            string: string;
            stringMultiline?: string;
            array?: any[];
            set?: Set<any>;
            objectEmpty?: object;
            objectSimple?: object;
            map?: Map<any, any>;
            date?: Date;
            regex?: RegExp;
            functionSimple?: () => any;
            functionParams?: (a: string, b: string) => any;
            class?: typeof TestClass;
            classInstance?: TestClass;
        };
        export function getVars(verbose: true): Required<VariableInspector.Samples.Vars>;
        export function getVars(verbose: boolean): VariableInspector.Samples.Vars;
        export {};
    }
}
