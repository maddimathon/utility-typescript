/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
import type { AnyClass } from '../functions/index.js';
/**
 * {@link Partial}-izes an object, except for the given RequiredKeys, which are
 * converted to be required.
 *
 * For the recursive version, see {@link RecursivePartialExcept}.
 *
 * @param T_Object        Type or interface to transform.
 * @param T_KeysRequired  Optional. Keys that must be included. Default `never`.
 *
 * @since 2.0.0-alpha
 */
export type PartialExcept<T_Object, T_KeysRequired extends keyof T_Object = never> = Partial<Omit<T_Object, T_KeysRequired>> & Pick<Required<T_Object>, T_KeysRequired>;
/**
 * Recursively {@link Partial}-izes an object, except for the given
 * RequiredKeys — i.e., the recursive version of {@link PartialExcept}.
 *
 * @param T_Object        Type or interface to transform.
 * @param T_KeysRequired  Optional. Keys that must be included. Default `never`.
 *
 * @since 2.0.0-alpha
 */
export type RecursivePartialExcept<T_Object, T_KeysRequired extends keyof T_Object = never> = RecursivePartial<Omit<T_Object, T_KeysRequired>> & Pick<Required<T_Object>, T_KeysRequired>;
/**
 * This is used by {@link RecursivePartial} type to aid in recursion.
 *
 * @param T_Object  Type to {@link Partial}-ize. Can be a non-object without error.
 *
 * @since 0.1.0
 *
 * @internal
 * @private
 */
export type _RecursivePartial_Inner<T_Object> = T_Object extends number | null | string | undefined | AnyClass | Function | Date ? T_Object : T_Object extends Record<number | string, any> ? RecursivePartial<T_Object> : T_Object;
/**
 * Similar to the default {@link Partial}, but this also makes any child objects
 * partial.
 *
 * @param T_Object  Type to Partial-ize.
 *
 * @since 0.1.0
 */
export type RecursivePartial<T_Object extends Record<number | string | symbol, any>> = {
    [_Key in keyof T_Object]?: T_Object[_Key] extends (infer _Item)[] ? _RecursivePartial_Inner<_Item>[] : _RecursivePartial_Inner<T_Object[_Key]>;
};
//# sourceMappingURL=partial.d.ts.map