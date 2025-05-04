/**
 * @since 0.1.0
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

import { AnyClass } from '../functions/basics.js';

/**
 * Merges object shapes into one.
 * 
 * @since 0.4.0-draft
 * 
 * @example
 * ```ts
 * type ObjectAandB = MergeObjects<ObjectA & ObjectB>;
 * ```
 */
export type MergeObjects<T> =
    T extends ( ...args: infer A ) => infer R
    ? ( ...args: MergeObjects<A> ) => MergeObjects<R>
    : (
        T extends object
        ? { [ K in keyof T ]: MergeObjects<T[ K ]> }
        : (
            T extends any
            ? T
            : never
        )
    );


/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 * 
 * @param T  Type to Partial-ize. Can be a non-object without error.
 */
type RecursivePartial_Inner<T> = T extends number | null | string | undefined | AnyClass | Function | Date
    ? T
    : T extends Record<number | string, any>
    ? RecursivePartial<T>
    : T;

/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 * 
 * @param T  Type to Partial-ize.
 */
export type RecursivePartial<T extends Record<number | string, any>> = {
    [ K in keyof T ]?:
    T[ K ] extends ( infer V )[]
    ? RecursivePartial_Inner<V>[]
    : RecursivePartial_Inner<T[ K ]>;
};