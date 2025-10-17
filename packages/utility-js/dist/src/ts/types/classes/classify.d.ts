/**
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */
/**
 * Converts an object into a class-compatible type that requires all properties
 * to be present, even if their values are undefined.
 *
 * @param T_Object  Type or interface to convert.
 *
 * @since 2.0.0-alpha
 * @since ___PKG_VERSION___ — Moved to new architechture.
 */
export type Classify<T_Object> = {
    [_Key in Exclude<keyof T_Object, never>]: T_Object[_Key];
};
//# sourceMappingURL=classify.d.ts.map