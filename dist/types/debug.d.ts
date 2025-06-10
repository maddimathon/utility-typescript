/**
 * Types useful only for debugging and testing other types.
 *
 * @module Debug
 *
 * @since 0.1.0
 * @since 2.0.0-alpha — Renamed from Meta (meta) to Debug.
 *
 * @example
 * ```ts
 * import { Debug } from '@maddimathon/utility-typescript/types';
 * import { ... } from '@maddimathon/utility-typescript/types/debug';
 * ```
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta
 * @license MIT
 */
import { AnyClass } from './functions/index.js';
/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 *
 * @param T  Type to debug.
 *
 * @since 0.1.0
 */
export type TypeDump<T> = T extends (number | null | string | undefined | AnyClass | Date) ? T : T extends (...args: infer _Params) => infer _Return ? (...args: TypeDump<_Params>) => TypeDump<_Return> : T extends any ? {
    [_Key in keyof T]: T[_Key];
} : never;
/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 *
 * @param T  Type to debug.
 *
 * @since 0.1.0
 */
export type TypeDumpRecursive<T> = T extends (number | null | string | undefined | AnyClass | Date) ? T : T extends (...args: infer _Params) => infer _Return ? (...args: TypeDump<_Params>) => TypeDumpRecursive<_Return> : T extends any ? {
    [_Key in keyof T]: TypeDumpRecursive<T[_Key]>;
} : never;
//# sourceMappingURL=debug.d.ts.map