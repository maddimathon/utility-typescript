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
    AnyClass,
} from './anyClass.js';

class _TestClass_NoParams {
    constructor () { }
};

class _TestClass_Params {

    constructor (
        protected prop1: string,
    ) { }
};

const _varClass = class { };

const _notAClass = () => { a: 'am I a class?'; };

export type T_AnyClass = [
    Test.Expect<Test.Satisfies<typeof _TestClass_Params, AnyClass>>,
    Test.Expect<Test.Satisfies<typeof _TestClass_NoParams, AnyClass>>,
    Test.Expect<Test.Satisfies<typeof _varClass, AnyClass>>,

    Test.ExpectNot<Test.Satisfies<typeof _notAClass, AnyClass>>,
];