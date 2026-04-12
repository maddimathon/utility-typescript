
import type { Test } from './index.js';

// #region Example
// #endregion Example

// #region FunctionToTest
declare function toTest( param: boolean ): boolean;
declare function toTest( param: string ): string;
declare function toTest( param: boolean | string ): boolean | string;
// #endregion FunctionToTest

// #region ReturnsToTest
const testResults = {
    bool: toTest( true ),
    string: toTest( 'string' ),
    either: toTest( 'unk' as boolean | string ),
};
// #endregion ReturnsToTest

// #region TypeTests
// (export does nothing but avoid errors since these files don't go to prod!)
export type T_toTest = [

    // testing the general return
    Test.Expect<Test.Exactly<ReturnType<typeof toTest>, boolean | string>>,

    // testing the override results
    Test.Expect<Test.Exactly<typeof testResults.bool, boolean>>,
    Test.Expect<Test.Exactly<typeof testResults.string, string>>,
    Test.Expect<Test.Exactly<typeof testResults.either, boolean | string>>,

    // testing what should fail is also useful
    Test.ExpectNot<Test.Exactly<typeof testResults.bool, string>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.bool, boolean | string>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.string, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.string, boolean | string>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.either, any>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.either, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof testResults.either, string>>,
];
// #endregion TypeTests
