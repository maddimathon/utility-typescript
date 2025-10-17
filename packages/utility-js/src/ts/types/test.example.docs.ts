
import type { Test } from './test.js';

// #region Example
// #endregion Example

// #region FunctionToTest
declare function toTest( param: boolean ): boolean;
declare function toTest( param: string ): string;
declare function toTest( param: boolean | string ): boolean | string;
// #endregion FunctionToTest

// #region ReturnsToTest
const _tests_toTest = {
    bool: toTest( true ),
    string: toTest( 'string' ),
    either: toTest( 'dummy value to cast' as boolean | string ),
};
// #endregion ReturnsToTest

// #region TypeTests
// (export does nothing but avoid errors since test files don't go to prod!)
export type Test_toTest = [

    // testing the general return
    Test.Expect<Test.Exactly<ReturnType<typeof toTest>, boolean | string>>,

    // testing the override results
    Test.Expect<Test.Exactly<typeof _tests_toTest.bool, boolean>>,
    Test.Expect<Test.Exactly<typeof _tests_toTest.string, string>>,
    Test.Expect<Test.Exactly<typeof _tests_toTest.either, boolean | string>>,

    // testing what should fail is also useful
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.bool, string>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.string, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, any>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, string>>,
];
// #endregion TypeTests
