/**
 * @since 2.0.0-beta.6
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
/**
 * Tries to merge object types together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since 2.0.0-beta.6
 *
 * @expand
 */
export type MergeObjects<A, B> = {
    [K in keyof A | keyof B]: A[K & keyof A] | B[K & keyof B];
};
/**
 * Tries to merge an object union together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since 2.0.0-beta.6
 *
 * @expand
 */
export type MergeObjectsUnion<U extends {}> = {
    [K in keyof UnionToIntersection<U>]: UnionToIntersection<U>[K];
};
/**
 * Tries to merge object types together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since 2.0.0-beta.6
 *
 * @expand
 */
export type MergeObjectsReplace<A, B> = {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : A[K & keyof A];
};
/**
 * Converts a union type to an intersection type.  Use cautiously as results may
 * not always be what you expect.
 *
 * @since 2.0.0-beta.6
 *
 * @experimental
 * @expand
 */
export type UnionToIntersection<U extends {}> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
