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

    const defaultTest = {

        notUnique: [
            'one',
            'two',
            'three',
            'four',
            'two',
            'two',
            'one',
            'four',
        ],

        unique: [
            'one',
            'two',
            'three',
            'four',
        ],
    };

    const regex = new RegExp( '\s+', 'g' );

    const jsonTest = {

        notUnique: [
            { one: 1, two: '2', three: null },
            regex,
            { three: null, one: 1, two: '2' },
            regex
        ],

        unique: [
            { one: 1, two: '2', three: null },
            regex,
        ],
    };

    const result = arrayUnique( defaultTest.notUnique );
    const result_json = arrayUnique( jsonTest.notUnique, { compareViaJson: true } );

    type tests = [
        Test.Expect<Test.Exactly<typeof result, typeof defaultTest.unique>>,
        Test.Expect<Test.Exactly<typeof result_json, typeof jsonTest.unique>>,
    ];

    expect( result ).toEqual( defaultTest.unique );
    expect( result_json ).toEqual( jsonTest.unique );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );