/**
 * @since ___PKG_VERSION___
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    Equivalent,
    Exactly,
    Expect,
    ExpectNot,
    IsArray,
    Satisfies,
} from './test.js';


// this is just here to prove a fail will break 
// things or force an error when I wanna
// export type T_Fail = [
//     Expect<Exactly<true, false>>,
// ];


class _TestClass {
    public num: number = 3;
    public str: string = 'anything';

    public toJson() {
        return {
            num: this.num,
            str: this.str,
        };
    }
}

interface _TestClassInterface {
    num: number;
    str: string;

    toJson(): {
        num: number;
        str: string;
    };
}

const _classFalseImplementation = {
    num: 4,
    str: 'hello',
};

const _classImplementation = new _TestClass();

const _fullObj = {
    a: '',
    b: [ '', 2 ],
    c: 2,
};

const _fullObj_wrong = {
    a: '',
    b: [ '' ],
    c: 2,
};

type _FullObj = {
    a: string;
    b: ( number | string )[];
    c: number;
};

type _PartialObj = {
    a: string;
    b?: ( number | string )[];
    c?: number;
};


export const T_Equivalent: [

    // tests below are expected to PASS
    Equivalent<_FullObj, typeof _fullObj>,
    Equivalent<_FullObj, _FullObj>,
    Equivalent<_FullObj, Required<_PartialObj>>,
    Equivalent<"test", "test">,
    Equivalent<_TestClass, _TestClassInterface>,
    Equivalent<_TestClass, typeof _classImplementation>,
    Equivalent<true, true>,
    Equivalent<true | false, boolean>,

    // tests below are expected to FAIL
    Equivalent<_FullObj, never>,
    Equivalent<_FullObj, _PartialObj>,
    Equivalent<_FullObj, typeof _fullObj_wrong>,
    Equivalent<string, "test">,
    Equivalent<string, boolean>,
    Equivalent<_TestClass, typeof _classFalseImplementation>,
    Equivalent<_TestClassInterface, typeof _classFalseImplementation>,

] = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,

        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];


export const T_Exactly: [

    // tests below are expected to PASS
    Exactly<_FullObj, typeof _fullObj>,
    Exactly<_FullObj, _FullObj>,
    Exactly<_FullObj, Required<_PartialObj>>,
    Exactly<"test", "test">,
    Exactly<_TestClass, _TestClassInterface>,
    Exactly<_TestClass, typeof _classImplementation>,
    Exactly<true, true>,
    Exactly<true | false, boolean>,

    // tests below are expected to FAIL
    Exactly<_FullObj, never>,
    Exactly<_FullObj, _PartialObj>,
    Exactly<_FullObj, typeof _fullObj_wrong>,
    Exactly<string, "test">,
    Exactly<string, boolean>,
    Exactly<_TestClass, typeof _classFalseImplementation>,
    Exactly<_TestClassInterface, typeof _classFalseImplementation>,

] = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,

        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];


export const T_Expect: [

    // tests below are expected to PASS
    Expect<true>,

    // tests below are expected to FAIL
    // @ts-expect-error
    Expect<[]>,
    // @ts-expect-error
    Expect<{}>,
    // @ts-expect-error
    Expect<boolean>,
    // @ts-expect-error
    Expect<false>,
    // @ts-expect-error
    Expect<string>,

] = [
        true,

        false,
        false,
        false,
        false,
        false,
    ];


export const T_ExpectNot: [

    // tests below are expected to PASS
    ExpectNot<false>,

    // tests below are expected to FAIL
    // @ts-expect-error
    ExpectNot<[]>,
    // @ts-expect-error
    ExpectNot<{}>,
    // @ts-expect-error
    ExpectNot<boolean>,
    // @ts-expect-error
    ExpectNot<string>,
    // @ts-expect-error
    ExpectNot<true>,

] = [
        true,

        false,
        false,
        false,
        false,
        false,
    ];


const _array = [ 'hello' ];

export const T_IsArray: [

    // tests below are expected to PASS
    IsArray<[ string ]>,
    IsArray<[]>,
    IsArray<Array<any>>,
    IsArray<Array<never>>,
    IsArray<never[]>,
    IsArray<typeof _array>,

    // tests below are expected to FAIL
    IsArray<{}>,
    IsArray<boolean>,
    IsArray<null>,
    IsArray<number>,
    IsArray<string>,
    IsArray<undefined>,

] = [
        true,
        true,
        true,
        true,
        true,
        true,

        false,
        false,
        false,
        false,
        false,
        false,
    ];


export const T_Satisfies: [

    // tests below are expected to PASS
    Satisfies<"hello", string>,
    Satisfies<_FullObj, Partial<_FullObj>>,
    Satisfies<_FullObj, _PartialObj>,
    Satisfies<_FullObj, object>,
    Satisfies<Object, object>,
    Satisfies<_PartialObj, _PartialObj>,
    Satisfies<true, boolean>,

    // tests below are expected to FAIL
    Satisfies<boolean, true>,
    Satisfies<Partial<_FullObj>, _FullObj>,
    Satisfies<_PartialObj, _FullObj>,
    Satisfies<string, "hello">,

] = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,

        false,
        false,
        false,
        false,
    ];