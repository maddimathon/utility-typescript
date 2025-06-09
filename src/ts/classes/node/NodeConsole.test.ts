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
import { NodeConsole } from './NodeConsole.js';

import { describe, expect, test } from '@jest/globals';


const nc = new NodeConsole( {
    prompt: {
        throwError: 'never',

        // ultra short cause jest doesn't allow interactivity
        timeout: 50,
    },
} );

const boolPrompter = {

    _: await nc.prompt.bool( {
        message: 'I am a bool prompter',
    } ),

    false: await nc.prompt.bool( {
        message: 'I am a bool prompter with false default',
        default: false,
    } ),

    true: await nc.prompt.bool( {
        message: 'I am a bool prompter with true default',
        default: true,
    } ),
};


const inputPrompter = {

    _: await nc.prompt.input( {
        message: 'I am an input prompter',
    } ),
};


const selectPrompter = {

    strings: await nc.prompt.select( {
        message: 'I am a select prompter with string options',
        choices: [
            'Option 1',
            'Option 2',
            'Option 3',
        ],
    } ),

    numbers: await nc.prompt.select( {
        message: 'I am a select prompter with number options',
        choices: [
            {
                value: 1,
                name: 'Option 1',
            },
            {
                value: 2,
                name: 'Option 2',
            },
            {
                value: 3,
                name: 'Option 3',
            },
        ],
    } ),

    mixed: await nc.prompt.select<null | number | string>( {
        message: 'I am a select prompter with mixed options',
        choices: [
            {
                value: 1,
                name: 'Option 1',
            },
            {
                value: 'Option 2',
                name: 'Option 2',
            },
            {
                value: null,
                name: 'Option 3',
            },
        ],
    } ),
};


describe( 'NodeConsole', () => {

    type Tests = [

        Test.Expect<Test.Exactly<typeof boolPrompter._, boolean | undefined>>,
        Test.Expect<Test.Satisfies<typeof boolPrompter._, boolean | undefined>>,

        Test.Expect<Test.Exactly<typeof inputPrompter._, string | undefined>>,
        Test.Expect<Test.Satisfies<typeof inputPrompter._, string | undefined>>,

        Test.Expect<Test.Exactly<typeof selectPrompter.strings, string | undefined>>,
        Test.Expect<Test.Satisfies<typeof selectPrompter.strings, string | undefined>>,

        Test.Expect<Test.Exactly<typeof selectPrompter.numbers, 1 | 2 | 3 | undefined>>,
        Test.Expect<Test.Satisfies<typeof selectPrompter.numbers, number | undefined>>,

        Test.Expect<Test.Exactly<typeof selectPrompter.mixed, null | number | string | undefined>>,
        Test.Expect<Test.Satisfies<typeof selectPrompter.mixed, null | number | string | undefined>>,
    ];

    test( 'prompt.bool timeout', () => {
        expect( boolPrompter._ ).toBe( undefined );
        expect( boolPrompter.false ).toBe( false );
        expect( boolPrompter.true ).toBe( true );
    } );

    test( 'prompt.input timeout', () => {

        expect( inputPrompter._ ).toBe( undefined );
    } );

    test( 'prompt.select timeout', () => {

        expect( selectPrompter.strings ).toBe( undefined );
    } );

    // as Tests[0] only so that type is used
    true as Tests[ 0 ];
} );
