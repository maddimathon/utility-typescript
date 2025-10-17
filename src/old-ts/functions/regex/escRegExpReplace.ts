/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
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
 * 
 * @return  Escaped string.
 * 
 * @since 0.1.0
 */
export function escRegExpReplace( str: string ): string {
    return str.replace( /\$/g, '$$$$' );
}