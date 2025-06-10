/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta
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
export function escRegExpReplace(str) {
    return str.replace(/\$/g, '$$$$');
}
//# sourceMappingURL=escRegExpReplace.js.map