/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '@maddimathon/utility-typescript/types';
import { describe, expect, test } from '@jest/globals';

import { makeNumberAsync } from './makeNumberAsync.js';

const tests = [
    [ '08070870', 8070870 ],
    [ '84351.685431512', 84351.685431512 ],
    [ '1   200.5400054', 1200.5400054 ],
    [ '005 65132.5-1', 565132.51 ],
    [ '', null ],
    [ ' ', null ],
    [ ' dflsakjh', null ],
] as const;

const results = await Promise.all( tests.map(
    ( [ input, output ] ) => makeNumberAsync( input ).then(
        result => [ result, output ] as const
    )
) );

describe( 'makeNumberAsync', () => {

    test( 'test 1 - strings', () => {

        for ( const [ actual, expected ] of results ) {
            expect( actual ).toEqual( expected );
        }
    } );
} );