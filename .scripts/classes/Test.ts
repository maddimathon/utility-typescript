#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
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
] as const;



/* # CLASS
 * ========================================================================== */

export class Test extends AbstractStage<TestStages, TestArgs> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public stages = testStages;

    public get ARGS_DEFAULT(): TestArgs {
        // @ts-expect-error
        return {
            ...AbstractStage.ARGS_ABSTRACT,
        };
    }



    /* CONSTRUCTOR
    * ====================================================================== */

    constructor ( args: TestArgs ) {
        super( args, 'red' );
    }



    /* LOCAL METHODS
    * ====================================================================== */

    protected async runStage( stage: TestStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeLog(
            which,
            `TESTS ${ which.toUpperCase() }ING`,
            `TESTS FINISHED`,
            `${ which.toUpperCase() }ING TESTS`,
        );
    }



    /* STAGE METHODS
    * ====================================================================== */

    protected async js() {
        this.progressLog( 'running jest...', 1 );

        this.fns.cmd( 'node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest.js' );

        if ( this.args.packaging && !this.args.dryrun ) {

            this.verboseLog( 'removing test files from dist...', 2 );
            this.fns.deleteFiles( [
                'dist/**/*.test.d.ts',
                'dist/**/*.test.d.ts.map',
                'dist/**/*.test.js',
                'dist/**/*.test.js.map',
            ] );
        }
    }
}