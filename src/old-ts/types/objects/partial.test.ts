/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    PartialExcept,
    RecursivePartial,
    RecursivePartialExcept,
} from './partial.js';


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

type _PartialExceptKeys = "a" | "b";

type _PartialExceptObj = {
    a: string;
    b: ( number | string )[];
    c?: number;

    child?: {
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

type _RecursivePartialExceptObj = {
    a: string;
    b: ( number | string )[];
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

const _emptyObj = {};


export type T_PartialExcept = [

    Test.Expect<Test.Exactly<PartialExcept<_FullObj, _PartialExceptKeys>, _PartialExceptObj>>,

    Test.ExpectNot<Test.Exactly<PartialExcept<_FullObj, _PartialExceptKeys>, Partial<_FullObj>>>,
];


export type T_RecursivePartialExcept = [

    Test.Expect<Test.Exactly<RecursivePartialExcept<_FullObj, _PartialExceptKeys>, _RecursivePartialExceptObj>>,

    Test.Expect<Test.Satisfies<_RecursivePartialExceptObj, RecursivePartialExcept<_FullObj, _PartialExceptKeys>>>,
    Test.Expect<Test.Satisfies<_PartialExceptObj, RecursivePartialExcept<_FullObj, _PartialExceptKeys>>>,

    Test.ExpectNot<Test.Exactly<RecursivePartialExcept<_FullObj, _PartialExceptKeys>, _PartialExceptObj>>,
    Test.ExpectNot<Test.Exactly<RecursivePartialExcept<_FullObj, _PartialExceptKeys>, RecursivePartial<_FullObj>>>,
];


export type T_RecursivePartial = [

    Test.Expect<Test.Exactly<_RecursivePartialObj, RecursivePartial<_FullObj>>>,
    Test.Expect<Test.Satisfies<typeof _emptyObj, _RecursivePartialObj>>,

    Test.ExpectNot<Test.Exactly<_FullObj, RecursivePartial<_FullObj>>>,
    Test.ExpectNot<Test.Exactly<Partial<_FullObj>, RecursivePartial<_FullObj>>>,
];