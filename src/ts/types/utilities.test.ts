/**
 * @since 2.0.0-beta.3
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from './test.js';

import type { SyncOrAsync } from './utilities.js';


type Type_1 = 'string literal';

export type T_SyncOrAsync = [
    Test.Expect<Test.Exactly<SyncOrAsync<'async', Type_1>, Promise<Type_1>>>,
    Test.Expect<Test.Exactly<SyncOrAsync<'sync', Type_1>, Type_1>>,
    Test.Expect<Test.Exactly<SyncOrAsync<'async' | 'sync', Type_1>, Type_1 | Promise<Type_1>>>,

    Test.ExpectNot<Test.Exactly<SyncOrAsync<'async', Type_1>, Type_1>>,
    Test.ExpectNot<Test.Exactly<SyncOrAsync<'async', Type_1>, Type_1 | Promise<Type_1>>>,

    Test.ExpectNot<Test.Exactly<SyncOrAsync<'sync', Type_1>, Promise<Type_1>>>,
    Test.ExpectNot<Test.Exactly<SyncOrAsync<'sync', Type_1>, Type_1 | Promise<Type_1>>>,

    Test.ExpectNot<Test.Exactly<SyncOrAsync<'async' | 'sync', Type_1>, Type_1>>,
    Test.ExpectNot<Test.Exactly<SyncOrAsync<'async' | 'sync', Type_1>, Promise<Type_1>>>,
];