/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
/**
 * A utility to map the values of an object using a callback function.
 *
 * @param obj     The object to map.
 * @param mapper  The callback function used to define new values.
 *
 * @since 2.0.0-beta.2.draft
 */
export function objectMap(obj, callback) {
    // returns
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    const entries = Object.entries(obj);
    const mappedEntries = entries.map(([key, value]) => [
        key,
        callback([key, value]),
    ]);
    return Object.fromEntries(mappedEntries);
}
//# sourceMappingURL=objectMap.js.map