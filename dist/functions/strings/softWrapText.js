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
 * Takes an input string and inserts `\n` to soft wrap text within the given width.
 *
 * @category  Formatters
 *
 * @param text      Text to wrap.
 * @param maxWidth  Optional. Max number of characters per line.
 *
 * @return  Wrapped text.
 *
 * @since 0.1.0
 */
export function softWrapText(text, maxWidth = 80) {
    const splits = text.split(/\n/g).map((line) => {
        return line.replace(new RegExp(`(?![^\\n]{1,${maxWidth}}$)([^\\n]{1,${maxWidth}})\\s`, 'g'), '$1\n');
    });
    return splits.flat().join('\n');
}
//# sourceMappingURL=softWrapText.js.map