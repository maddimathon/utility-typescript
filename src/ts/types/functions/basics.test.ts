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
    AnyClass,
} from './basics.js';

class TestClass { }
const varClass = class { };
const notAClass = () => { a: 'am I a class?'; };

export type T_AnyClass = [
    Test.Expect<Test.Satisfies<typeof TestClass, AnyClass>>,
    Test.Expect<Test.Satisfies<typeof varClass, AnyClass>>,

    Test.ExpectNot<Test.Satisfies<typeof notAClass, AnyClass>>,
];