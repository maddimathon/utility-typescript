/**
 * @since 2.0.0-beta.6
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
/**
 * Changes the indent of a file with structured space-based indents at the start
 * of lines (like css or json).
 *
 * @since 2.0.0-beta.6
 */
export function changeIndent(str, from, to) {
    return str.replace(new RegExp('^(' + ' '.repeat(from) + ')+', 'gm'), (substring) => {
        const replaceSpaces = Math.floor(substring.length / from);
        return ' '.repeat((substring.length - (replaceSpaces * from)) + (replaceSpaces * to));
    });
}
