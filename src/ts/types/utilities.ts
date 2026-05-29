/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from './test.js';

/**
 * Dynamically declare a value as a promise or not.
 * 
 * @since ___PKG_VERSION___
 */
export type SyncOrAsync<T_Which extends 'async' | 'sync', T_Value> =
    Test.Exactly<T_Which, 'async'> extends true
    ? Promise<T_Value>
    : Test.Exactly<T_Which, 'sync'> extends true
    ? T_Value
    : Promise<T_Value> | T_Value;