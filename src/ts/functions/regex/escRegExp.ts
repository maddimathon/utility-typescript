/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Escapes a string for use in a regular expression.
 * 
 * @source
 * 
 * @example
 * ```ts
 * new RegExp( `^${ escRegExp( filePath ) }\/.+`, 'g' );
 * ```
 * 
 * @param str To convert.
 */
export function escRegExp( str: string ): string {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
}