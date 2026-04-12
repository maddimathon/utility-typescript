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
import { hasIterator } from './hasIterator.js';

describe( 'hasIterator', () => {

    const arr = [ 'hello' ];
    const arr2 = [ 'hello' ] as string[] | number;

    let arr2b: string[] | number = [ 'hello' ] as string[] | number;

    const map = new Map<string, string>();
    const set = new Set<string>();

    const invalidCxIterable = {
        [ Symbol.iterator ]: () => 'hello'
    };

    const validCxIterable = {
        [ Symbol.iterator ]: () => ( {
            next: () => ( { done: true, value: undefined } )
        } satisfies Iterator<any> )
    };

    const arrayResult = hasIterator( arr ) ? arr : false;
    const mapResult = hasIterator( map ) ? map : false;
    const setResult = hasIterator( set ) ? set : false;

    const unknownResult = hasIterator( arr2 ) ? arr2 : false;

    if ( !unknownResult ) {
        arr2b = 798;
    }

    const unknownResult_b = hasIterator( arr2b ) ? arr2b : false;

    const invalidCxResult = hasIterator( invalidCxIterable ) ? invalidCxIterable : false;
    const validCxResult = hasIterator( validCxIterable ) ? validCxIterable : false;

    type tests = [
        Test.Expect<Test.Exactly<typeof arrayResult, typeof arr | false>>,
        Test.Expect<Test.Exactly<typeof invalidCxResult, false>>,
        Test.Expect<Test.Exactly<typeof mapResult, typeof map | false>>,
        Test.Expect<Test.Exactly<typeof setResult, typeof set | false>>,
        Test.Expect<Test.Exactly<typeof unknownResult, false | any[]>>,
        Test.Expect<Test.Exactly<typeof unknownResult_b, false | any[]>>,
        Test.Expect<Test.Exactly<typeof validCxResult, typeof validCxResult>>,
    ];

    test( 'array', () => expect( arrayResult ).toBe( arr ) );
    test( 'map', () => expect( mapResult ).toBe( map ) );
    test( 'set', () => expect( setResult ).toBe( set ) );

    test( 'custom iterator (invalid)', () => expect( invalidCxResult ).toBe( false ) );
    test( 'custom iterator (valid)', () => expect( validCxResult ).toBe( validCxIterable ) );

    // as tests[0] only so that type is used
    true as tests[ 0 ];
} );