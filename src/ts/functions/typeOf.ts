/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { AnyClass } from '../types/functions/index.js';


/**
 * An alias for the typeof keyword that returns additional options.
 * 
 * @category  Debuggers
 * 
 * @typeParam T_Type  The possible types for the variable being tested. (This 
 *                    helps restrict the results as applicable.)
 * 
 * @param variable  To test for type.
 * 
 * @return  Expanded type options.
 * 
 * @since 0.1.0
 */
export function typeOf<T_Type extends typeOf.TestType>( variable: T_Type ) {

    /*
     * BY VALUE
     */
    if ( variable === null ) { return 'null' as typeOf.Return<T_Type>; }
    if ( variable === undefined ) { return 'undefined' as typeOf.Return<T_Type>; }


    /*
     * BY TYPE
     */

    const typeOf = typeof variable;

    switch ( typeOf ) {

        case 'function':
            return typeof ( variable as Function ).prototype === 'undefined'
                ? 'function' as typeOf.Return<T_Type>
                : 'class' as typeOf.Return<T_Type>;

        case 'number':
            // returns
            if ( Number.isNaN( variable as number ) ) {
                return 'NaN' as typeOf.Return<T_Type>;
            }
            return 'number' as typeOf.Return<T_Type>;

        case 'object':
            // returns
            if ( Array.isArray( variable ) ) {
                return 'array' as typeOf.Return<T_Type>;
            }
            return 'object' as typeOf.Return<T_Type>;
    }

    return typeOf as typeOf.Return<T_Type>;
}

/**
 * Used only for {@link typeOf | typeOf()}.
 * 
 * @since 0.1.0
 */
export namespace typeOf {

    /**
     * Return options for the {@link typeOf | typeOf()}.
     *
     * The complete options for return are: `array`, `bigint`, `boolean`,
     * `class`, `function`, `NaN`, `null`, `number`, `object`, `string`,
     * `symbol`, `undefined`.
     *
     * @param T_Type  Type of variable being tested.
     * 
     * @since 0.1.0
     */
    export type Return<T_Type extends TestType> =
        | ( T_Type extends any[] ? "array" : never )
        | ( T_Type extends BigInt ? "bigint" : never )
        | ( T_Type extends boolean ? "boolean" : never )
        | ( T_Type extends AnyClass ? "class" : never )
        | ( T_Type extends ( ( () => any ) | Function ) ? ( T_Type extends AnyClass ? never : "function" ) : never )
        | ( T_Type extends null ? "null" : never )
        | ( T_Type extends number ? ( "number" | "NaN" ) : never )
        | ( T_Type extends ( object | Object ) ? ( Exclude<T_Type & object, Return_NotObject> extends never ? never : "object" ) : never )
        | ( T_Type extends string ? "string" : never )
        | ( T_Type extends ( symbol | Symbol ) ? "symbol" : never )
        | ( T_Type extends undefined ? "undefined" : never );

    /**
     * Types that _are_ objects, but are not actually evaluated as such in the
     * {@link typeOf | typeOf()} function.
     * 
     * @since 0.1.0
     */
    export type Return_NotObject =
        | ( () => any | void )
        | []
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
        | undefined;

    /**
     * Input variable types for the {@link typeOf | typeOf()}.
     * 
     * @since 0.1.0
     */
    export type TestType =
        | undefined
        | ( () => any | void )
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
        | Symbol;
}