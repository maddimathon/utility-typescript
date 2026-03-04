/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
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
//# sourceMappingURL=records.d.ts.map