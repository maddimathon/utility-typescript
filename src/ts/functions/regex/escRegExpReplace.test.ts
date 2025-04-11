/**
 * @since ___PKG_VERSION___
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

    const str = '(hello)';
    const repl = '$$$ dollar-dollar bills';

    expect( str.replace( /hello/g, escRegExpReplace( repl ) ) ).toBe( `(${ repl })` );
} );