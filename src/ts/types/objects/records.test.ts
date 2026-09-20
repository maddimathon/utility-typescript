/**
 * @since 2.0.0-beta.6
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type { ToEntry } from './records.js';


const toEntriesObj = {
    a: 'hello',
    b: [ 'one', 2 ] satisfies ( number | string )[] as ( number | string )[],
    c: 42,
};

type _ToEntries_Entries = [ 'a', string ] | [ 'b', ( number | string )[] ] | [ 'c', number ];
type _ToEntries_Entries_Partial = [ 'a', string | undefined ] | [ 'b', ( number | string )[] | undefined ] | [ 'c', number | undefined ];

type Test = ToEntry<Partial<typeof toEntriesObj>>;

export type T_ToEntries = [

    Test.Expect<Test.Exactly<ToEntry, [ string, unknown ] | [ number, unknown ] | [ symbol, unknown ]>>,
    Test.Expect<Test.Exactly<ToEntry<typeof toEntriesObj>, _ToEntries_Entries>>,
    Test.Expect<Test.Exactly<ToEntry<Partial<typeof toEntriesObj>>, _ToEntries_Entries_Partial>>,

    Test.ExpectNot<Test.Exactly<ToEntry, never>>,
    Test.ExpectNot<Test.Exactly<ToEntry<typeof toEntriesObj>, [ 'a' | 'b' | 'c', number | string | ( number | string )[] ]>>,
];