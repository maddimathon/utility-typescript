/**
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */
/**
 * Infers the item types of a known array type.
 *
 * @param T_Array  Array with the items to type.
 *
 * @since 0.1.0
 * @since 2.0.0-alpha — Is now global rather than being the only member of the Arrays namespace.
 * @since ___PKG_VERSION___ — Moved to new architechture.
 */
export type ArrayItem<T_Array extends readonly unknown[]> = T_Array extends readonly (infer I)[] ? I : never;
//# sourceMappingURL=arrays.d.ts.map