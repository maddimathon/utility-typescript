/**
 * @since 2.0.0-beta.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { objectMapAsync } from './objectMapAsync.js';


//#region - Test 1
const test1_og = {
    'one': '1',
    'two': '2',
    'three': '3',
} as const;

const test1_generator = ( [ key, value ]: [
    keyof typeof test1_og,
    typeof test1_og[ keyof typeof test1_og ],
] ) => key && value && false;

const test1_expected = {
    'one': false,
    'two': false,
    'three': false,
};
//#endregion - Test 1


//#region - Test 2
const test2_og = {
    'one': '1',
    'two': '2',
    'three': '3',
} as const;

const test2_generator = ( [ key, value ]: [
    keyof typeof test2_og,
    typeof test2_og[ keyof typeof test2_og ],
] ) => {

    // returns
    if ( key == 'one' ) {
        return `${ value }--${ key }`;
    }

    return Number( value );
};

const test2_expected = {
    'one': '1--one',
    'two': 2,
    'three': 3,
};
//#endregion - Test 2

const [
    test1_result,
    test2_result,
] = await Promise.all( [
    objectMapAsync( test1_og, test1_generator ),
    objectMapAsync( test2_og, test2_generator ),
] );


export type Tests = [
    Test.Expect<Test.Exactly<typeof test1_expected, typeof test1_result>>,
    Test.Expect<Test.Exactly<{
        'one': number | string,
        'two': number | string,
        'three': number | string,
    }, typeof test2_result>>,
];

describe( 'objectMapAsync', () => {

    test( 'test 1 - simple obj', () => {
        expect( test1_result ).toEqual( test1_expected );
    } );

    test( 'test 2 - conditional obj', () => {
        expect( test2_result ).toEqual( test2_expected );
    } );
} );