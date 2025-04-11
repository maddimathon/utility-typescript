/**
 * @since 1.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@1.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@1.0.0-draft
 * @license MIT
 */
/**
 * Infers the item types of a known array type.
 *
 * @param A  Array with the items to type.
 */
export type ArrayItem<A extends readonly unknown[]> = A extends readonly (infer I)[] ? I : never;
//# sourceMappingURL=basics.d.ts.map