/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    Objects,
    Test,
} from '../../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { mergeArgsAsync } from './mergeArgsAsync.js';

type DefaultObjType = {
    a: string;
    b: number;
    child: {
        1: string[];
        2: boolean;
        3: string;
    };
};

const defaultObj: DefaultObjType = {
    a: 'default value',
    b: 6,

    child: {
        1: [
            'default value 1',
            'default value 2',
        ],
        2: false,
        3: 'default value',
    },
};

const inputObj = {

    full: {
        a: 'override value',
        b: 7,

        child: {
            1: [
                'override value 1',
                'override value 2',
            ],
            2: true,
            3: 'override value',

            extra: 'input-only property',
        },

        extra: 'input-only property',
    } as DefaultObjType,

    partial: {

        child: {
            1: [
                'override value 1',
                'override value 2',
            ],
            2: true,
            3: 'override value',

            extra: 'input-only property',
        },

        extra: 'input-only property',
    } as Partial<DefaultObjType>,

    partialRecursive: {

        child: {
            1: [
                'override value 1',
                'override value 2',
            ],

            extra: 'input-only property',
        },

        extra: 'input-only property',
    } as Objects.RecursivePartial<DefaultObjType>,
};

const expected = {

    partial: {
        ...defaultObj,
        ...inputObj.partial,
    },

    recursive: {
        partial: {
            ...defaultObj,
            ...inputObj.partialRecursive,

            child: {
                ...defaultObj.child,
                ...inputObj.partialRecursive.child,
            },
        },
    },
};

// @ts-expect-error This typing is wrong on purpose in order to run tests
const fakeNotRecursivePartial: Partial<typeof defaultObj> = inputObj.partialRecursive;

const [
    merged_full,
    merged_invalid,
    merged_partial,
    merged_recursive_full,
    merged_recursive_partial,

    merged_emptyObj,
    merged_undefined,

    merged_recursiveFalseByDefault_merged,

    merged_recursiveFalseByDefault_mergedRecursive,
    merged_recursiveFalseByDefault_mergedNotRecursive,
] = await Promise.all( [
    mergeArgsAsync( defaultObj, inputObj.full, false ),
    mergeArgsAsync( defaultObj ),
    mergeArgsAsync( defaultObj, inputObj.partial, false ),
    mergeArgsAsync( defaultObj, inputObj.full, true ),
    mergeArgsAsync( defaultObj, inputObj.partialRecursive, true ),

    mergeArgsAsync( defaultObj, {} ),
    mergeArgsAsync( defaultObj, undefined ),

    mergeArgsAsync( defaultObj, fakeNotRecursivePartial ),
    mergeArgsAsync( defaultObj, fakeNotRecursivePartial, true ),
    mergeArgsAsync( defaultObj, fakeNotRecursivePartial, false ),
] );

describe( 'mergeArgsAsync()', () => {

    test( 'mergeArgsAsync() - undefined/invalid inputs', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged_invalid, typeof defaultObj>>,
        ];

        // invalid or non-existant inputs should return the defaults
        expect( merged_invalid ).toEqual( defaultObj );

        expect( merged_emptyObj ).toEqual( defaultObj );
        expect( merged_undefined ).toEqual( defaultObj );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgsAsync() - complete input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged_full, typeof inputObj.full>>,
            Test.Expect<Test.Exactly<typeof merged_recursive_full, typeof inputObj.full>>,
        ];

        // complete input objects should fully overwrite the defaults, regardless of recursion
        expect( merged_recursive_full ).toEqual( inputObj.full );
        expect( merged_full ).toEqual( inputObj.full );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgsAsync() - partial input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged_partial, typeof expected.partial>>,
        ];

        // non-recursive, partial merging should return a combination of default and overridden props
        expect( merged_partial ).toEqual( expected.partial );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgsAsync() - recursive, partial input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged_recursive_partial, typeof expected.recursive.partial>>,
        ];

        // recursive, partial merging should return a combination of default and overridden props
        expect( merged_recursive_partial ).toEqual( expected.recursive.partial );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgsAsync() - recursive = false by default', () => {

        const tmpMerged = merged_recursiveFalseByDefault_merged;

        // confirms that the recursive param defaults to false
        expect( tmpMerged ).toEqual( merged_recursiveFalseByDefault_mergedNotRecursive );
        expect( tmpMerged ).not.toEqual( merged_recursiveFalseByDefault_mergedRecursive );
    } );
} );
