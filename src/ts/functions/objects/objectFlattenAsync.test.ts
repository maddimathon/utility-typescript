/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { objectFlattenAsync } from './objectFlattenAsync.js';

const obj1 = {

    og: {
        one: 1,
        two: [ 2, 2, 'hello' ],

        three: {
            $: 'home-key',
            aaa: 'boo',
            bbb: [],
            ccc: {
                last: 'one',
                just: [ 'kidding', '...' ],
            },
        },
    },

    dash: {
        one: 1,
        two: [ 2, 2, 'hello' ],

        'three': 'home-key',
        'three-aaa': 'boo',
        'three-bbb': [],

        'three-ccc-last': 'one',
        'three-ccc-just': [ 'kidding', '...' ],
    },

    under: {
        one: 1,
        two: [ 2, 2, 'hello' ],

        'three': 'home-key',
        'three_aaa': 'boo',
        'three_bbb': [],

        'three_ccc_last': 'one',
        'three_ccc_just': [ 'kidding', '...' ],
    },

    ixed: {
        'prefix-one-suffix': 1,
        'prefix-two-suffix': [ 2, 2, 'hello' ],

        'prefix-three-suffix': 'home-key',
        'prefix-three-aaa-suffix': 'boo',
        'prefix-three-bbb-suffix': [],

        'prefix-three-ccc-last-suffix': 'one',
        'prefix-three-ccc-just-suffix': [ 'kidding', '...' ],
    },
};

const [
    obj1_default,
    obj1_under,
    obj1_dash,
    obj1_fixed,
] = await Promise.all( [
    objectFlattenAsync( obj1.og ),
    objectFlattenAsync( obj1.og, { separator: '_' } ),
    objectFlattenAsync( obj1.og, { separator: '-' } ),
    objectFlattenAsync( obj1.og, {
        prefix: 'prefix',
        suffix: 'suffix',
    } ),
] );

describe( 'objectFlattenAsync()', () => {

    test( 'default', () => {
        expect( obj1_default ).toEqual( obj1.dash );
    } );

    test( 'separators', () => {
        expect( obj1_under ).toEqual( obj1.under );
        expect( obj1_dash ).toEqual( obj1.dash );
    } );

    test( 'pre/suffixed', () => {
        expect( obj1_fixed ).toEqual( obj1.ixed );
    } );
} );
