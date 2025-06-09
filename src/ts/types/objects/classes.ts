/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
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
    // this exclude means that optional properties are required but their value
    // is still undefined, unlike with `[ _Key in keyof T_Object ]-?`
    [ _Key in Exclude<keyof T_Object, never> ]: T_Object[ _Key ];
};