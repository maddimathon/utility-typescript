/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from './test.js';

import type {
    ArrayItem,
    TuplePop,
    TupleShift,
} from './arrays.js';


export type Test_ArrayItem = [

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

export type Test_Tuples = [

    Test.Expect<Test.Exactly<TuplePop<[ 'one', 2, 'three' ]>, [ 'one', 2 ]>>,
    Test.ExpectNot<Test.Satisfies<TuplePop<[ 'one', 2, 'three' ]>, [ 'one', 2, 'three' ]>>,
    Test.ExpectNot<Test.Exactly<TuplePop<[ 'one', 2, 'three' ]>, ( 'one' | 2 | 'three' )[]>>,
    Test.ExpectNot<Test.Exactly<TuplePop<[ 'one', 2, 'three' ]>, ( number | string )[]>>,

    Test.Expect<Test.Exactly<TuplePop<[]>, []>>,
    Test.Expect<Test.Exactly<TuplePop<[ 'one' ]>, []>>,

    Test.Expect<Test.Exactly<TupleShift<[ 'one', 2, 'three' ]>, [ 2, 'three' ]>>,
    Test.ExpectNot<Test.Satisfies<TupleShift<[ 'one', 2, 'three' ]>, [ 'one', 2, 'three' ]>>,
    Test.ExpectNot<Test.Exactly<TupleShift<[ 'one', 2, 'three' ]>, ( 'one' | 2 | 'three' )[]>>,
    Test.ExpectNot<Test.Exactly<TupleShift<[ 'one', 2, 'three' ]>, ( number | string )[]>>,

    Test.Expect<Test.Exactly<TupleShift<[]>, []>>,
    Test.Expect<Test.Exactly<TupleShift<[ 'one' ]>, []>>,
];