/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    KeysOptional,
    KeysRequired,
} from './keys.js';


type _Keys_Optional = "three" | "four";
type _Keys_Required = "one" | "two";

type _Obj = {
    one: string;
    two: string;
    three?: string;
    four?: string;
};


export type T_KeysRequired = [

    Test.Expect<Test.Exactly<KeysRequired<_Obj>, _Keys_Required>>,

    Test.ExpectNot<Test.Exactly<KeysRequired<_Obj>, keyof _Obj>>,
    Test.ExpectNot<Test.Exactly<KeysRequired<_Obj>, _Keys_Optional>>,
];


export type T_KeysOptional = [

    Test.Expect<Test.Exactly<KeysOptional<_Obj>, _Keys_Optional>>,

    Test.ExpectNot<Test.Exactly<KeysOptional<_Obj>, keyof _Obj>>,
    Test.ExpectNot<Test.Exactly<KeysOptional<_Obj>, _Keys_Required>>,
];