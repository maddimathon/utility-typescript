/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    RecursivePartial,
} from './partial.js';

import type {
    RecursiveRequired,
    RecursiveRequiredPartially,
    RequiredPartially,
} from './required.js';


class _TestClass {
    public property: string = '';
}

type _FullObj = {
    a: string;
    b: ( number | string )[];
    c: number;

    child: {
        1: ( number | string )[];
        2: boolean;
        3: {
            a: string;
            b: ( number | string )[];
            c: number;
        };

        class: typeof _TestClass;
    };
};

type _RequiredPartiallyKeys = "a" | "child";

type _RecursiveRequiredPartiallyObj = {
    a: string;
    b?: ( number | string )[];
    c?: number;

    child: {
        1: ( number | string )[];
        2: boolean;
        3: {
            a: string;
            b: ( number | string )[];
            c: number;
        };

        class: typeof _TestClass;
    };
};

type _RequiredPartiallyObj = {
    a: string;
    b?: ( number | string )[];
    c?: number;

    child: {
        1?: ( number | string )[];
        2?: boolean;
        3?: {
            a?: string;
            b?: ( number | string )[];
            c?: number;
        };

        class?: typeof _TestClass;
    };
};

type _RecursivePartialObj = {
    a?: string;
    b?: ( number | string )[];
    c?: number;

    child?: {
        1?: ( number | string )[];
        2?: boolean;
        3?: {
            a?: string;
            b?: ( number | string )[];
            c?: number;
        };

        class?: typeof _TestClass;
    };
};


export type T_RecursiveRequired = [

    Test.Expect<Test.Exactly<RecursiveRequired<_RecursivePartialObj>, _FullObj>>,
    Test.Expect<Test.Satisfies<RecursiveRequired<_RecursivePartialObj>, _FullObj>>,

    Test.ExpectNot<Test.Exactly<RecursiveRequired<_RecursivePartialObj>, Required<_RecursivePartialObj>>>,
];


export type T_RequiredPartially = [

    // Test.Expect<Test.Exactly<PartialExcept<_FullObj, _RequiredPartiallyKeys>, _PartialExceptObj>>,

    // Test.ExpectNot<Test.Exactly<PartialExcept<_FullObj, _RequiredPartiallyKeys>, Partial<_FullObj>>>,

    Test.Expect<Test.Exactly<RequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, _RequiredPartiallyObj>>,

    Test.ExpectNot<Test.Exactly<RequiredPartially<_FullObj, _RequiredPartiallyKeys>, Partial<_FullObj>>>,
];


export type T_RecursiveRequiredPartially = [

    Test.Expect<Test.Exactly<RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, _RecursiveRequiredPartiallyObj>>,

    Test.Expect<Test.Exactly<RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, _RecursiveRequiredPartiallyObj>>,

    Test.Expect<Test.Satisfies<_RecursiveRequiredPartiallyObj, RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>>>,
    Test.Expect<Test.Satisfies<RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, _RequiredPartiallyObj>>,

    Test.ExpectNot<Test.Exactly<RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, _RequiredPartiallyObj>>,
    Test.ExpectNot<Test.Exactly<RecursiveRequiredPartially<_RecursivePartialObj, _RequiredPartiallyKeys>, RecursivePartial<_RecursivePartialObj>>>,
];