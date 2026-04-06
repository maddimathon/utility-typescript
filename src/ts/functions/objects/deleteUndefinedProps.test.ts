/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../../types/index.js';

import { describe, expect, test } from '@jest/globals';
import { deleteUndefinedProps } from './deleteUndefinedProps.js';

const obj1 = {

    in: {
        one: 1,
        two: undefined,

        aaa: 'boo',
        bbb: [],
        ccc: {
            last: undefined,
            just: [ 'kidding', '...' ],
        },
    },

    out: {
        one: 1,

        aaa: 'boo',
        bbb: [],
        ccc: {
            last: undefined,
            just: [ 'kidding', '...' ],
        },
    },
};


type _OmitObj = { a: undefined; b: undefined | number; c: string; };
type _OmitObjOmitted = { b?: number; c: string; };

type Tests = [
    Test.Expect<Test.Exactly<deleteUndefinedProps.KeysToKeep<_OmitObj>, "c">>,
    Test.Expect<Test.Exactly<deleteUndefinedProps.KeysToPartialize<_OmitObj>, "b">>,
    Test.Expect<Test.Exactly<deleteUndefinedProps.OmitUndefined<_OmitObj>, _OmitObjOmitted>>,

    Test.Expect<Test.Exactly<deleteUndefinedProps.OmitUndefined<{ keyUndefinedOrString: undefined | string; }>, { keyUndefinedOrString?: string; }>>,
];

// as Tests[0] only so that type is used
true as Tests[ 0 ];

describe( 'objectFlatten()', () => {

    test( 'default', () => {
        const result = deleteUndefinedProps( obj1.in );

        type tests = [
            Test.Expect<Test.Exactly<typeof result, typeof obj1.out>>,
        ];

        expect( result ).toEqual( obj1.out );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );
} );