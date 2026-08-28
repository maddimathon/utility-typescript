/**
 * @since 2.0.0-beta.5.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
/**
 * Takes and object and removes some of its keys, with better typing (if you use
 * it right). Do rely on this typing if your omitKeys is not a string literal or
 * array of string literals.
 *
 * Creates a COPY of the object via spread.
 *
 * @since 2.0.0-beta.5.draft
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
