/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
import { AnyClass } from '../functions/index.js';
/**
 * Similar to the default Required, but this also makes any child objects
 * Required.
 *
 * @param T  Type to require.
 */
export type RecursiveRequired<T> = {
    [K in keyof T]-?: Required<T>[K] extends number | null | string | undefined | AnyClass | Function | Date ? Required<T>[K] : Required<T>[K] extends (infer I)[] ? (object extends I ? RecursiveRequired<I>[] : I[]) : Required<T>[K] extends object ? {
        [S in keyof Required<T>[K]]-?: RecursiveRequired<Required<T>[K]>[S];
    } : Required<T>[K];
};
/**
 * Requires the given required keys only and leaves the rest as-is.
 *
 * For the recursive version, see {@link RecursiveRequiredPartially}.
 *
 * @param T_Object        Type or interface to convert to a class.
 * @param T_RequiredKeys  Keys that cannot be undefined. Default `never`.
 */
export type RequiredPartially<T_Object, T_RequiredKeys extends keyof T_Object = never> = Required<Pick<T_Object, T_RequiredKeys>> & Omit<T_Object, T_RequiredKeys>;
/**
 * Recursively Requires the given required keys only and leaves the rest as-is —
 * i.e., the recursive version of {@link RequiredPartially}.
 *
 * @param T_Object        Type or interface to convert to a class.
 * @param T_RequiredKeys  Keys that cannot be undefined. Default `never`.
 */
export type RecursiveRequiredPartially<T_Object, T_RequiredKeys extends keyof T_Object = never> = RecursiveRequired<Pick<T_Object, T_RequiredKeys>> & Omit<T_Object, T_RequiredKeys>;
//# sourceMappingURL=required.d.ts.map