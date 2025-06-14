/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Converts the given string to title case.
 * 
 * @category  Formatters
 *
 * @param input  String to convert.
 *
 * @return  Title case version of the input string.
 * 
 * @source
 */
export function toTitleCase( input: string ): string {

    return input.replace(
        /\w\S*/g,
        ( s ) => s.charAt( 0 ).toUpperCase() + s.slice( 1 ).toLowerCase()
    );
}