/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.1
 */
/*!
 * @maddimathon/utility-typescript@0.4.1
 * @license MIT
 */
/**
 * Escapes a string for use in a regular expression.
 *
 * @category  Escapers
 *
 * @source
 *
 * @example
 * ```ts
 * new RegExp( `^${ escRegExp( filePath ) }\\/.+`, 'g' );
 * ```
 *
 * @param str To convert.
 */
export function escRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
//# sourceMappingURL=escRegExp.js.map