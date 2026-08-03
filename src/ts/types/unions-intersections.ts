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
 * Tries to merge object types together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since ___PKG_VERSION___
 * 
 * @expand
 */
export type MergeObjects<A, B> = {
    [ K in keyof A | keyof B ]: A[ K & keyof A ] | B[ K & keyof B ]
};

/**
 * Tries to merge an object union together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since ___PKG_VERSION___
 * 
 * @expand
 */
export type MergeObjectsUnion<U extends {}> = {
    [ K in keyof UnionToIntersection<U> ]: UnionToIntersection<U>[ K ]
};

/**
 * Tries to merge object types together.  Use cautiously as results may not
 * always be what you expect.
 *
 * @since ___PKG_VERSION___
 * 
 * @expand
 */
export type MergeObjectsReplace<A, B> = {
    [ K in keyof A | keyof B ]: K extends keyof B ? B[ K ] : A[ K & keyof A ]
};

/**
 * Converts a union type to an intersection type.  Use cautiously as results may
 * not always be what you expect.
 *
 * @since ___PKG_VERSION___
 * 
 * @experimental
 * @expand
 */
export type UnionToIntersection<U extends {}> = ( U extends any ? ( k: U ) => void : never ) extends ( ( k: infer I ) => void ) ? I : never;