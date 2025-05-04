/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.3.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.3.0-draft
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
export function escRegExpReplace(str) {
    return str.replace(/\$/g, '$$$$');
}
//# sourceMappingURL=escRegExpReplace.js.map