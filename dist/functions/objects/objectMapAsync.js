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
 * Maps a single-level object's properties to new values based on a callback
 * function.
 *
 * @since 2.0.0-beta.2.draft
 */
export async function objectMapAsync(objPromise, callback) {
    return Promise.resolve(objPromise).then(async (obj) => {
        // returns
        if (typeof obj !== 'object' || !obj) {
            return obj;
        }
        const entries = Object.entries(obj);
        return Promise.all(entries.map(async ([key, value]) => [key, await callback([key, value])])).then(mappedEntries => Object.fromEntries(mappedEntries));
    });
}
//# sourceMappingURL=objectMapAsync.js.map