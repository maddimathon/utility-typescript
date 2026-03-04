/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since ___PKG_VERSION___ — Experimental.
 * 
 * @experimental
 */
export type RecursiveMap<T_Keys, T_Values> = Map<
    T_Keys,
    T_Values | RecursiveMap<T_Keys, T_Values>
>;

/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since ___PKG_VERSION___ — Experimental.
 * 
 * @experimental
 */
export type RecursiveRecord<
    T_Keys extends keyof any,
    T_Values extends any,
> = {
        [ K in T_Keys ]: T_Values | RecursiveRecord<T_Keys, T_Values>;
    };