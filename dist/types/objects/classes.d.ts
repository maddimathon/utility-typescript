/**
 * @since 2.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
 * @license MIT
 */
import { RequirePartial } from './basics.js';
/**
 * Converts an object into a class-compatible type that requires all properties
 * to be present, even if their values are undefined.
 *
 * @param T             Type or interface to convert to a class.
 * @param RequiredKeys  Optional. Keys that cannot be undefined. Default `never`.
 *
 * @experimental
 * @expand
 */
export type Classify<T, RequiredKeys extends keyof T = never> = RequirePartial<T, RequiredKeys> & {
    [K in Exclude<keyof T, RequiredKeys>]: (T[K] extends undefined ? (T[K] | undefined) : T[K]);
};
//# sourceMappingURL=classes.d.ts.map