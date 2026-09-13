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
 * @experimental
 */
export function arrayCopy(arr) {
    return [...arr].map(item => Array.isArray(item) ? arrayCopy(item) : item);
}
