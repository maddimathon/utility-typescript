/**
 * @since 2.0.0-beta.7
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0
 * @license MIT
 */
import { hasIterator } from './hasIterator.js';
/**
 * Flattens any iterator(s) recursively. Uses {@link hasIterator} to determine
 * if an item is an iterator.
 *
 * @since 2.0.0-beta.7
 */
export function iterableFlatten(iterator, { isIterable = hasIterator, } = {}) {
    const asFlatArray = Array.isArray(iterator)
        ? iterator.flat()
        : iterator;
    const flattened = [];
    for (const item of asFlatArray) {
        if (isIterable(item)) {
            flattened.push(...iterableFlatten(item));
        }
        else {
            flattened.push(item);
        }
    }
    return flattened;
}
