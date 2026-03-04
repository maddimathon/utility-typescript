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
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 *
 * @since 2.0.0-beta.2.draft
 */
export async function mapToObjectAsync(map) {
    return Promise.all(Array.from(map.entries()).map(async ([key, value]) => {
        // returns
        if (!(value instanceof Map)) {
            return [key, value];
        }
        return [key, await mapToObjectAsync(value)];
    })).then((arr) => Object.fromEntries(arr));
}
//# sourceMappingURL=mapToObjectAsync.js.map