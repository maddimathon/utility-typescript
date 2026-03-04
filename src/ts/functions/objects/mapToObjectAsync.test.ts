/**
 * @since 2.0.0-beta.2.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { mapToObjectAsync } from './mapToObjectAsync.js';

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

const [
    simpleMap_Converted,
    nestedMap_Converted,
] = await Promise.all( [
    mapToObjectAsync( simpleMap.map ),
    mapToObjectAsync( nestedMap.map ),
] );

describe( 'mapToObjectAsync()', () => {
    test( 'simple map', () => expect( simpleMap_Converted ).toEqual( simpleMap.obj ) );
    test( 'nested map', () => expect( nestedMap_Converted ).toEqual( nestedMap.obj ) );
} );
