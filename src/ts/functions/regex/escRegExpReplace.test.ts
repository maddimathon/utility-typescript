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

// import type { Test } from '../../types/index.js';
import { expect, test } from '@jest/globals';

import { escRegExpReplace } from './escRegExpReplace.js';

test( 'escRegExpReplace()', () => {
    expect( '(hello)'.replace( /hello/g, escRegExpReplace( 'goodbye' ) ) ).toBe( `(goodbye)` );
    expect( 'cash money'.replace( /(dollars?|money)/gi, escRegExpReplace( '$$$' ) ) ).toBe( 'cash $$$' );
} );