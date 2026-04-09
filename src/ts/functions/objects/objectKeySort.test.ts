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
import { objectKeySort } from './objectKeySort.js';

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

describe( 'objectKeySort', () => {

    test( 'simple obj', () => {
        expect( objectKeySort( test_simpleObj.in ) ).toStrictEqual( test_simpleObj.out );
        expect( objectKeySort( test_simpleObj.in, false ) ).toStrictEqual( test_simpleObj.out );
        expect( objectKeySort( test_simpleObj.in, true ) ).toStrictEqual( test_simpleObj.out );
    } );

    test( 'nested obj - non recursive', () => {
        expect( objectKeySort( test_nestedObj.in ) ).toStrictEqual( test_nestedObj.out );
        expect( objectKeySort( test_nestedObj.in, false ) ).toStrictEqual( test_nestedObj.out );
    } );

    test( 'nested obj - recursive', () => {
        expect( objectKeySort( test_nestedObj.in, true ) ).toStrictEqual( test_nestedObj.outRecursive );
    } );
} );