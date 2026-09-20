/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
import type { MergeObjectsUnion, UnionToIntersection } from '../unions-intersections.js';
/**
 * Tries to get a more type-aware array of a known object's entry pairs.
 *
 * @since 2.0.0-beta.6
 *
 * @example
 * ```ts
 * const obj = {
 *     a: 'hello',
 *     b: [ 'one', 2 ],
 *     c: 42,
 * };
 * // expected type:
 * // { a: string; b: ( number | string )[]; c: number; }
 *
 * const entries = Object.entries( obj )[ 0 ] as ToEntry<typeof obj>;
 * // expected type:
 * // [ 'a', string ] | [ 'b', ( number | string )[] ] | [ 'c', number ] | undefined
 * ```
 *
 * @expand
 */
export type ToEntry<O extends {} = {
    [key: number | string | symbol]: any;
}> = {
    readonly [K in keyof Required<O>]: [K, O[K]];
}[keyof O];
/**
 * Tries to get a more type-aware array of a known object's entry pairs and
 * returns a read-only result.
 *
 * @since 2.0.0-beta.6
 *
 * @expand
 */
export type ToEntryReadonly<O extends {} = {
    [key: number | string | symbol]: any;
}> = {
    readonly [K in keyof Required<O>]: readonly [K, O[K]];
}[keyof O];
/**
 * Tries to get a more type-aware array of a known object's entry pairs.
 *
 * @since 2.0.0-beta.6
 *
 * @example
 * ```ts
 * const obj = {
 *     a: 'hello',
 *     b: [ 'one', 2 ],
 *     c: 42,
 * };
 * // expected type:
 * // { a: string; b: ( number | string )[]; c: number; }
 *
 * const entries = Object.entries( obj ) as ToEntriesArray<typeof obj>;
 * // expected type:
 * // ( [ 'a', string ] | [ 'b', ( number | string )[] ] | [ 'c', number ] )[]
 * ```
 *
 * @expand
 */
export type ToEntriesArray<O extends {} = {
    [key: number | string | symbol]: any;
}> = {
    readonly [K in keyof Required<O>]: [K, O[K]];
}[keyof O][];
/**
 * Tries to get a more type-aware array of a known object's entry pairs
 * and returns a read-only result.
 *
 * @since 2.0.0-beta.6
 *
 * @expand
 */
export type ToEntriesArrayReadonly<O extends {} = {
    [key: number | string | symbol]: any;
}> = readonly {
    readonly [K in keyof Required<O>]: readonly [K, O[K]];
}[keyof O][];
/**
 * Tries to reconstitue a type created with {@link ToEntriesArray} or
 * {@link ToEntriesArrayReadonly} for better
 * {@link !Object.fromEntries | Object.fromEntries} typing.
 *
 * @expand
 */
export type FromEntries<T_Entries extends ToEntriesArray | ToEntriesArrayReadonly> = MergeObjectsUnion<FromEntries.Internal<FromEntries.TuplifyUnion<T_Entries[number]>>>;
/**
 * Intended only for use by {@link FromEntries}.
 *
 * @internal
 */
export declare namespace FromEntries {
    /**
     * @expand
     */
    type Internal<T_Entries extends [...any[]]> = {
        [Index in Extract<keyof T_Entries, `${number}`>]: {
            [K in T_Entries[Index][0]]: T_Entries[Index][1];
        };
    }[Extract<keyof T_Entries, `${number}`>];
    /**
     * Only to be used for this case where tuple order does not matter.
     *
     * From: {@link https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type}
     *
     * @expand
     */
    type TuplifyUnion<T, L = UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never, N = [T] extends [never] ? true : false> = true extends N ? [] : [...TuplifyUnion<Exclude<T, L>>, L];
}
/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since 2.0.0-beta.2 — Experimental.
 *
 * @experimental
 */
export type RecursiveMap<T_Keys, T_Values> = Map<T_Keys, T_Values | RecursiveMap<T_Keys, T_Values>>;
/**
 * Similar to the built-in `Record` type, but where the object's values can also
 * be identical records.
 *
 * @since 2.0.0-beta.2 — Experimental.
 *
 * @experimental
 */
export type RecursiveRecord<T_Keys extends keyof any, T_Values extends any> = {
    [K in T_Keys]: T_Values | RecursiveRecord<T_Keys, T_Values>;
};
