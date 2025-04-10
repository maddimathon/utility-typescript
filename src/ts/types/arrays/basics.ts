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

/**
 * Infers the item types of a known array type.
 * 
 * @param A  Array with the items to type.
 */
export type ArrayItem<
    A extends readonly unknown[]
> = A extends readonly ( infer I )[] ? I : never;