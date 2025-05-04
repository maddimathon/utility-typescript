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

export type CompileArgs = AbstractArgs<CompileStages> & {};

export type CompileStages = typeof compileSubStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const compileSubStages = [
    'js',
] as const;



/* # CLASS
 * ========================================================================== */

export class Compile extends AbstractStage<CompileStages, CompileArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = compileSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as CompileArgs;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: CompileArgs ) {
        super( args, 'green' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: CompileStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        if ( !this.args.building && (
            this.args.watchedWatcher
            || this.args.watchedFilename
            || this.args.watchedEvent
        ) ) {
            const emoji = which == 'end' ? '✅' : '🚨';
            this.progressLog( `${ emoji } [watch-change-${ which }] file ${ this.args.watchedEvent }: ${ this.args.watchedFilename }`, 0 );
        } else {

            this.startEndNoticeLog(
                which,
                `COMPILE ${ which.toUpperCase() }ING`,
                `COMPILE FINISHED`,
                `${ which.toUpperCase() }ING COMPILE`,
            );
        }
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async js() {
        this.progressLog( 'compiling typescript files...', 1 );

        const typescriptFiles = [
            'src/ts/tsconfig.json',
        ];

        for ( const path of typescriptFiles ) {
            await this.compileTypescript( path, 2 );
        }

        if ( !this.args.watchedEvent ) {

            this.verboseLog( 'deleting type-only javascript files...', 2 );
            this.fns.fs.deleteFiles( this.glob( [
                'dist/js/types/**/*.js',
                'dist/js/types/**/*.js.map',
                'dist/js/types/**/*.test.d.ts',
                'dist/js/types/**/*.test.d.ts.map',
            ] ) );
        }
    }
}