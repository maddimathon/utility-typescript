/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3
 * @license MIT
 */
import type * as Test from './test.js';
/**
 * Dynamically declare a value as a promise or not.
 *
 * @since 2.0.0-beta.3
 */
export type SyncOrAsync<T_Which extends 'async' | 'sync', T_Value> = Test.Exactly<T_Which, 'async'> extends true ? Promise<T_Value> : Test.Exactly<T_Which, 'sync'> extends true ? T_Value : Promise<T_Value> | T_Value;
