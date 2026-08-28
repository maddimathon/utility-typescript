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
import { objectOmit } from './objectOmit.js';

const testObj = {
    one: 1,
    two: [ 2, 2, 'hello' ],
    three: 'home-key',

    aaa: 'boo',
    bbb: [],
    ccc: {
        last: 'one',
        just: [ 'kidding', '...' ],
    },
};

const no_one = {
    ...testObj,
};
// @ts-expect-error
delete no_one.one;

const no_two = {
    ...testObj,
};
// @ts-expect-error
delete no_two.two;

describe( 'objectOmit', () => {

    test( 'omit one', () => {
        const omitted = objectOmit( testObj, [ 'one' ] );

        type _test = [
            Test.Expect<Test.Exactly<typeof omitted, Omit<typeof testObj, 'one'>>>,
        ];

        expect( omitted ).toStrictEqual( no_one );

        true as _test[ 0 ];
    } );

    test( 'omit two', () => {
        const omitted = objectOmit( testObj, [ 'two' ] );

        type _test = [
            Test.Expect<Test.Exactly<typeof omitted, Omit<typeof testObj, 'two'>>>,
        ];

        expect( omitted ).toStrictEqual( no_two );

        true as _test[ 0 ];
    } );
} );
