/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */


/* IMPORT TYPES */


/* IMPORT EXTERNAL DEPENDENCIES */


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';



/* # VARIABLES
 * ========================================================================== */

const compileSubStages = [
    'js',
] as const;



/* # CLASS
 * ========================================================================== */

export class Compile extends AbstractStage<Compile.Stages, Compile.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = compileSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as Compile.Args;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: Compile.Args ) {
        super( args, 'green' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runSubStage( stage: Compile.Stages ) {
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

        for ( const _path of typescriptFiles ) {

            this.verboseLog( `compiling typescript project ${ _path }...`, 2 );

            const _tsconfig: Partial<{
                exclude: string | string[];
                include: string | string[];

                compilerOptions: Partial<{
                    baseUrl: string;
                    noEmit: boolean;
                    outDir: string;
                }>;
            }> = JSON.parse( this.fs.readFile( _path ) );

            // deleting current files
            if ( !this.args.watchedEvent && _tsconfig.compilerOptions?.noEmit !== true ) {

                const _outDir = _tsconfig.compilerOptions?.outDir;

                if ( _outDir ) {

                    const tsconfigDir = _path.replace( /\/[^\/]+\.json$/, '/' ).replace( /^[^\/]+\.json$/, './' );
                    this.args.debug && this.progressLog( `tsconfigDir = ${ tsconfigDir }`, this.args.verbose ? 3 : 2 );

                    const outDirGlobs = this.fs.pathRelative( this.fs.pathResolve( tsconfigDir, _outDir.replace( /(\/+\**)?$/, '' ) ) ) + '/**/*';

                    this.verboseLog( `deleting current contents (${ outDirGlobs })...`, 3 );
                    this.fs.delete( this.glob( outDirGlobs ) );
                }
            }

            const _cmdParams = {
                project: _path,
            };

            this.verboseLog( 'running tsc...', 4 );
            const _tscCmd = `tsc ${ this.nc.cmdArgs( _cmdParams, true, false ) }`;

            this.args.debug && this.progressLog( _tscCmd, this.args.verbose ? 5 : 4 );
            this.cmd( _tscCmd );
        }

        if ( !this.args.watchedEvent ) {

            this.verboseLog( 'deleting type-only javascript files...', 2 );
            this.fs.delete( this.glob( [

                'dist/**/*.docs.js',
                'dist/**/*.docs.js.map',
                'dist/**/*.docs.d.ts',
                'dist/**/*.docs.d.ts.map',

                'dist/types/**/*.js',
                'dist/types/**/*.js.map',

                'dist/types/**/*.test.js',
                'dist/types/**/*.test.js.map',
                'dist/types/**/*.test.d.ts',
                'dist/types/**/*.test.d.ts.map',

            ] ), 3, false );
        }
    }
}

export namespace Compile {

    export type Args = AbstractStage.Args<Compile.Stages> & {};

    export type Stages = typeof compileSubStages[ number ];
}