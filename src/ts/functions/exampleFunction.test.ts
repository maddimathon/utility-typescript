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
import { expect, test } from '@jest/globals';

import { exampleFunction } from './exampleFunction.js';


test( 'exampleFunction()', () => {

    const result = exampleFunction();

    type tests = [
        Test.Expect<Test.Equivalent<typeof result, 'hello'>>,
    ];

    expect( result ).toBe( 'hello' );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );
