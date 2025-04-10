/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
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

export interface CompileArgs extends AbstractArgs<CompileStages> { }

export type CompileStages = typeof compileStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const compileStages = [
    'js',
    'css',
] as const;



/* # CLASS
 * ========================================================================== */

export class Compile extends AbstractStage<CompileStages, CompileArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = compileStages;



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: CompileArgs ) {
        super( args );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: CompileStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        const emoji = which == 'end' ? '✅' : '🚨';

        if (
            this.opts.watchedWatcher
            || this.opts.watchedFilename
            || this.opts.watchedEvent
        ) {
            this.progressLog( `${ emoji } [watch-change-${ which }] file ${ this.opts.watchedEvent }: ${ this.opts.watchedFilename }`, 0 );
        } else {

            this.startEndNoticeMaker(
                which,
                `COMPILE ${ which.toUpperCase() }ING`,
                `COMPILE FINISHED`,
                `${ which.toUpperCase() }ING COMPILE`,
            );
        }
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async css() {
        this.progressLog( '(NOT IMPLEMENTED) compiling scss...', 1 );
    }

    protected async js() {
        this.progressLog( 'compiling typescript files...', 1 );

        const typescriptFiles = [
            'src/ts/tsconfig.json',
        ];

        for ( const path of typescriptFiles ) {
            await this.compileTypescript( path, 2 );
        }

        this.verboseLog( 'deleting type-only javascript files...', 2 );
        this.deleteFiles( [
            'dist/js/types/**/*.js',
            'dist/js/types/**/*.js.map',
        ] );
    }
}