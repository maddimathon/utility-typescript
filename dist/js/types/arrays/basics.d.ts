/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.1.1
 */
/*!
 * @maddimathon/utility-typescript@0.1.1
 * @license MIT
 */
/**
 * Infers the item types of a known array type.
 *
 * @param A  Array with the items to type.
 */
export type ArrayItem<A extends readonly unknown[]> = A extends readonly (infer I)[] ? I : never;
//# sourceMappingURL=basics.d.ts.map