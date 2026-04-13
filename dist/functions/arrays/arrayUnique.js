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
 * Uses {@link Array.filter} to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array.
 *
 * @category Functions – Array
 *
 * @source
 *
 * @typeParam T_ArrayItem  Array item type.
 *
 * @param arr  To simplify.
 *
 * @return  Unique array.
 *
 * @since 0.1.0
 */
export function arrayUnique(arr) {
    // returns
    if (!Array.isArray(arr)) {
        return arr;
    }
    return [...arr].filter((v, i, a) => a.indexOf(v) === i);
}
