/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../../types/index.js';
import { describe, expect, test } from '@jest/globals';
import { objectKeySortAsync } from './objectKeySortAsync.js';

const test_simpleObj = {

    in: {
        'one': '1',
        'two': '2',
        'three': '3',
        326832: 'number key',
        'alphabetical': true,
    },

    out: {
        326832: 'number key',
        'alphabetical': true,
        'one': '1',
        'three': '3',
        'two': '2',
    },
};

const test_nestedObj = {

    in: {
        'one': '1',
        'two': '2',
        'three': '3',
        326832: 'number key',

        'alphabetical': {
            48: 'one',
            0: 'two',
            81: 'three',
        },
    },

    out: {
        326832: 'number key',
        'alphabetical': {
            48: 'one',
            0: 'two',
            81: 'three',
        },
        'one': '1',
        'three': '3',
        'two': '2',
    },

    outRecursive: {
        326832: 'number key',
        'alphabetical': {
            0: 'two',
            48: 'one',
            81: 'three',
        },
        'one': '1',
        'three': '3',
        'two': '2',
    },
};

const [
    test_simpleObj_result_default,
    test_simpleObj_result_recursiveFalse,
    test_simpleObj_result_recursiveTrue,

    test_nestedObj_result_default,
    test_nestedObj_result_recursiveFalse,
    test_nestedObj_result_recursiveTrue,
] = await Promise.all( [
    objectKeySortAsync( test_simpleObj.in ),
    objectKeySortAsync( test_simpleObj.in, false ),
    objectKeySortAsync( test_simpleObj.in, true ),

    objectKeySortAsync( test_nestedObj.in ),
    objectKeySortAsync( test_nestedObj.in, false ),
    objectKeySortAsync( test_nestedObj.in, true ),
] );

describe( 'objectKeySortAsync', () => {

    test( 'simple obj', () => {
        expect( test_simpleObj_result_default ).toStrictEqual( test_simpleObj.out );
        expect( test_simpleObj_result_recursiveFalse ).toStrictEqual( test_simpleObj.out );
        expect( test_simpleObj_result_recursiveTrue ).toStrictEqual( test_simpleObj.out );
    } );

    test( 'nested obj - non recursive', () => {
        expect( test_nestedObj_result_default ).toStrictEqual( test_nestedObj.out );
        expect( test_nestedObj_result_recursiveFalse ).toStrictEqual( test_nestedObj.out );
    } );

    test( 'nested obj - recursive', () => {
        expect( test_nestedObj_result_recursiveTrue ).toStrictEqual( test_nestedObj.outRecursive );
    } );
} );