/**
 * @since 0.1.0
 * 
 * @packageDocumentation
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

    type tests = [
        Test.Expect<Test.Exactly<typeof result, typeof arrUnique>>,
    ];

    expect( result ).toEqual( arrUnique );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );