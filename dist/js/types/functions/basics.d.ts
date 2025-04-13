/**
 * @since 0.9.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.9.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.9.0-draft
 * @license MIT
 */
/**
 * Refines the function type to only apply to classes.
 *
 * @param O  Optionally restrict the type of object for the class instances.
 */
export type AnyClass<O extends Object = Object> = new (...args: any[]) => O;
//# sourceMappingURL=basics.d.ts.map