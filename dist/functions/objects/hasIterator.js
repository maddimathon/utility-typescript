/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
/**
 * Tests if the given object has an iterator function.
 *
 * @since 2.0.0-beta.2
 */
export function hasIterator(obj) {
    // returns
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    // returns
    if (typeof obj[Symbol.iterator] === 'function') {
        const result = obj[Symbol.iterator]();
        // returns
        if (typeof result === 'object' && typeof result.next === 'function') {
            return true;
        }
        return false;
    }
    return false;
}
//# sourceMappingURL=hasIterator.js.map