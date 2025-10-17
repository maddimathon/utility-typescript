/**
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */
import type { AnyClass } from './classes/anyClass.js';
/**
 * Types useful only for debugging and testing other types.  It is unwise to
 * rely on these too heavily.
 *
 * @since 0.1.0
 * @since 2.0.0-alpha — Renamed from Meta (meta) to Debug.
 * @since ___PKG_VERSION___ — Moved to new architechture.
 *
 * @example
 * ```ts
 * import type { Debug } from '@maddimathon/utility-js';
 * ```
 *
 * @experimental
 */
export declare namespace Debug {
    /**
     * For debugging types with intellisense/etc. Should only be used temporarily.
     *
     * @param T  Type to debug.
     *
     * @since 0.1.0
     */
    type TypeDump<T> = T extends (number | null | string | undefined | AnyClass | Date) ? T : T extends (...args: infer _Params) => infer _Return ? (...args: TypeDump<_Params>) => TypeDump<_Return> : T extends any ? {
        [_Key in keyof T]: T[_Key];
    } : never;
    /**
     * For debugging types with intellisense/etc. Should only be used temporarily.
     *
     * @param T  Type to debug.
     *
     * @since 0.1.0
     */
    type TypeDumpRecursive<T> = T extends (number | null | string | undefined | AnyClass | Date) ? T : T extends (...args: infer _Params) => infer _Return ? (...args: TypeDump<_Params>) => TypeDumpRecursive<_Return> : T extends any ? {
        [_Key in keyof T]: TypeDumpRecursive<T[_Key]>;
    } : never;
}
//# sourceMappingURL=debug.d.ts.map