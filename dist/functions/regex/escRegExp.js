/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
/**
 * Escapes a string for use in a regular expression.
 *
 * @category Functions – Regex
 *
 * @source
 *
 * @example
 * ```ts
 * new RegExp( `^${ escRegExp( filePath ) }\\/.+`, 'g' );
 * ```
 *
 * @param str To convert.
 *
 * @return  Escaped string.
 *
 * @since 0.1.0
 */
export function escRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
