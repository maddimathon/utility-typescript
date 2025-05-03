/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.2.0
 */
/*!
 * @maddimathon/utility-typescript@0.2.0
 * @license MIT
 */
/**
 * Uses `Array.filter()` to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array.
 *
 * @category Array Helpers
 *
 * @source
 *
 * @typeParam I  Array item type.
 *
 * @param arr  To simplify.
 * @return  Unique array.
 */
export function arrayUnique(arr) {
    // returns
    if (!Array.isArray(arr)) {
        return arr;
    }
    return [...arr].filter((v, i, a) => a.indexOf(v) === i);
}
//# sourceMappingURL=arrayUnique.js.map