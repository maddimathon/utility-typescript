/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5
 * @license MIT
 */
/**
 * Deletes the properties of the given object whose types are undefined.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.3
 */
export function deleteUndefinedProps(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'undefined') {
            delete obj[key];
        }
    }
    return obj;
}
