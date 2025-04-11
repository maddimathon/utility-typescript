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

import type { Test } from '../../types/index.js';
import { expect, test } from '@jest/globals';

import { arrayUnique } from './arrayUnique.js';


test( 'arrayUnique()', () => {

    const arrNotUnique = [
        'one',
        'one',
        'two',
        'two',
        'two',
        'three',
        'four',
        'four',
    ];

    const arrUnique = [
        'one',
        'two',
        'three',
        'four',
    ];

    const result = arrayUnique( arrNotUnique );

    // arrUnique.sort();
    // result.sort();

    // console.log( 'arrUnique = ', arrUnique );
    // console.log( 'result = ', result );

    type tests = [
        Test.Expect<Test.Exactly<typeof result, typeof arrUnique>>,
    ];

    result.forEach( ( item, index ) => {
        expect( item ).toBe( arrUnique[ index ] );
        expect( result[ index ] ).toBe( arrUnique[ index ] );
        expect( result[ index ] ).toBe( item );
    } );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );