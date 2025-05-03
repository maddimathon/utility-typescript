/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { typeOf } from './typeOf.js';
// import { TypeDump } from 'src/ts/types/meta.js';

describe( 'typeOf()', () => {

    test( 'typeOf() - array', () => {
        const result = typeOf( [ 'hello' ] );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<string[]>, "array">>,
            Test.Expect<Test.Exactly<typeof result, "array">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<string[]>>>,
        ];

        expect( result ).toBe( 'array' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - bigint', () => {
        const result = typeOf( BigInt( '4581957948875984375984379' ) );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<BigInt>, "bigint">>,
            Test.Expect<Test.Exactly<typeof result, "bigint">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<BigInt>>>,
        ];

        expect( result ).toBe( 'bigint' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - boolean', () => {
        const result = typeOf( true );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<boolean>, "boolean">>,
            Test.Expect<Test.Exactly<typeof result, "boolean">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<boolean>>>,
        ];

        expect( result ).toBe( 'boolean' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - class', () => {
        class _TestClass { }

        const result = typeOf( _TestClass );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<typeof _TestClass>, "class">>,
            Test.Expect<Test.Exactly<typeof result, "class">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<typeof _TestClass>>>,
        ];

        expect( result ).toBe( 'class' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - function', () => {
        const result = typeOf( () => 'testing function' );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<( () => string )>, "function">>,
            Test.Expect<Test.Exactly<typeof result, "function">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<( () => string )>>>,
        ];

        expect( result ).toBe( 'function' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - null', () => {
        const result = typeOf( null );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<null>, "null">>,
            Test.Expect<Test.Exactly<typeof result, "null">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<null>>>,
        ];

        expect( result ).toBe( 'null' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - number', () => {
        const result = typeOf( 6548 );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<number>, "NaN" | "number">>,
            Test.Expect<Test.Exactly<typeof result, "NaN" | "number">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<number>>>,
        ];

        expect( result ).toBe( 'number' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - object', () => {
        const result = typeOf( { hello: 'there' } );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<{ hello: string; }>, "object">>,
            Test.Expect<Test.Exactly<typeof result, "object">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<{ hello: string; }>>>,
        ];

        expect( result ).toBe( 'object' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - string', () => {
        const result = typeOf( 'test string' );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<string>, "string">>,
            Test.Expect<Test.Exactly<typeof result, "string">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<string>>>,
        ];

        expect( result ).toBe( 'string' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - symbol', () => {
        const result = typeOf( Symbol( 'test symbol' ) );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<Symbol>, "symbol">>,
            Test.Expect<Test.Exactly<typeof result, "symbol">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<Symbol>>>,
        ];

        expect( result ).toBe( 'symbol' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - NaN', () => {
        const result = typeOf( Number.NaN );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<typeof Number.NaN>, "NaN" | "number">>,
            Test.Expect<Test.Exactly<typeof result, "NaN" | "number">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<typeof Number.NaN>>>,
        ];

        expect( result ).toBe( 'NaN' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'typeOf() - undefined', () => {
        const result = typeOf( undefined );

        type tests = [
            Test.Expect<Test.Exactly<typeOf.Return<undefined>, "undefined">>,
            Test.Expect<Test.Exactly<typeof result, "undefined">>,
            Test.Expect<Test.Exactly<typeof result, typeOf.Return<undefined>>>,
        ];

        expect( result ).toBe( 'undefined' );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );
} );