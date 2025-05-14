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
 * @since 0.4.2
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
    T[ K ] extends ( infer I )[]
    ? RecursivePartial_Inner<I>[]
    : RecursivePartial_Inner<T[ K ]>;
};

/**
 * Similar to the default Required, but this also makes any child objects
 * Required.
 * 
 * @param T  Type to require.
 */
export type RecursiveRequired<T> = {
    [ K in keyof T ]-?: Required<T>[ K ] extends number | null | string | undefined | AnyClass | Function | Date
    ? Required<T>[ K ]
    : Required<T>[ K ] extends ( infer I )[]
    ? ( object extends I ? RecursiveRequired<I>[] : I[] )
    : Required<T>[ K ] extends object
    // this weird-ish approach to recursion gives us better output types without
    // using TypeDump
    ? { [ S in keyof Required<T>[ K ] ]-?: RecursiveRequired<Required<T>[ K ]>[ S ] }
    : Required<T>[ K ];
};

/**
 * Converts an object into a class-compatible type that requires all properties
 * to be present, even if their values are undefined.
 * 
 * @param T             Type or interface to convert to a class.
 * @param RequiredKeys  Optional. Keys that cannot be undefined. Default `never`.
 * 
 * @experimental
 * @expand
 */
export type RequirePartial<
    T,
    RequiredKeys extends keyof T = never,
> = RecursiveRequired<Pick<T, RequiredKeys>> & Omit<T, RequiredKeys>;