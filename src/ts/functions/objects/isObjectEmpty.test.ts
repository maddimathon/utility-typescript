/**
 * @since 2.0.0-beta.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../../types/index.js';
import { expect, test } from '@jest/globals';

import { isObjectEmpty } from './isObjectEmpty.js';

describe( 'isObjectEmpty()', () => {

    type tests = [
        Test.Expect<Test.Exactly<ReturnType<typeof isObjectEmpty>, boolean>>,
    ];

    // booleans
    test( 'booleans', () => {
        expect( isObjectEmpty( false ) ).toEqual( false );
        expect( isObjectEmpty( true ) ).toEqual( false );
    } );

    // bigints
    test( 'bigints', () => expect( isObjectEmpty( BigInt( 546548943516 ) ) ).toEqual( false ) );

    // functions
    test( 'functions', () => expect( isObjectEmpty( 'function' ) ).toEqual( false ) );

    // numbers
    test( 'numbers', () => {
        expect( isObjectEmpty( 0 ) ).toEqual( false );
        expect( isObjectEmpty( 10 ) ).toEqual( false );
        expect( isObjectEmpty( 1358 ) ).toEqual( false );
    } );

    // strings
    test( 'strings', () => {
        expect( isObjectEmpty( '' ) ).toEqual( true );
        expect( isObjectEmpty( 'string' ) ).toEqual( false );
    } );

    // undefined
    test( 'undefined', () => expect( isObjectEmpty( undefined ) ).toEqual( true ) );

    // arrays
    test( 'arrays', () => {
        expect( isObjectEmpty( [] ) ).toEqual( true );
        expect( isObjectEmpty( [ 'array' ] ) ).toEqual( false );
    } );

    // objects
    test( 'objects', () => {
        expect( isObjectEmpty( {} ) ).toEqual( true );
        expect( isObjectEmpty( { one: 'one' } ) ).toEqual( false );
        expect( isObjectEmpty( new RegExp( 'ex' ) ) ).toEqual( false );
        expect( isObjectEmpty( new Object() ) ).toEqual( true );
    } );

    // maps
    test( 'maps', () => {
        expect( isObjectEmpty( new Map() ) ).toEqual( true );
        expect( isObjectEmpty( new Map( [
            [ 1, 'value' ],
            [ 2, 'value' ],
            [ 4, 'value' ],
            [ 5, 'value' ],
        ] ) ) ).toEqual( false );
    } );

    // sets
    test( 'sets', () => {
        expect( isObjectEmpty( new Set() ) ).toEqual( true );
        expect( isObjectEmpty( new Set( [ 1, 2, 4, 5 ] ) ) ).toEqual( false );
    } );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );