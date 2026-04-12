/**
 * @since 2.0.0-beta.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import { hasIterator } from '../arrays/hasIterator.js';
/**
 * Checks whether an object is empty (by checking for keys and constructor).
 *
 * Non-object types are evaluated in other ways depending on type.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.1
 */
export function isObjectEmpty(obj) {
    // returns if non-object
    switch (typeof obj) {
        case 'object':
            // returns - is empty
            if (obj === null) {
                return true;
            }
            // returns - checks length if array for
            if (Array.isArray(obj)) {
                return !obj.length;
            }
            if (hasIterator(obj)) {
                return !Array.from(obj).length;
            }
            break;
        // always false
        case 'boolean':
        case 'bigint':
        case 'function':
        case 'number':
        case 'symbol':
            return false;
        // always true
        case 'undefined':
            return true;
        // have to check
        case 'string':
            return !obj.length;
        // fallback checks for falsey-ness
        default:
            return !obj;
    }
    return obj.constructor === Object && Object.keys(obj).length === 0;
}
