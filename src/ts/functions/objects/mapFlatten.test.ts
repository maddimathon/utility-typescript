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

import { mapFlatten } from './mapFlatten.js';

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

describe( 'mapFlatten()', () => {

    test( 'default', () => {
        expect( mapFlatten( obj1.og ) ).toEqual( obj1.dash );
    } );

    test( 'separators', () => {
        expect( mapFlatten( obj1.og, { separator: '_' } ) ).toEqual( obj1.under );
        expect( mapFlatten( obj1.og, { separator: '-' } ) ).toEqual( obj1.dash );
    } );

    test( 'pre/suffixed', () => {
        expect( mapFlatten( obj1.og, {
            prefix: 'prefix',
            suffix: 'suffix',
        } ) ).toEqual( obj1.ixed );
    } );
} );
