/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
import { objectKeySort } from '../objects/objectKeySort.js';
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
 * @since 2.0.0-beta.3 — Added optional args param.
 */
export function arrayUnique(arr, args = {}) {
    // returns
    if (!Array.isArray(arr)) {
        return arr;
    }
    const { compareViaJson = false, } = args;
    // returns
    if (!compareViaJson) {
        return [...arr].filter((v, i, a) => a.indexOf(v) === i);
    }
    const stringify = (value) => JSON.stringify(typeof value === 'object'
        ? Array.isArray(value)
            ? value.sort()
            : objectKeySort(JSON.parse(JSON.stringify(value)))
        : value);
    const jsonArr = [...arr].map(stringify);
    return [...arr].filter((v, i) => jsonArr.indexOf(stringify(v)) === i);
}
