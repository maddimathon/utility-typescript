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
 * @experimental
 */
export function arrayCopy(arr) {
    return [...arr].map(item => Array.isArray(item) ? arrayCopy(item) : item);
}
