/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
/**
 * Converts an object into a class-compatible type that requires all properties
 * to be present, even if their values are undefined.
 *
 * @param T_Object  Type or interface to convert.
 *
 * @since 2.0.0-alpha
 */
export type Classify<T_Object> = {
    [_Key in Exclude<keyof T_Object, never>]: T_Object[_Key];
};
//# sourceMappingURL=classes.d.ts.map