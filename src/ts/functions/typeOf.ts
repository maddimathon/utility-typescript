/**
 * @since ___PKG_VERSION___
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

import { AnyClass } from '../types/functions/index.js';

import { mergeArgs } from './objects/mergeArgs.js';

/**
 * Used only for {@link typeOf | typeOf()}.
 */
export namespace typeOf {

    /**
     * Optional configuation for {@link typeOf | typeOf()}.
     * @interface
     * @expand
     */
    export interface Args {

        /**
         * If true, arrays will return `'array'` instead of `'object'`.
         * 
         * @default true
         */
        distinguishArrays: boolean;
    }

    type ObjectReturn<Type extends TestType> = Type extends (
        | ( () => any )
        | any[]
        | AnyClass
        | BigInt
        | boolean
        | Function
        | null
        | number
        | string
        | symbol
        | Symbol
        | undefined
    ) ? never : "object";

    /**
     * Return options for the {@link typeOf | typeOf()}.
     * 
     * @param Type  Type of variable being testing.
     * 
     * @expand
     */
    export type Return<Type extends TestType> =
        | ( Type extends any[] ? "array" : never )
        | ( Type extends BigInt ? "bigint" : never )
        | ( Type extends boolean ? "boolean" : never )
        | ( Type extends AnyClass ? "class" : never )
        | ( Type extends ( ( () => any ) | Function ) ? ( Type extends AnyClass ? never : "function" ) : never )
        | ( Type extends null ? "null" : never )
        | ( Type extends number ? ( "number" | "NaN" ) : never )
        | ( Type extends ( object | Object ) ? ObjectReturn<Type> : never )
        | ( Type extends string ? "string" : never )
        | ( Type extends ( symbol | Symbol ) ? "symbol" : never )
        | ( Type extends undefined ? "undefined" : never );

    /**
     * Input variable types for the {@link typeOf | typeOf()}.
     */
    export type TestType =
        | ( () => any )
        | any[]
        | AnyClass
        | BigInt
        | boolean
        | Function
        | null
        | number
        | object
        | Object
        | string
        | symbol
        | Symbol
        | undefined;
}

/**
 * An alias for the typeof keyword that returns additional options.
 * 
 * @see {@link typeOf.Args}
 * @see {@link typeOf.TestType}
 * @see {@link typeOf.Return}
 * 
 * @typeParam T  Type of the variable being checked.
 * 
 * @param variable  To test for value type.
 * @param _args     Optional configuration. See {@link typeOf.Args}.
 * 
 * @return Expanded type string.
 */
export function typeOf<T extends typeOf.TestType>(
    variable: T,
    _args: Partial<typeOf.Args> = {},
): string & typeOf.Return<T> {

    const args: typeOf.Args = mergeArgs(
        {
            distinguishArrays: true,
        } as typeOf.Args & mergeArgs.Obj,
        _args,
        false
    );


    /*
     * BY VALUE
     */
    if ( variable === null ) { return 'null' as typeOf.Return<T>; }
    if ( variable === undefined ) { return 'undefined' as typeOf.Return<T>; }


    /*
     * BY TYPE
     */

    const typeOf = typeof variable;

    switch ( typeOf ) {

        case 'function':
            return typeof ( variable as Function ).prototype === 'undefined'
                ? 'function' as typeOf.Return<T>
                : 'class' as typeOf.Return<T>;

        case 'number':
            // returns
            if ( Number.isNaN( variable as number ) ) {
                return 'NaN' as typeOf.Return<T>;
            }
            return 'number' as typeOf.Return<T>;

        case 'object':
            // returns
            if ( args.distinguishArrays && Array.isArray( variable ) ) {
                return 'array' as typeOf.Return<T>;
            }
            return 'object' as typeOf.Return<T>;
    }

    return typeOf as typeOf.Return<T>;
}