/**
 * Types useful only when using this package.  Some many only be useful
 * internally.
 *
 * @module Meta
 * @category Namespaces
 *
 * @since ___PKG_VERSION___
 *
 * @example
 * ```ts
 * import { Meta } from '@maddimathon/utility-typescript/types';
 * import { ... } from '@maddimathon/utility-typescript/types/meta';
 * ```
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 */
export type TypeDump<T> =
    T extends ( ...args: infer A ) => infer R
    ? ( ...args: TypeDump<A> ) => TypeDump<R>
    : T extends any ? { [ K in keyof T ]: T[ K ] } : never;

/**
 * For debugging types with intellisense/etc. Should only be used temporarily.
 */
export type TypeDumpRecursive<T> =
    T extends ( ...args: infer A ) => infer R
    ? ( ...args: TypeDump<A> ) => TypeDumpRecursive<R>
    : T extends any ? { [ K in keyof T ]: TypeDumpRecursive<T[ K ]> } : never;