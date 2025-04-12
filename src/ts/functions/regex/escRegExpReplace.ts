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
 * Escapes a string for use as a replacement for a regular expression.
 * 
 * @category  Escapers
 * 
 * @source
 * 
 * @example
 * ```ts
 * 'cash money'.replace( /(dollars?|money)/gi, escRegExpReplace( '$$$' ) );
 * // result: 'cash $$$'
 * ```
 * 
 * @param str To convert.
 */
export function escRegExpReplace( str: string ): string {
    return str.replace( /\$/g, '$$$$' );
}