/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Infers the item types of a known array type.
 * 
 * @param T_Array  Array with the items to type.
 * 
 * @since 0.1.0
 * @since 2.0.0-alpha — Is now global rather than being the only member 
 *                            of the Arrays namespace.
 */
export type ArrayItem<
    T_Array extends readonly unknown[]
> = T_Array extends readonly ( infer I )[] ? I : never;

/**
 * A super-simple utility for types that may or may not be arrays.
 * 
 * @since 2.0.0-beta.3
 */
export type SelfOrArray<T> = T | T[];

/**
 * Returns a tuple without its last item.
 * 
 * @since 2.0.0-beta.3
 * 
 * @source
 */
export type TuplePop<
    T_Tuple extends readonly unknown[]
> = T_Tuple extends readonly [
    ...infer R,
    // @ts-expect-error
    infer A
] ? R : [];

/**
 * Returns a tuple without its first item.
 * 
 * @since 2.0.0-beta.3
 * 
 * @source
 */
export type TupleShift<
    T_Tuple extends readonly unknown[]
> = T_Tuple extends readonly [
    // @ts-expect-error
    infer A,
    ...infer R
] ? R : [];