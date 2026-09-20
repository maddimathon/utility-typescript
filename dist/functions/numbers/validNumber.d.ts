/**
 * @since 2.0.0-beta.6
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
export declare function validNumber<T_Fallback extends null>(numberOrNan: number, fallback?: never): number | null;
export declare function validNumber<T_Fallback extends any>(numberOrNan: number, fallback: T_Fallback): number | T_Fallback;
