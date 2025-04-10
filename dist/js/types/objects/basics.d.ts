/**
 * @since tmpl-1.1.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@tmpl-1.1.0-draft
 */
/*!
 * @maddimathon/utility-typescript@tmpl-1.1.0-draft
 * @license MIT
 */
import { AnyClass } from '../functions/basics.js';
/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 *
 * @expand
 *
 * @param T  Type to Partial-ize. Can be a non-object without error.
 */
type RecursivePartial_Inner<U> = U extends number | null | string | undefined | AnyClass | Function ? U : U extends Record<number | string, any> ? RecursivePartial<U> : U;
/**
 * Similar to the default Partial, but this also makes any child objects
 * Partial.
 *
 * @param T  Type to Partial-ize.
 */
export type RecursivePartial<T extends Record<number | string, any>> = T extends AnyClass | Function ? T : {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial_Inner<U>[] : RecursivePartial_Inner<T[P]>;
};
export {};
//# sourceMappingURL=basics.d.ts.map