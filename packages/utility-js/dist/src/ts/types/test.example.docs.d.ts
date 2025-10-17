import type { Test } from './test.js';
declare function toTest(param: boolean): boolean;
declare function toTest(param: string): string;
declare function toTest(param: boolean | string): boolean | string;
declare const _tests_toTest: {
    bool: boolean;
    string: string;
    either: string | boolean;
};
export type Test_toTest = [
    Test.Expect<Test.Exactly<ReturnType<typeof toTest>, boolean | string>>,
    Test.Expect<Test.Exactly<typeof _tests_toTest.bool, boolean>>,
    Test.Expect<Test.Exactly<typeof _tests_toTest.string, string>>,
    Test.Expect<Test.Exactly<typeof _tests_toTest.either, boolean | string>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.bool, string>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.string, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, any>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, boolean>>,
    Test.ExpectNot<Test.Exactly<typeof _tests_toTest.either, string>>
];
export {};
//# sourceMappingURL=test.example.docs.d.ts.map