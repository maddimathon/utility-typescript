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

import { toValidNumber } from './toValidNumber.js';

describe( 'toValidNumber', () => {

    const tests = [
        [ '08070870', 8070870 ],
        [ '84351.685431512', 84351.685431512 ],
        [ 1200.5400054, 1200.5400054 ],
        [ '00565132.51', 565132.51 ],
        [ '', 0 ],
        [ Number.NaN, null ],
        [ ' dflsakjh', null ],
    ] as const;

    for ( const [ input, output ] of tests ) {
        test( `test - ${ input }`, () => expect( toValidNumber( input ) ).toEqual( output ) );
    }
} );