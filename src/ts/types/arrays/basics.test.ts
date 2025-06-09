/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    ArrayItem,
} from './basics.js';


export type T_ArrayItem = [

    Test.Expect<Test.Exactly<ArrayItem<( "hello" | "there" | number )[]>, "hello" | "there" | number>>,
    Test.Expect<Test.Exactly<ArrayItem<any[]>, any>>,

    Test.Expect<Test.Satisfies<ArrayItem<( "hello" | "there" | number )[]>, string | number>>,

    Test.ExpectNot<Test.Exactly<ArrayItem<never[]>, any>>,
    Test.ExpectNot<Test.Exactly<ArrayItem<any[]>, never>>,
    Test.ExpectNot<Test.Exactly<ArrayItem<( "hello" | "there" | number )[]>, any>>,
    Test.ExpectNot<Test.Exactly<ArrayItem<( "hello" | "there" | number )[]>, "hello" | "there">>,
    Test.ExpectNot<Test.Exactly<ArrayItem<( "hello" | "there" | number )[]>, number>>,
    Test.ExpectNot<Test.Exactly<ArrayItem<( "hello" | "there" )[]>, number>>,
];