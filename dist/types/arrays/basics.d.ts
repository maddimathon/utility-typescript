/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.draft
 * @license MIT
 */
/**
 * Infers the item types of a known array type.
 *
 * @param T_Array  Array with the items to type.
 *
 * @since 0.1.0
 * @since 2.0.0-alpha.draft — Is now global rather than being the only member
 *                            of the Arrays namespace.
 */
export type ArrayItem<T_Array extends readonly unknown[]> = T_Array extends readonly (infer I)[] ? I : never;
//# sourceMappingURL=basics.d.ts.map