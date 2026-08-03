/**
 * @since 2.0.0-beta.5.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
export declare function toValidNumber<T_Fallback extends null>(numberLike: any, fallback?: never): number | null;
export declare function toValidNumber<T_Fallback extends any>(numberLike: any, fallback: T_Fallback): number | T_Fallback;
