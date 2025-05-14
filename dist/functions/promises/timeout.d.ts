/**
 * @since 2.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
 * @license MIT
 */
export declare function timeout<T, R extends undefined>(promise: Promise<T>, ms: number, onTimeout?: R): Promise<T | R>;
export declare function timeout<T, R extends undefined>(promise: Promise<T>, ms: number, onTimeout: AbortController): Promise<T | R>;
export declare function timeout<T, R extends null | boolean | number | string | undefined>(promise: Promise<T>, ms: number, onTimeout: R | ((reject: ((r?: any) => void)) => R)): Promise<T | R>;
//# sourceMappingURL=timeout.d.ts.map