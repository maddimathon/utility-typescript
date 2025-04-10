/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @since tmpl-0.1.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { expect, test } from '@jest/globals';

import { exampleFunction } from './exampleFunction.js';


test( 'exampleFunction()', () => {
    expect( exampleFunction() ).toBe( 'hello' );
} );
