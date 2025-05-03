/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.1.0
 */
/*!
 * @maddimathon/utility-typescript@0.1.0
 * @license MIT
 */
import { AnyClass } from '../functions/basics.js';
/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 *
 * @param T  Type to Partial-ize. Can be a non-object without error.
 */
type RecursivePartial_Inner<T> = T extends number | null | string | undefined | AnyClass | Function | Date ? T : T extends Record<number | string, any> ? RecursivePartial<T> : T;
/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 *
 * @interface
 *
 * @param T  Type to Partial-ize.
 */
export type RecursivePartial<T extends Record<number | string, any>> = {
    [K in keyof T]?: T[K] extends (infer V)[] ? RecursivePartial_Inner<V>[] : RecursivePartial_Inner<T[K]>;
};
export {};
//# sourceMappingURL=basics.d.ts.map