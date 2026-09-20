/**
 * @since 2.0.0-beta.6
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
/**
 * Takes and object and removes some of its keys, with better typing (if you use
 * it right). Do rely on this typing if your omitKeys is not a string literal or
 * array of string literals.
 *
 * Creates a COPY of the object via spread.
 *
 * @since 2.0.0-beta.6
 */
export function objectOmit(object, omitKeys) {
    const newObj = {
        ...object,
    };
    for (const key of omitKeys) {
        delete newObj[key];
    }
    return newObj;
}
