#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/template-npm-library@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 * 
 * @since ___PKG_VERSION___
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';


/* IMPORT EXTERNAL DEPENDENCIES */


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';



/* # TYPES
 * ========================================================================== */

export interface TestArgs extends AbstractArgs<TestStages> { }

export type TestStages = typeof testStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const testStages = [
    'js',
    'scss',
] as const;



/* # CLASS
 * ========================================================================== */

export class Test extends AbstractStage<TestStages, TestArgs> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public stages = testStages;



    /* CONSTRUCTOR
    * ====================================================================== */

    constructor ( args: TestArgs ) {
        super( args );
    }



    /* LOCAL METHODS
    * ====================================================================== */

    protected async runStage( stage: TestStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeMaker(
            which,
            `TESTS ${ which.toUpperCase() }ING`,
            `TESTS FINISHED`,
            `${ which.toUpperCase() }ING TESTS`,
        );
    }



    /* STAGE METHODS
    * ====================================================================== */

    protected async js() {
        this.progressLog( 'testing javascript...', 1 );

        this.cmd( 'node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest.js' );

        if ( this.opts.packaging && !this.opts.dryrun ) {

            this.verboseLog( 'removing test files from dist...', 2 );
            this.deleteFiles( [
                'dist/**/*.test.d.ts',
                'dist/**/*.test.d.ts.map',
                'dist/**/*.test.js',
                'dist/**/*.test.js.map',
            ] );
        }
    }

    protected async scss() {
        this.progressLog( '(NOT IMPLEMENTED) testing scss...', 1 );
    }
}