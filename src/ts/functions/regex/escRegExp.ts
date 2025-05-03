/**
 * @since 0.1.0
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
export function escRegExp( str: string ): string {
    return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
}