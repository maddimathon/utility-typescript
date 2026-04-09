/**
 * @since 2.0.0-beta.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '@maddimathon/utility-typescript/types';
import { describe, expect, test } from '@jest/globals';

import { makeNumber } from './makeNumber.js';

describe( 'makeNumber', () => {

    test( 'test 1 - strings', () => {

        const tests = [
            [ '08070870', 8070870 ],
            [ '84351.685431512', 84351.685431512 ],
            [ '1   200.5400054', 1200.5400054 ],
            [ '005 65132.5-1', 565132.51 ],
            [ '', null ],
            [ ' ', null ],
            [ ' dflsakjh', null ],
        ] as const;

        for ( const [ input, output ] of tests ) {
            expect( makeNumber( input ) ).toEqual( output );
        }
    } );
} );