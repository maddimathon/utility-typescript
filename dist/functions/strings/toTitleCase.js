/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
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
export function toTitleCase(input) {
    return input.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
}
//# sourceMappingURL=toTitleCase.js.map