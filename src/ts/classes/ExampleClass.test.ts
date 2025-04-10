/**
 * @since tmpl-0.1.1
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

import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { ExampleClass } from './ExampleClass.js';

describe( 'ExampleClass', () => {

    const exClass = new ExampleClass();

    test( 'ExampleClass.test()', () => {

        const result = exClass.test();

        type tests = [
            Test.Expect<Test.Equivalent<typeof result, 'hello'>>,
        ];

        expect( result ).toBe( 'hello' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );
} );
