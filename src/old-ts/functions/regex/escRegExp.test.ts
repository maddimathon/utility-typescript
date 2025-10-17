/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../../types/index.js';
import { expect, test } from '@jest/globals';

import { escRegExp } from './escRegExp.js';

test( 'escRegExp()', () => {
    expect( new RegExp( escRegExp( '.*+?^${}()|[]\\/' ), 'g' ).toString() ).toBe( /\.\*\+\?\^\$\{\}\(\)\|\[\]\\\//g.toString() );
    expect( new RegExp( escRegExp( 'example/file/path?' ), 'g' ).toString() ).toBe( /example\/file\/path\?/g.toString() );
    expect( 'contains/example/file/path? - and more' ).toMatch( new RegExp( escRegExp( 'example/file/path?' ), 'g' ) );
} );