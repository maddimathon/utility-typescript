/**
 * @since 2.0.0-beta.3.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
/**
 * Deletes the properties of the given object whose types are undefined.
 *
 * @since 2.0.0-beta.3.draft
 */
export function deleteUndefinedProps(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'undefined') {
            delete obj[key];
        }
    }
    return obj;
}
//# sourceMappingURL=deleteUndefinedProps.js.map