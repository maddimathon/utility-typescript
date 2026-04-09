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

import { mapToObject } from './mapToObject.js';

const simpleMap = {

    map: new Map<
        'one' | 'two' | 'three',
        number | string | boolean | ( number | string )[]
    >( [
        [ 'one', 1 ],
        [ 'two', [ 2, 2, 'hello' ] ],
        [ 'three', false ],
    ] ),

    obj: {
        one: 1,
        two: [ 2, 2, 'hello' ],
        three: false,
    },
};

const nestedMap = {

    map: new Map<
        string,
        number | string | boolean | ( number | string )[]
        | Map<
            string,
            number | string | boolean | null | ( number | string )[] | Map<string, number | string | boolean | null | ( number | string )[]>
        >
    >( [
        [ 'one', 1 ],
        [ 'two', [ 2, 2, 'hello' ] ],

        [ 'three', new Map<
            string,
            number | string | boolean | null | ( number | string )[] | Map<string, number | string | boolean | null | ( number | string )[]>
        >( [
            [ 'aaa', 'boo', ],
            [ 'bbb', null, ],

            [ 'ccc', new Map<string, number | string | boolean | null | ( number | string )[]>( [
                [ 'last', 'one' ],
                [ 'just', [ 'kidding', '...' ] ],
            ] ), ],
        ] ) ],
    ] ),

    obj: {
        one: 1,
        two: [ 2, 2, 'hello' ],

        three: {
            aaa: 'boo',
            bbb: null,
            ccc: {
                last: 'one',
                just: [ 'kidding', '...' ],
            },
        },
    },
};

describe( 'mapToObject()', () => {
    test( 'simple map', () => expect( mapToObject( simpleMap.map ) ).toEqual( simpleMap.obj ) );
    test( 'nested map', () => expect( mapToObject( nestedMap.map ) ).toEqual( nestedMap.obj ) );
} );

