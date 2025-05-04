#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
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

export type TestArgs = AbstractArgs<TestStages> & {};

export type TestStages = typeof testSubStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const testSubStages = [
    'js',
] as const;



/* # CLASS
 * ========================================================================== */

export class Test extends AbstractStage<TestStages, TestArgs> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public subStages = testSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as TestArgs;
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

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

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

        this.fns.nc.cmd( 'node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest.js' );

        if ( this.args.packaging && !this.args.dryrun ) {

            this.verboseLog( 'removing test files from dist...', 2 );
            this.fns.fs.deleteFiles( this.glob( [
                'dist/**/*.test.d.ts',
                'dist/**/*.test.d.ts.map',
                'dist/**/*.test.js',
                'dist/**/*.test.js.map',
            ] ) );
        }
    }
}