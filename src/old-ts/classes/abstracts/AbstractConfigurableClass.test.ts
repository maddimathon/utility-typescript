/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

import type {
    Objects,
    Test,
} from '../../types/index.js';

import { describe, expect, test } from '@jest/globals';

import { AbstractConfigurableClass } from './AbstractConfigurableClass.js';


export interface _ExampleClass_Args extends AbstractConfigurableClass.Args {
    argsRecursive: false;
    exampleProp: boolean;
};

export class _ExampleClass extends AbstractConfigurableClass<_ExampleClass_Args> {

    public get ARGS_DEFAULT() {

        return {
            argsRecursive: false,
            exampleProp: true,
        } as const satisfies _ExampleClass_Args;
    }
}

const _instance = new _ExampleClass();
const mergeArgs = _instance.mergeArgs;

// this is copied from the merge args file
describe( 'AbstractConfigurableClass.mergeArgs()', () => {

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

    const merged = {

        full: mergeArgs( defaultObj, inputObj.full, false ),

        invalid: mergeArgs( defaultObj ),

        partial: mergeArgs( defaultObj, inputObj.partial, false ),

        recursive: {
            full: mergeArgs( defaultObj, inputObj.full, true ),
            partial: mergeArgs( defaultObj, inputObj.partialRecursive, true ),
        },
    };

    test( 'mergeArgs() - undefined/invalid inputs', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged.invalid, typeof defaultObj>>,
        ];

        // invalid or non-existant inputs should return the defaults
        expect( merged.invalid ).toEqual( defaultObj );

        expect( mergeArgs( defaultObj, {} ) ).toEqual( defaultObj );
        expect( mergeArgs( defaultObj, undefined ) ).toEqual( defaultObj );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgs() - complete input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged.full, typeof inputObj.full>>,
            Test.Expect<Test.Exactly<typeof merged.recursive.full, typeof inputObj.full>>,
        ];

        // complete input objects should fully overwrite the defaults, regardless of recursion
        expect( merged.recursive.full ).toEqual( inputObj.full );
        expect( merged.full ).toEqual( inputObj.full );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgs() - partial input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged.partial, typeof expected.partial>>,
        ];

        // non-recursive, partial merging should return a combination of default and overridden props
        expect( merged.partial ).toEqual( expected.partial );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgs() - recursive, partial input obj', () => {

        type tests = [
            Test.Expect<Test.Exactly<typeof merged.recursive.partial, typeof expected.recursive.partial>>,
        ];

        // recursive, partial merging should return a combination of default and overridden props
        expect( merged.recursive.partial ).toEqual( expected.recursive.partial );

        // as tests[0] only so that type is used
        true as tests[ 0 ];
    } );

    test( 'mergeArgs() - recursive = false by default', () => {

        // @ts-expect-error This typing is wrong on purpose in order to run tests
        const fakeNotRecursivePartial: Partial<typeof defaultObj> = inputObj.partialRecursive;

        const tmpMerged = mergeArgs( defaultObj, fakeNotRecursivePartial );

        // confirms that the recursive param defaults to false
        expect( tmpMerged ).toEqual( mergeArgs( defaultObj, fakeNotRecursivePartial, false ) );
        expect( tmpMerged ).not.toEqual( mergeArgs( defaultObj, fakeNotRecursivePartial, true ) );
    } );
} );