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
 * Takes a number and returns a fallback value if that number is NaN.
 *
 * This is mostly a development utility for prettier code rather than for
 * effective performance.
 *
 * @since 2.0.0-beta.6
 *
 * @source
 */
export function validNumber(numberOrNan, fallback = null) {
    return Number.isNaN(numberOrNan) ? fallback : numberOrNan;
}
