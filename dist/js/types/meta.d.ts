/**
 * Types useful only when using this package.  Some many only be useful
 * internally.
 *
 * @module Meta
 *
 * @since 1.0.0-draft
 *
 * @example
 * ```ts
 * import { Meta } from '@maddimathon/utility-typescript/types';
 * import { ... } from '@maddimathon/utility-typescript/types/meta';
 * ```
 */
/**
 * @package @maddimathon/utility-typescript@1.0.0-draft
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage https://maddimathon.github.io/utility-typescript
 *
 * @license MIT
 */
/*!
 * @maddimathon/utility-typescript@1.0.0-draft
 * @license MIT
 */
/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 */
export type TypeDump<T> = T extends (...args: infer A) => infer R ? (...args: TypeDump<A>) => TypeDump<R> : T extends any ? {
    [K in keyof T]: T[K];
} : never;
/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 */
export type TypeDumpRecursive<T> = T extends (...args: infer A) => infer R ? (...args: TypeDump<A>) => TypeDumpRecursive<R> : T extends any ? {
    [K in keyof T]: TypeDumpRecursive<T[K]>;
} : never;
//# sourceMappingURL=meta.d.ts.map