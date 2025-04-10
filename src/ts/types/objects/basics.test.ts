/**
 * @since ___PKG_VERSION___
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
    RecursivePartial,
} from './basics.js';

class TestClass {
    public property: string = '';
}

type FullObj = {
    a: string;
    b: any[];
    c: number;

    child: {
        1: any[];
        2: boolean;
        3: {
            a: string;
            b: any[];
            c: number;
        };

        class: typeof TestClass;
    };
};

type PartialObj = Partial<FullObj>;

type RecursivePartialTestObj = {
    a?: string;
    b?: any[];
    c?: number;

    child?: {
        1?: any[];
        2?: boolean;
        3?: {
            a?: string;
            b?: any[];
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