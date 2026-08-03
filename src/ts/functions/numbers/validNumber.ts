/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

export function validNumber<T_Fallback extends null>(
    numberOrNan: number,
    fallback?: never,
): number | null;

export function validNumber<T_Fallback extends any>(
    numberOrNan: number,
    fallback: T_Fallback,
): number | T_Fallback;

/**
 * Takes a number and returns a fallback value if that number is NaN.
 *
 * This is mostly a development utility for prettier code rather than for
 * effective performance.
 *
 * @since ___PKG_VERSION___
 * 
 * @source
 */
export function validNumber<T_Fallback extends any>(
    numberOrNan: number,
    fallback: null | T_Fallback = null,
): number | null | T_Fallback {
    return Number.isNaN( numberOrNan ) ? fallback : numberOrNan;
}