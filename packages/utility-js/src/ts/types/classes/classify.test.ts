/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../test.js';

import type {
    Classify,
} from './classify.js';

type _PartialObj = {
    one: string;
    two?: string;
    three?: string;
};

type _ClassifiedObj = {
    one: string;
    two: undefined | string;
    three: undefined | string;
};

type _MisClassifiedObj = {
    one: string;
    two: string;
    three: string;
};

export type T_Classify = [

    Test.Expect<Test.Exactly<Classify<_PartialObj>, _ClassifiedObj>>,

    Test.ExpectNot<Test.Exactly<Classify<_PartialObj>, _PartialObj>>,
    Test.ExpectNot<Test.Exactly<Classify<_PartialObj>, _MisClassifiedObj>>,
];