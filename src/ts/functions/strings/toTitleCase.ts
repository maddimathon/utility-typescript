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
 * Converts the given string to title case.
 * 
 * @source
 *
 * @param input  String to convert.
 *
 * @return  Title case version of the input string.
 */
export function toTitleCase( input: string ): string {

    return input.replace(
        /\w\S*/g,
        ( s ) => s.charAt( 0 ).toUpperCase() + s.slice( 1 ).toLowerCase()
    );
}