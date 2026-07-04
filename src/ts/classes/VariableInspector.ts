/**
 * @since 0.1.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    AnyClass,
    ConsoleUtility,
    LangLocaleCode,
} from '../types/index.js';

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
export class VariableInspector<
    T_InspectionType extends VariableInspector.InspectionType = VariableInspector.InspectionType,
> {

    /* STATIC METHODS
     * ====================================================================== */

    /**
     * Alias for `new VariableInspector( ...).dump()`.
     *
     * @category Static
     * 
     * @see {@link VariableInspector.dump}
     */
    public static dump(
        ...params: ConstructorParameters<typeof VariableInspector>
    ): void {
        const vi = new VariableInspector( ...params );
        return vi.dump();
    }

    /**
     * Alias for `new VariableInspector( ...).toString()`.
     *
     * @category Static
     * 
     * @see {@link VariableInspector.toString}
     */
    public static stringify(
        ...params: ConstructorParameters<typeof VariableInspector>
    ): string {
        const vi = new VariableInspector( ...params );
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
    public static get sampleComplexObject(): VariableInspector.Samples.Vars {

        const {
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
        } = VariableInspector.Samples.getVars( true );

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
    public static sample(
        _args?: Partial<VariableInspector.Args>,
        _console?: ConsoleUtility,
    ): VariableInspector<typeof VariableInspector.sampleComplexObject> {
        const console = _console ?? new MiniConsole();

        console.log( '\nVariableInspector.sample() @ ' + timestamp( null, { date: true, time: true } ) );
        console.log( '\n' );

        const args = {
            ...VariableInspector.prototype.ARGS_DEFAULT,
            debug: true,
            ..._args,
            console,
        };

        /**
         * Calls `VariableInspector.dump() with args.`.
         */
        const varDump = ( variable: ConstructorParameters<typeof VariableInspector>[ 0 ] ) => {
            VariableInspector.dump( variable, args );
            console.log( '\n' );
        };

        const t = VariableInspector.Samples.getVars( !!args.debug );

        for ( const key in t ) {
            varDump( { [ key ]: t[ key as keyof typeof t ] } );
        }

        const complexVarInspect = new VariableInspector<typeof VariableInspector.sampleComplexObject>(
            { complexObject: VariableInspector.sampleComplexObject },
            args,
        );

        complexVarInspect.dump();
        console.log( '\n' );

        return complexVarInspect;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * A completed args object.
     * 
     * @category Args
     */
    public readonly args: VariableInspector.Args;

    /**
     * @category Args
     *
     * @source
     */
    public get ARGS_DEFAULT(): {
        childArgs: {
            includeValue: true,
        },

        console: MiniConsole,

        debug: false,

        equalString: ' =',

        fallbackToJSON: true,

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
    } {
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
    public readonly console: ConsoleUtility;

    /**
     * Default name for unnamed variables passed for inspection.
     * 
     * @since 2.0.0-beta.3
     */
    protected readonly _defaultName: string = 'variable';

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
    public get properties(): VariableInspector.Child[] {
        return this._properties;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * @category Constructor
     * 
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    public constructor (
        variable: { [ key: string ]: VariableInspector.InputType<T_InspectionType>; },
        args: Partial<VariableInspector.Args> = {},

        /**
         * @since 2.0.0-beta.3
         */
        console?: ConsoleUtility,
    ) {
        this.args = {
            ...this.ARGS_DEFAULT,
            ...args,
        };

        this.console = console ?? new MiniConsole();

        const params = this._parseInputParams( this._validateInputVariable( variable ) );

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
    protected _parseInputParams(
        validVar: { [ key: string ]: VariableInspector.InputType<T_InspectionType>; },
    ): {
        name: string;
        rawValue: VariableInspector.InputType<T_InspectionType> | undefined;
        inspectionValue: T_InspectionType | undefined;
        typeOf: typeOf.Return<Extract<T_InspectionType, typeOf.TestType> | undefined>;
    } {
        const name = Object.keys( validVar )[ 0 ] ?? this._defaultName;

        const rawValue = validVar[ name ];

        const rawOrObject = typeof rawValue === 'object' ? rawValue as null | VariableInspector.InputObject<T_InspectionType> : false;

        const inspectionValue = (
            rawOrObject
            && typeof rawOrObject.toVariableInspection === 'function'
        )
            ? rawOrObject.toVariableInspection()
            : rawValue as T_InspectionType | undefined;

        // this.console.log( { inspectionValue } );

        return {
            name,
            rawValue,
            inspectionValue,
            typeOf: typeOf( inspectionValue as Extract<T_InspectionType, typeOf.TestType> ),
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
    protected _validateInputVariable(
        variable: { [ key: string ]: VariableInspector.InputType<T_InspectionType>; },
    ): { [ key: string ]: VariableInspector.InputType<T_InspectionType>; } {

        const inputKeys = Object.keys( variable );

        const inputHasOneStringKey =
            inputKeys.length === 1
            && typeof inputKeys[ 0 ] === 'string';

        // returns
        if ( inputHasOneStringKey ) {
            return variable;
        }

        return { [ this._defaultName ]: variable as VariableInspector.InputType<T_InspectionType> };
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
    protected _keyFormatter( key: number | string | symbol ): string {
        // returns
        if ( !this.args.formatKeys ) {
            return String( key );
        }

        // returns for number and string
        switch ( typeof key ) {

            case 'number':
                return key.toString();

            case 'string':
                return `"${ key }"`;
        }

        return `{${ String( key ) }}`;
    }

    /**
     * Builds an array of the property names.  Used by
     * {@link VariableInspector._indexProperties}
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from getPropertyNames to _getPropertyNames.
     */
    protected _getPropertyNames(): ( ( number | string | symbol ) & keyof typeof this._inspectionValue )[] {

        type PropName = ( number | string | symbol ) & keyof typeof this._inspectionValue;

        // returns on array or unsupported types
        switch ( this._typeOf ) {

            case 'array':
                const indices: ( ( number | string ) & keyof typeof this._inspectionValue )[] = [];

                for ( let index = 0; index < ( this._inspectionValue as any[] ).length; index++ ) {
                    indices.push( index as number & keyof typeof this._inspectionValue );
                }

                indices.push( 'length' as string & keyof typeof this._inspectionValue );

                return indices;

            case 'object':
                break;

            default:
                return [];
        }

        const propertyNames: PropName[] = [
            Object.keys( this._inspectionValue as object ) as PropName[],
            Object.getOwnPropertyNames( this._inspectionValue ) as PropName[],
            Object.getOwnPropertySymbols( this._inspectionValue ) as PropName[],
            // Object.getOwnPropertyDescriptors( this._inspectionValue as object ),
        ].flat().filter( name => name !== '_getSet' );

        return arrayUnique( propertyNames );
    }

    /**
     * Builds an array of the properties for the current
     * {@link VariableInspector._inspectionValue| this._inspectionValue}.
     *
     * @category Inputs
     *
     * @since 2.0.0-beta.3 — Renamed from indexProperties to _indexProperties.
     */
    protected _indexProperties(): VariableInspector.Child[] {

        const properties: VariableInspector.Child[] = [];

        // returns
        if ( !this._inspectionValue ) {
            return properties;
        }

        // returns if it doesn't match a supported type
        switch ( this._typeOf ) {

            case 'array':
            case 'object':
                const value = this._inspectionValue as object | any[];

                // returns
                if ( value instanceof Date || value instanceof RegExp ) {
                    return properties;
                }

                // returns
                if ( value instanceof Map ) {

                    return Array.from(
                        ( this._inspectionValue as Extract<T_InspectionType, Map<unknown, unknown>> ).entries(),
                        ( [ key, value ] ): VariableInspector.Child => ( {

                            key: {
                                name: key as "number" | "string" | "symbol",
                                type: typeof key as "number" | "string" | "symbol",
                            },

                            vi: this._new<typeof value>( { [ this._keyFormatter( key as number | string | symbol ) ]: value }, {
                                equalString: ':',
                                includePrefix: true,
                            } ),
                        } )
                    );
                }

                // returns
                if ( value instanceof Set ) {

                    return Array.from(
                        ( this._inspectionValue as Extract<T_InspectionType, Set<unknown>> ).values(),
                        ( value, index ): VariableInspector.Child => ( {

                            key: {
                                name: index,
                                type: 'number',
                            },

                            vi: this._new( { [ this._keyFormatter( index ) ]: value }, {
                                equalString: ':',
                                includePrefix: true,
                            } ),
                        } )
                    );
                }
                break;

            default:
                return properties;
        }

        const propertyNames = this._getPropertyNames();

        // now add them to the array
        propertyNames.forEach( ( name ) => {

            const value = ( this._inspectionValue as NonNullable<T_InspectionType> )[ name ];

            properties.push( {

                key: {
                    name: name,
                    type: typeof name as "number" | "string" | "symbol",
                },

                vi: this._new( { [ this._keyFormatter( name ) ]: value }, {
                    equalString: ':',
                    includePrefix: true,
                } ),
            } );
        } );

        return properties;
    }


    /* Compilers ===================================== */

    /**
     * Filters for the ouput of different inspection parts.
     * 
     * @since 2.0.0-beta.3
     */
    protected get _filter() {

        const valueVia = ( viaMethod: string, skipFormatting: boolean ): string => {

            const str = `<via ${ viaMethod }>`;

            return skipFormatting ? str : this._formatter( 'via', str );
        };

        return {
            /**
             * Filters the value's type for output.
             * 
             * @since 2.0.0-beta.3
             */
            type: ( type: string, skipFormatting: boolean ): string => {
                type = type.replace( /(^[\n\s]+|[\n\s]+$)/gi, '' );

                // returns
                if ( skipFormatting ) {
                    return type;
                }

                return this._formatter( 'type', `<${ type }>` );
            },

            /** 
             * Filters the value for output.
             * 
             * @since 2.0.0-beta.3
             */
            value: ( str: null | undefined | string, viaMethod: string | undefined, skipFormatting: boolean ): string => {

                const ret: string[] = [];

                if ( viaMethod ) {
                    ret.push( valueVia( viaMethod, skipFormatting ) );
                }

                if ( !this.args.includeType ) {

                    if ( typeof str === 'undefined' ) {
                        str = 'undefined';
                    } else if ( str === null ) {
                        str = 'NULL';
                    }
                }

                if ( skipFormatting ) {
                    ret.push( str ?? '' );
                } else {
                    ret.push( this._formatter( 'value', str ?? '' ) );
                }

                return ret.join( ' ' );
            },

            /**
             * Add 'via' info to value filter.
             * 
             * @since 2.0.0-beta.3
             */
            valueVia: valueVia as ( viaMethod: string, skipFormatting: boolean ) => string,
        } as const;
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
    protected _formatter( stage: VariableInspector.StageKeys, str: string ): string {

        // returns
        if ( !this.args.formatter ) {
            return str;
        }

        // returns
        if ( typeof this.args.formatter[ stage ] === 'function' ) {
            return this.args.formatter[ stage ]( str );
        }

        // returns
        if ( stage === '_' ) {
            return str;
        }

        // returns if stage _formatter exists
        if ( stage === 'via' ) {

            if ( typeof this.args.formatter.type === 'function' ) {
                return this.args.formatter.type( str );
            }
        }

        // returns
        if ( typeof this.args.formatter._ === 'function' ) {
            return this.args.formatter._( str );
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
    public prefix( skipFormatting: boolean = false ): string {

        const str = this._name + this.args.equalString;

        // returns
        if ( skipFormatting ) {
            return str;
        }

        return this._formatter( 'prefix', str );
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
    public type( skipFormatting: boolean = false ): string {

        // returns on match
        switch ( this._typeOf ) {

            case 'NaN':
                return this._filter.type( typeof Number.NaN, skipFormatting );

            case 'object':
                const constructorName = ( this._inspectionValue as object ).constructor?.name ?? 'Object';

                return this._filter.type(
                    constructorName === 'Object' ? 'object' : constructorName,
                    skipFormatting,
                );
        }

        return this._filter.type( this._typeOf, skipFormatting );
    }

    /**
     * Representation of the variable’s value to print, not including the 
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     * 
     * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
     */
    public value( skipFormatting: boolean = false ): string {

        /**
         * Returns a string formatted to represent the 
         * value-getting method. (e.g., when using a fallback)
         */
        const via = ( viaMethod: string ): string => this._filter.valueVia( viaMethod, skipFormatting );

        /** Filters the type value before return. */
        const valueFilter = ( str?: null | string, viaMethod?: string ): string => this._filter.value( str, viaMethod, skipFormatting );


        /**
         * PARSE BY TYPE
         */
        // returns on match
        switch ( this._typeOf ) {

            case 'null':
            case 'undefined':
                return valueFilter( this._inspectionValue as null | undefined );

            case 'bigint':
            case 'number':
                return valueFilter(
                    this.args.localizeNumbers
                        ? ( this._inspectionValue as number | BigInt ).toLocaleString( this.args.locale, this.args.localizeNumberOptions )
                        : ( this._inspectionValue as number | BigInt ).toString()
                );

            case 'boolean':
                return valueFilter( ( this._inspectionValue as boolean ).toString().toUpperCase() );

            case 'class':
                let classValue: string = ( this._inspectionValue as AnyClass ).prototype.constructor.name + ' {}';

                if ( this.args.inspectClasses ) {
                    classValue = ( this._inspectionValue as AnyClass ).toString();
                }
                return valueFilter( classValue );

            case 'function':
                let functionValue: string = ( this._inspectionValue as Function ).toString();

                const paramRegex = /^\s*\(([^\(|\)]*)\)\s*(\=\>|\{).*$/gs;

                if ( !this.args.inspectFunctions ) {

                    if ( !functionValue.match( paramRegex ) ) {
                        functionValue = '';
                    } else {

                        functionValue = functionValue.replace( paramRegex, '( $1 )' )
                            .replace( /\s*\b\s*,\s*\b\s*/gs, ', ' )
                            .replace( /^\s*\(\s+\)\s*$/gs, '()' );
                    }
                }

                return valueFilter( functionValue );

            case 'NaN':
                return valueFilter( ( this._inspectionValue as number ).toString() );

            case 'array':
            case 'object':
                const value = this._inspectionValue as object;

                // returns
                if ( value instanceof Date ) {

                    return valueFilter(
                        this.args.localizeDates
                            ? value.toLocaleString( this.args.locale, this.args.localizeDateOptions )
                            : value.toString()
                    );
                }

                // returns
                if ( value instanceof RegExp ) {
                    return valueFilter( ( this._inspectionValue as RegExp ).toString().replace( /\\/g, '\\\\' ) );
                }

                return valueFilter( this._valueAsObject() );

            case 'string':
                return valueFilter( this.args.stringQuoteCharacter + ( this._inspectionValue as string ) + this.args.stringQuoteCharacter );
        }


        /**
         * FALLBACK
         * Check for json-ing methods
         */
        // returns if json-ing method is found and returns a string
        if ( this.args.fallbackToJSON ) {

            for ( const fn of [
                'toJSON',
                // 'valueOf',
            ] ) {

                if ( typeof ( this._inspectionValue as any )[ fn ] === 'function' ) {
                    const fnReturn = ( this._inspectionValue as any )[ fn ]();

                    if ( fnReturn ) {
                        return `${ via( `.${ fn }()` ) } ${ JSON.stringify( fnReturn, null, 4 ) }`;
                    }
                }
            }
        }


        /**
         * FALLBACK
         * Check for string-ing methods
         */
        // returns if string-ing method is found and returns a string
        for ( const fn of [
            'toString',
            'stringify',
        ] ) {

            if ( typeof ( this._inspectionValue as any )[ fn ] === 'function' ) {

                const fnReturn = ( this._inspectionValue as any )[ fn ]();

                if ( typeof fnReturn === 'string' ) {
                    return `${ via( `.${ fn }()` ) } ${ fnReturn }`;
                }
            }
        }


        /**
         * FALLBACK
         * Interpolation
         */
        return `${ via( 'interpolation' ) } ${ String( this._inspectionValue ) }`;
    }


    /* Exporters ===================================== */

    /**
     * Print the contents to the console.
     * 
     * @category Exporters
     */
    public dump(): void {
        return this.console.log( this.toString() );
    };

    /**
     * The object shape used when converting to JSON.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    public toJSON(): VariableInspector.JSON<T_InspectionType> {

        const json: VariableInspector.JSON<T_InspectionType> = {
            name: this._name,
            type: this._typeOf,

            inspection: this.value( true ),
        };

        const properties: VariableInspector.JSON<T_InspectionType>[ 'properties' ] = {};

        this._properties.forEach( ( property ) => {

            properties[ property.key.name ] = {
                key: property.key,
                value: property.vi.toJSON(),
            };
        } );

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
    public toString(): string {

        const strs: ( false | string )[] = [
            this.args.includePrefix && this.prefix(),
            this.args.includeType && this.type(),
            this.args.includeValue && this.value(),
        ];

        return strs.filter( v => v ).join( ' ' );
    }


    /* Recursion ===================================== */

    /**
     * Returns an instance of this class that inherits this instances’s args.
     * 
     * Meant for children/recursion of this inspection.
     * 
     * @category Recursion
     */
    protected _new<
        T_InspectionType extends VariableInspector.InspectionType
    >(
        variable: ConstructorParameters<typeof VariableInspector<T_InspectionType>>[ 0 ],
        args: Partial<VariableInspector.Args> = {},
    ): VariableInspector<T_InspectionType> {

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

        return new VariableInspector( variable, fullArgs );
    }


    /* Translators ===================================== */

    /**
     * Creates a readable representation of {@link VariableInspector._inspectionValue} 
     * as if its type is object (including arrays).
     * 
     * @category Translators
     */
    protected _valueAsObject(): string {

        const openBrace = this._typeOf === 'array' ? '[' : '{';
        const closeBrace = this._typeOf === 'array' ? ']' : '}';

        // returns
        if ( !this._properties.length ) {
            return openBrace + closeBrace;
        }

        const propStrs: string[] = this._properties.map( prop => prop.vi.toString() );

        /**
         * Used to map each line of a property string.
         */
        const lineMapper = ( line: string ) => this.args.indent + line;

        /**
         * String before each property string.
         */
        const propPrefix: string = propStrs.length > 2 ? '\n' : '';

        /**
         * Used to map each property string.
         */
        const propMapper = ( str: string ) => propPrefix + str.split( /\n/g ).map( lineMapper ).join( '\n' );

        return [
            openBrace,
            ...propStrs.map( propMapper ),
            closeBrace,
        ].join( '\n' );
    }
}

/**
 * Used only for {@link VariableInspector}.
 * 
 * @category Classes
 * 
 * @since 0.1.1
 */
export namespace VariableInspector {

    /**
     * A function for formatting inspection output strings.
     * 
     * @since 0.1.1
     */
    export type Formatter = ( str: string ) => string;

    /**
     * @since 2.0.0-beta.3
     */
    export type InputObject<T_InspectionType extends InspectionType> =
        | T_InspectionType & {
            toVariableInspection?: never | undefined;
        }
        | {
            toVariableInspection: () => T_InspectionType;
        };

    /**
     * @since 2.0.0-beta.3
     */
    export type InputType<T_InspectionType extends InspectionType> =
        | Exclude<T_InspectionType, object>
        | InputObject<T_InspectionType>;

    /**
     * @since 2.0.0-beta.3
     */
    export type InspectionType = typeOf.TestType | unknown;

    /**
     * Stages at which _formatter functions may be used.
     * 
     * `_` is used if the applicable _formatter is not present.
     * 
     * @since 0.1.1
     * 
     * @expand
     */
    export type StageKeys = "_" | "prefix" | "type" | "value" | "via";

    /**
     * Optional configuration for {@link VariableInspector}.
     * 
     * @since 0.1.1
     */
    export interface Args {

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
            [ K in StageKeys ]?: Formatter;
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
     * 
     * @since 0.1.1
     */
    export interface Child {

        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };

        vi: VariableInspector;
    };

    /**
     * The shape used when converting this object to JSON.
     * 
     * @since 0.1.1
     */
    export interface JSON<
        T_Type extends InspectionType = InspectionType,
    > {

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
            [ key: number | string | symbol ]: JSON_Child;
        };

        /**
         * The simple type name.
         * 
         * @see {@link VariableInspector._typeOf}
         */
        type: VariableInspector<T_Type>[ '_typeOf' ];
    }

    /**
     * The shape used when converting this object to JSON.
     * 
     * @since 0.1.1
     */
    export interface JSON_Child {

        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };

        value: JSON;
    };

    /**
     * Used to sample/test/demo functions.
     * 
     * @since 2.0.0-beta.3
     * @internal
     */
    export namespace Samples {

        class TestClass {
            public undefinedProperty: any;
            public property = 'property sample value';

            static methodName( param: any ): any { return param; }

            _getSet = '_getSet sample value';
            get getSetProp() { return this._getSet; }
            set getSetProp( param: string ) { this._getSet = param; }
        };

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
            functionParams?: ( a: string, b: string ) => any;
            class?: typeof TestClass;
            classInstance?: TestClass;
        };


        export function getVars( verbose: true ): Required<VariableInspector.Samples.Vars>;
        export function getVars( verbose: boolean ): VariableInspector.Samples.Vars;

        /**
         * Used for testing.
         * 
         * @since 2.0.0-beta.3
         * @internal
         */
        export function getVars( verbose: boolean ): VariableInspector.Samples.Vars {

            const classInstance = new TestClass();

            const vars: VariableInspector.Samples.Vars = {
                undefined,
                null: null,

                true: true,
                false: false,

                bigint: BigInt( 9007199254740991 ),
                number: Number( 207 ),
                'NaN': Number.NaN,

                string: 'string sample value',
                stringMultiline: [
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec bibendum in',
                    'justo vulputate euismod.Vivamus vel lectus dolor.Curabitur ullamcorper',
                    'interdum diam, sit amet pulvinar odio tristique eget.Pellentesque sodales',
                    'aliquam ex in convallis.Morbi tristique, risus et imperdiet aliquam, libero',
                    'dolor faucibus lacus, in tempus metus elit non ante.'
                ].join( '\n' ),

                array: [ 'string sample value', Number( 207 ), {}, ],

                set: new Set( [ 'string sample value', Number( 207 ), {}, ] ),

                objectEmpty: {},
                objectSimple: {
                    one: 1,
                    two: 2,
                },

                map: new Map( [ [ 'one', 1 ], [ 'two', 2 ] ] ),

                date: new Date( '2024-02-08' ),
                regex: /^regex$/g,

                functionSimple: (): string => { return 'hello'; },
                functionParams: (
                    value1: string,
                    value2: string,
                ): string => { const test = value2; return test + value1; },

                'class': TestClass,
                classInstance,
            } satisfies Required<VariableInspector.Samples.Vars>;

            if ( !verbose ) {
                delete vars[ 'undefined' ];
                delete vars[ 'true' ];
                delete vars[ 'bigint' ];
                delete vars[ 'stringMultiline' ];
                delete vars[ 'array' ];
                delete vars[ 'objectEmpty' ];
                delete vars[ 'objectSimple' ];
                delete vars[ 'date' ];
                delete vars[ 'regex' ];
                delete vars[ 'functionSimple' ];
                delete vars[ 'functionParams' ];
                delete vars[ 'class' ];
                delete vars[ 'classInstance' ];
            }

            return vars;
        }
    }
}