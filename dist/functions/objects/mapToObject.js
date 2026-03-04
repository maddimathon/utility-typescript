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
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 *
 * @since 2.0.0-beta.2
 */
export function mapToObject(map) {
    const entries = Array.from(map.entries()).map(([key, value]) => {
        // returns
        if (!(value instanceof Map)) {
            return [key, value];
        }
        return [
            key,
            mapToObject(value),
        ];
    });
    return Object.fromEntries(entries);
}
//# sourceMappingURL=mapToObject.js.map