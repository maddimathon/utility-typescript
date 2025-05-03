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

// import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { AbstractConfigurableClass } from './AbstractConfigurableClass.js';

import { mergeArgs } from '../../functions/index.js';

describe( 'AbstractConfigurableClass', () => {

    interface ExampleClassArgs extends AbstractConfigurableClass.Args { }

    // when this is updated, consider updating the doc example as well
    class ExampleClass extends AbstractConfigurableClass<ExampleClassArgs> {



        /* PROPERTIES
         * ====================================================================== */

        public get ARGS_DEFAULT(): ExampleClassArgs {

            return {
                optsRecursive: false,
            };
        }

        /**
         * Build a complete args object.
         */
        public buildArgs( args?: Partial<ExampleClassArgs> ): ExampleClassArgs {

            const mergedDefault = AbstractConfigurableClass.abstractArgs(
                this.ARGS_DEFAULT
            ) as ExampleClassArgs;

            // using this.mergeArgs here can cause issues because this method is 
            // sometimes called from the prototype
            return mergeArgs(
                mergedDefault,
                args,
                this.ARGS_DEFAULT.optsRecursive
            );
        }



        /* CONSTRUCTOR
         * ====================================================================== */

        public constructor ( args: Partial<ExampleClassArgs> = {} ) {
            super( args );
        }
    }

    const inst_default = new ExampleClass();
    const inst_override = new ExampleClass( { optsRecursive: true } );

    test( 'ExampleClass.args', () => {

        expect( inst_default.args ).toEqual( { optsRecursive: false } );
        expect( inst_override.args ).toEqual( { optsRecursive: true } );
    } );
} );