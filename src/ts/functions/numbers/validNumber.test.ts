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

import { validNumber } from './validNumber.js';

describe( 'validNumber', () => {

    const tests = [
        [ Number( '08070870' ), 8070870 ],
        [ Number( '84351.685431512' ), 84351.685431512 ],
        [ 1200.5400054, 1200.5400054 ],
        [ Number( '00565132.51' ), 565132.51 ],
        [ Number( '' ), 0 ],
        [ Number.NaN, null ],
        [ Number( ' dflsakjh' ), null ],
    ] as const;

    for ( const [ input, output ] of tests ) {
        test( `test - ${ input }`, () => expect( validNumber( input ) ).toEqual( output ) );
    }
} );