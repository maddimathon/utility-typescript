/**
 * @since tmpl-0.1.1
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';

import {
    arrayUnique,
    mergeArgs,
    timestamp,
    typeOf,
} from '../functions/index.js';

import { AnyClass } from '../types/functions/basics.js';


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
export class VariableInspector<
    Type extends typeOf.TestType = typeOf.TestType,
> extends AbstractConfigurableClass<VariableInspector.Args> {



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

    /**
     * Validates the first input parameter to ensure it is an object with a single string key.
     *
     * @category Static
     * 
     * @see {@link VariableInspector.constructor}
     */
    protected static validateInput<
        Type extends typeOf.TestType
    >(
        variable: Type | { [ key: string ]: Type; },
    ): { [ key: string ]: Type; } {

        const inputKeys = Object.keys( variable as { [ key: string ]: Type; } );

        const inputHasOneStringKey =
            inputKeys.length === 1
            && typeof inputKeys[ 0 ] === 'string';

        // returns
        if ( inputHasOneStringKey ) {
            return variable as { [ key: string ]: Type; };
        }

        return { 'var': variable as Type };
    }


    /** Testing ==================================== **/

    /**
     * Used for testing.
     * 
     * @internal
     */
    private static get _testClass() {

        class TestClass {

            public undefinedProperty: any;
            public property = 'property sample value';

            static methodName( param: any ) { return param; }

            _getSet = '_getSet sample value';
            get getSetProp() { return this._getSet; }
            set getSetProp( param: string ) { this._getSet = param; }
        };

        return TestClass;
    }

    /**
     * Used for testing.
     * 
     * @internal
     */
    private static _testVars( verbose: boolean ) {

        const TestClass = VariableInspector._testClass;

        const classInstance = new TestClass();

        const vars: {
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
            objectEmpty?: object;
            objectSimple?: object;
            date?: Date;
            regex?: RegExp;
            functionSimple?: () => any;
            functionParams?: ( a: string, b: string ) => any;
            class?: typeof TestClass;
            classInstance?: typeof classInstance;
        } = {
            undefined,
            null: null,

            true: true,
            false: false,

            bigint: BigInt( 9007199254740991 ),
            number: Number( 207 ),
            'NaN': Number.NaN,
            string: 'string sample value',
            stringMultiline: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec bibendum in\njusto vulputate euismod.Vivamus vel lectus dolor.Curabitur ullamcorper\ninterdum diam, sit amet pulvinar odio tristique eget.Pellentesque sodales\naliquam ex in convallis.Morbi tristique, risus et imperdiet aliquam, libero\ndolor faucibus lacus, in tempus metus elit non ante.`,
            array: [ 'string sample value', Number( 207 ), {}, ],
            objectEmpty: {},
            objectSimple: {
                one: 1,
                two: 2,
            },

            date: new Date( '2024-02-08' ),
            regex: /^regex$/g,

            functionSimple: (): string => { return 'hello'; },
            functionParams: (
                value1: string,
                value2: string,
            ): string => { const test = value2; return test + value1; },

            'class': TestClass,
            classInstance,
        };

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

    /**
     * Used for testing.
     * 
     * @internal
     */
    public static get sampleComplexObject() {

        const t = VariableInspector._testVars( true );

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
    public static sample(
        _args: Partial<VariableInspector.Args> = {},
    ): VariableInspector<typeof VariableInspector.sampleComplexObject> {
        console.log( '\nVariableInspector.sample() @ ' + timestamp( null, { date: true, time: true } ) );
        console.log( '\n' );

        const args = VariableInspector.prototype.buildArgs( mergeArgs( {
            debug: true,
        } as Partial<VariableInspector.Args>, _args ) );

        /**
         * Calls `VariableInspector.dump() with args.`.
         */
        const varDump = ( variable: ConstructorParameters<typeof VariableInspector>[ 0 ] ) => {
            VariableInspector.dump( variable, args );
            console.log( '\n' );
        };

        const t = VariableInspector._testVars( !!args.debug );

        for ( const key in t ) {
            varDump( { [ key ]: t[ key as keyof typeof t ] } );
        }

        const complexVarInspect = new VariableInspector( { complexObject: VariableInspector.sampleComplexObject }, args );

        complexVarInspect.dump();
        console.log( '\n' );

        return complexVarInspect;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * @source
     */
    public get ARGS_DEFAULT(): VariableInspector.Args {

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

            // includePrototypeDescriptors: true,
            // includeDefaultPrototypeDescriptors: false,
            // includePrototypeInspection: false,

            indent: '    ',

            inspectClasses: false,
            inspectFunctions: false,

            locale: 'en-CA',
            localizeDates: true,
            localizeDateOptions: {},
            localizeNumbers: false,
            localizeNumberOptions: {},

            // multilineBreakVisualizers: false,
            // multilineBreakVisualizerString: '⠀',

            optsRecursive: false,

            stringQuoteCharacter: '"',
        };
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: Partial<VariableInspector.Args> ): VariableInspector.Args {

        const mergedDefault = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as VariableInspector.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );
    }

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



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * 
     * @param variable  Passing the variable to inspect within an single-prop object
     */
    public constructor (
        variable: Type | { [ key: string ]: Type; },
        args: Partial<VariableInspector.Args> = {},
    ) {
        super( args );

        const validVar = VariableInspector.validateInput( variable );

        this._name = Object.keys( validVar )[ 0 ];

        this._rawValue = validVar[ this._name ];

        this._typeOf = typeOf( this._rawValue );

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
    protected keyFormatter( key: number | string | symbol ): string {

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
     * Builds an array of the property names.  Used by {@link VariableInspector.indexProperties}
     *
     * @category Inputs
     */
    protected getPropertyNames(): ( ( number | string | symbol ) & keyof typeof this._rawValue )[] {

        type PropName = ( number | string | symbol ) & keyof typeof this._rawValue;

        // returns on array or unsupported types
        switch ( this._typeOf ) {

            case 'array':
                const indices: ( ( number | string ) & keyof typeof this._rawValue )[] = [];

                for ( let index = 0; index < ( this._rawValue as any[] ).length; index++ ) {
                    indices.push( index as number & keyof typeof this._rawValue );
                }

                indices.push( 'length' as string & keyof typeof this._rawValue );

                return indices;

            case 'object':
                break;

            default:
                return [];
        }

        const propertyNames: PropName[] = [
            Object.keys( this._rawValue as object ) as PropName[],
            Object.getOwnPropertyNames( this._rawValue ) as PropName[],
            Object.getOwnPropertySymbols( this._rawValue ) as PropName[],
            // Object.getOwnPropertyDescriptors( this._rawValue as object ) as PropName[],
        ].flat().filter( name => name !== '_getSet' );

        return arrayUnique( propertyNames );
    }

    /**
     * Builds an array of the properties for the current {@link VariableInspector._rawValue| this._rawValue()}.
     *
     * @category Inputs
     */
    protected indexProperties(): VariableInspector.Child[] {

        const properties: VariableInspector.Child[] = [];

        // returns
        if ( !this._rawValue ) {
            return properties;
        }

        // returns if it doesn't match a supported type
        switch ( this._typeOf ) {

            case 'array':
            case 'object':
                const constructorName = ( this._rawValue as object ).constructor?.name;

                // returns on match
                switch ( constructorName ) {

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
        propertyNames.forEach( ( name ) => {

            const value = ( this._rawValue as NonNullable<Type> )[ name ];

            properties.push( {

                key: {
                    name: name,
                    type: typeof name as "number" | "string" | "symbol",
                },

                vi: this._new( { [ this.keyFormatter( name ) ]: value }, {
                    equalString: ':',
                    includePrefix: true,
                } )
            } );
        } );

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
    protected formatter( stage: VariableInspector.StageKeys, str: string ): string {

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

        // returns if stage formatter exists
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
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    public prefix( skipFormatting: boolean = false ): string {

        const str = this._name + this.args.equalString;

        // returns
        if ( skipFormatting ) {
            return str;
        }

        return this.formatter( 'prefix', str );
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
    public type( skipFormatting: boolean = false ): string {

        /** Filters the type value before return. */
        const typeFilter = ( str: string ): string => {

            str = str.replace( /(^[\n\s]+|[\n\s]+$)/gi, '' );

            // returns
            if ( skipFormatting ) {
                return str;
            }

            return this.formatter( 'type', `<${ str }>` );
        };

        // returns on match
        switch ( this._typeOf ) {

            case 'NaN':
                return typeFilter( typeof Number.NaN );

            case 'object':
                const constructorName = ( this._rawValue as object ).constructor?.name;

                return typeFilter(
                    constructorName === 'Object'
                        ? 'object'
                        : constructorName
                );
        }

        return typeFilter( this._typeOf );
    }

    /**
     * Representation of the variable’s value to print, not including the 
     * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
     *
     * @category Compilers
     * 
     * @param skipFormatting  Optional. Whether to skip the formatter functions. Default false.
     */
    public value( skipFormatting: boolean = false ): string {

        /**
         * Returns a string formatted to represent the 
         * value-getting method. (e.g., when using a fallback)
         */
        const via = ( viaMethod: string ): string => {

            const str = `<via ${ viaMethod }>`;

            return skipFormatting ? str : this.formatter( 'via', str );
        };

        /** Filters the type value before return. */
        const valueFilter = ( str?: null | string, viaMethod?: string ): string => {

            const ret: string[] = [];

            if ( viaMethod ) {
                ret.push( via( viaMethod ) );
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
                ret.push( this.formatter( 'value', str ?? '' ) );
            }

            return ret.join( ' ' );
        };


        /**
         * PARSE BY TYPE
         */
        // returns on match
        switch ( this._typeOf ) {

            case 'null':
            case 'undefined':
                return valueFilter( this._rawValue as null | undefined );

            case 'bigint':
            case 'number':
                return valueFilter(
                    this.args.localizeNumbers
                        ? ( this._rawValue as number | BigInt ).toLocaleString( this.args.locale, this.args.localizeNumberOptions )
                        : ( this._rawValue as number | BigInt ).toString()
                );

            case 'boolean':
                return valueFilter( ( this._rawValue as boolean ).toString().toUpperCase() );

            case 'class':
                let classValue: string = ( this._rawValue as AnyClass ).prototype.constructor.name + ' {}';

                if ( this.args.inspectClasses ) {
                    classValue = ( this._rawValue as AnyClass ).toString();
                }
                return valueFilter( classValue );

            case 'function':
                let functionValue: string = ( this._rawValue as Function ).toString();

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
                return valueFilter( ( this._rawValue as number ).toString() );

            case 'array':
            case 'object':
                switch ( ( this._rawValue as object ).constructor?.name ) {

                    /**
                     * DATE
                     */
                    case 'Date':
                        const date = this._rawValue as Date;
                        return valueFilter(
                            this.args.localizeDates
                                ? date.toLocaleString( this.args.locale, this.args.localizeDateOptions )
                                : date.toString()
                        );

                    /**
                     * toString() classes
                     */
                    case 'RegExp':
                        return valueFilter( ( this._rawValue as RegExp ).toString().replace( /\\/g, '\\\\' ) );
                }
                return valueFilter( this._valueAsObject() );

            case 'string':
                return valueFilter( this.args.stringQuoteCharacter + ( this._rawValue as string ) + this.args.stringQuoteCharacter );
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

                if ( typeof ( this._rawValue as any )[ fn ] === 'function' ) {

                    const fnReturn = ( this._rawValue as any )[ fn ]();

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

            if ( typeof ( this._rawValue as any )[ fn ] === 'function' ) {

                const fnReturn = ( this._rawValue as any )[ fn ]();

                if ( typeof fnReturn === 'string' ) {
                    return `${ via( `.${ fn }()` ) } ${ fnReturn }`;
                }
            }
        }


        /**
         * FALLBACK
         * Interpolation
         */
        return `${ via( 'interpolation' ) } ${ String( this._rawValue ) }`;
    }


    /* Exporters ===================================== */

    /**
     * Print the contents to the console.
     * 
     * @category Exporters
     */
    public dump(): void {
        return console.log( this.toString() );
    };

    /**
     * The object shape used when converting to JSON.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    public override toJSON(): VariableInspector.JSON<Type> {

        const json: VariableInspector.JSON<Type> = {
            name: this._name,
            type: this._typeOf,

            inspection: this.value( true ),
        };

        const properties: VariableInspector.JSON<Type>[ 'properties' ] = {};

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
     * @see {@link AbstractConfigurableClass.toString)}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    public override toString(): string {

        const strs: ( false | string )[] = [
            this.args.includePrefix ? this.prefix() : false,
            this.args.includeType ? this.type() : false,
            this.args.includeValue ? this.value() : false,
        ];

        return strs.filter( v => v ).join( ' ' );
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
    public override valueOf(): VariableInspector.JSON<Type> { return this.toJSON(); }


    /* Recursion ===================================== */

    /**
     * Returns an instance of this class that inherits this instances’s args.
     * 
     * Meant for children/recursion of this inspection.
     * 
     * @category Recursion
     */
    protected _new(
        variable: ConstructorParameters<typeof VariableInspector>[ 0 ],
        args: Partial<VariableInspector.Args> = {},
    ): VariableInspector {

        args = mergeArgs( this.args, mergeArgs( this.args.childArgs, args ) );

        args.formatter = mergeArgs(
            this.args.formatter ?? {},
            mergeArgs(
                this.args.childArgs.formatter ?? {},
                args.formatter ?? {}
            )
        );

        return new VariableInspector( variable, args );
    }


    /* Translators ===================================== */

    /**
     * Creates a readable representation of {@link VariableInspector._rawValue} 
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
 */
export namespace VariableInspector {

    /**
     * A function for formatting inspection output strings.
     * 
     * @expand
     */
    export type Formatter = ( str: string ) => string;

    /**
     * Stages at which formatter functions may be used.
     * 
     * `_` is used if the applicable formatter is not present.
     * 
     * @expand
     */
    export type StageKeys = "_" | "prefix" | "type" | "value" | "via";

    /**
     * Optional configuration for {@link VariableInspector}.
     * 
     * @interface
     */
    export type Args = AbstractConfigurableClass.Args & {

        /**
         * Arguments to use as an override for child inspections (i.e., of the
         * property values).
         *
         * Useful to change things like the
         * {@link VariableInspector.Args.formatter} functions.
         * 
         * @default
         * { includeValue: true }
         */
        childArgs: Partial<Args>;

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

        // includePrototypeDescriptors: boolean;
        // includeDefaultPrototypeDescriptors: boolean;
        // includePrototypeInspection: boolean;

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
        locale: undefined | Intl.LocalesArgument;

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

        // /**
        //  * Adds this.multilineBreakVisualizerString to the start & end of multiline line breaks( multiline strings have a hanging indent added for display).
        //  */
        // multilineBreakVisualizers: boolean;
        // multilineBreakVisualizerString: string;

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
    export interface Child {

        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };

        vi: VariableInspector;
    }

    /**
     * The shape used when converting this object to JSON.
     * 
     * @expandType ReturnType
     * 
     * @expand
     */
    export interface JSON<
        Type extends typeOf.TestType = typeOf.TestType,
    > {

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
         * 
         * @interface
         */
        properties?: {
            [ key: number | string | symbol ]: JSON_Child;
        };

        /**
         * The simple type name.
         * 
         * @see {@link VariableInspector._typeOf}
         */
        type: VariableInspector<Type>[ '_typeOf' ];

        // /**
        //  * The value of the inspected object.
        //  * 
        //  * Some types, like BigInt, have to be converted to export to JSON.
        //  * 
        //  * @see {@link VariableInspector._rawValue}
        //  */
        // value: Type | number | string;
    }

    /**
     * The shape used when converting this object to JSON.
     */
    export interface JSON_Child {

        key: {
            name: number | string | symbol;
            type: "number" | "string" | "symbol";
        };

        value: JSON;
    }
}