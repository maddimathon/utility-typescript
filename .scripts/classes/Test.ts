/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { AbstractStage } from './abstracts/AbstractStage.js';


const testSubStages = [
    'js',
] as const;


export class Test extends AbstractStage<Test.Stages, Test.Args> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public subStages = testSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as Test.Args;
    }



    /* CONSTRUCTOR
    * ====================================================================== */

    constructor ( args: Test.Args ) {
        super( args, 'red' );
    }



    /* LOCAL METHODS
    * ====================================================================== */

    protected async runSubStage( stage: Test.Stages ) {
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

        this.cmd( 'node --experimental-vm-modules --no-warnings node_modules/jest/bin/jest.js' );

        if ( this.args.packaging && !this.args.dryrun ) {

            this.verboseLog( 'removing test files from dist...', 2 );
            this.fs.delete( this.glob( [
                'dist/**/*.test.d.ts',
                'dist/**/*.test.d.ts.map',
                'dist/**/*.test.js',
                'dist/**/*.test.js.map',
            ] ) );
        }
    }
}

export namespace Test {

    export type Args = AbstractStage.Args<Test.Stages> & {};

    export type Stages = typeof testSubStages[ number ];
}