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

import { mapFlattenAsync } from './mapFlattenAsync.js';

const obj1 = {

    og: new Map<string, number | string | ( number | string )[] | Map<string, string | string[] | Map<string, string | string[]>>>( [
        [ 'one', 1 ],
        [ 'two', [ 2, 2, 'hello' ] ],

        [
            'three',
            new Map<string, string | string[] | Map<string, string | string[]>>( [
                [ '$', 'home-key' ],
                [ 'aaa', 'boo' ],
                [ 'bbb', [] ],
                [
                    'ccc',
                    new Map<string, string | string[]>( [
                        [ 'last', 'one' ],
                        [ 'just', [ 'kidding', '...' ] ],
                    ] ),
                ],
            ] ),
        ],
    ] ),

    dash: new Map<string, number | string | ( number | string )[]>( [
        [ 'one', 1 ],
        [ 'two', [ 2, 2, 'hello' ] ],

        [ 'three', 'home-key' ],
        [ 'three-aaa', 'boo' ],
        [ 'three-bbb', [] ],

        [ 'three-ccc-last', 'one' ],
        [ 'three-ccc-just', [ 'kidding', '...' ] ],
    ] ),

    under: new Map<string, number | string | ( number | string )[]>( [
        [ 'one', 1 ],
        [ 'two', [ 2, 2, 'hello' ] ],

        [ 'three', 'home-key' ],
        [ 'three_aaa', 'boo' ],
        [ 'three_bbb', [] ],

        [ 'three_ccc_last', 'one' ],
        [ 'three_ccc_just', [ 'kidding', '...' ] ],
    ] ),

    ixed: new Map<string, number | string | ( number | string )[]>( [
        [ 'prefix-one-suffix', 1 ],
        [ 'prefix-two-suffix', [ 2, 2, 'hello' ] ],

        [ 'prefix-three-suffix', 'home-key' ],
        [ 'prefix-three-aaa-suffix', 'boo' ],
        [ 'prefix-three-bbb-suffix', [] ],

        [ 'prefix-three-ccc-last-suffix', 'one' ],
        [ 'prefix-three-ccc-just-suffix', [ 'kidding', '...' ] ],
    ] ),
};

const [
    obj1_default,
    obj1_under,
    obj1_dash,
    obj1_fixed,
] = await Promise.all( [
    mapFlattenAsync( obj1.og ),
    mapFlattenAsync( obj1.og, { separator: '_' } ),
    mapFlattenAsync( obj1.og, { separator: '-' } ),
    mapFlattenAsync( obj1.og, {
        prefix: 'prefix',
        suffix: 'suffix',
    } ),
] );

describe( 'mapFlattenAsync()', () => {

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
