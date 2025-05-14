/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    MergeObjects,
    RecursivePartial,
    RecursiveRequired,
} from './basics.js';


export type T_MergeObjects = [

    Test.Expect<Test.Exactly<MergeObjects<{} & {}>, {}>>,

    Test.Expect<Test.Exactly<MergeObjects<{
        one: string;
        two: number;
        three: ( number | string )[];
        five: {
            test: "one";
        };
    } & {
        two?: number;
        three: string[];
        four: {};
        five: {
            test2: "two";
        };
    }>, {
        one: string;
        two: number;
        three: ( string | any )[];
        four: {};
        five: {
            test: "one";
            test2: "two";
        };
    }>>,
];


class TestClass {
    public property: string = '';
}

type FullObj = {
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

        class: typeof TestClass;
    };
};

type PartialObj = Partial<FullObj>;

type RecursivePartialTestObj = {
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

        class?: typeof TestClass;
    };
};

type RecursivePartialObj = RecursivePartial<FullObj>;

const emptyObj = {};

export type T_RecursivePartial = [
    Test.Expect<Test.Exactly<RecursivePartialTestObj, RecursivePartialObj>>,
    Test.Expect<Test.Satisfies<typeof emptyObj, RecursivePartialTestObj>>,

    // TODO - fix me
    // Test.ExpectNot<Test.Satisfies<typeof emptyObj, PartialObj>>,
    Test.ExpectNot<Test.Exactly<FullObj, RecursivePartial<FullObj>>>,
    Test.ExpectNot<Test.Exactly<PartialObj, RecursivePartial<FullObj>>>,
];

// type Test1 = RecursiveRequired<RecursivePartialTestObj>;
// type Test2 = FullObj;

export type T_RecursiveRequired = [
    Test.Expect<Test.Exactly<RecursiveRequired<RecursivePartialTestObj>, FullObj>>,
    Test.Expect<Test.Satisfies<RecursiveRequired<RecursivePartialTestObj>, FullObj>>,
];