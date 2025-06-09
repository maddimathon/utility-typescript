/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */


import NodeFS from 'node:fs';


import { AbstractStage } from './abstracts/AbstractStage.js';
import { Snapshot } from './Snapshot.js';
import { Build } from './Build.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';
import { NodeConsole_Prompt } from '../../src/ts/classes/node/index.js';
import { escRegExp } from 'src/ts/functions/index.js';


const packageSubStages = [
    'snapshot',
    'build',
    'copy',
    'zip',
] as const;


export class Package extends AbstractStage<Package.Stages, Package.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = packageSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
            building: true,
            packaging: true,
        } as Package.Args;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: Package.Args ) {
        super( args, args.releasing ? 'yellow' : 'purple' );
        this.args.packaging = true;
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runSubStage( stage: Package.Stages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        if ( which === 'start' ) {

            this.progressLog(
                [
                    [
                        'PACKAGING:',
                        { flag: true },
                    ],
                    [
                        this.pkgVersion,
                        { flag: 'reverse' }
                    ],
                ],
                0,
                {
                    bold: true,
                    clr: this.clr,

                    linesIn: 3,
                    linesOut: 1,

                    joiner: '',
                },
            );
        } else {


            this.startEndNoticeLog(
                which,
                `PACKAGING: ${ this.pkgVersion }`,
                `PACKAGE FINISHED`,
                `${ which.toUpperCase() }ING PACKAGE`,
            );
        }

        if ( which === 'start' && !this.args.releasing ) {

            const depth = this.args[ 'log-base-level' ] ?? 0;

            const promptArgs: Omit<NodeConsole_Prompt.Config, "message"> = {

                default: false,

                msgArgs: {
                    clr: this.clr,
                    depth: depth + 1,
                    maxWidth: null,
                },

                styleClrs: {
                    highlight: this.clr,
                },
            };

            this.args.dryrun = await this.nc.prompt.bool( {
                ...promptArgs,
                message: `Is this a dry run?`,
                default: !!this.args.dryrun,
            } );
        }
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async snapshot() {

        const snap = new Snapshot( {
            ...this.args as Snapshot.Args,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-snap' ],
            without: this.args[ 'without-snap' ],

            packaging: true,
        } );

        await snap.run();
    }

    protected async build() {

        const build = new Build( {
            ...this.args as Build.Args,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-build' ],
            without: this.args[ 'without-build' ],

            packaging: true,
        } );

        await build.run();
    }


    /**
     * Copies files into @releases/ subdirectory.
     */
    public async copy(): Promise<void> {
        this.progressLog( 'copying files to package directory...', 1 );


        this.verboseLog( 'copying files to package...', 2 );
        this._copyToPkg(
            [
                ...this.pkg.files,

                '.npmrc',
                '.nvmrc',
                'package.json',
                'package-lock.json',
                'LICENSE.md',
                'README.md',
            ],
            this.releasePath,
            './',
            [
                '**/*.css.map',
                '**/*.d.ts.map',
                '**/*.js.map',

                '**/*.test.d.ts',
                '**/*.test.js',
            ],
        );


        this.verboseLog( 'replacing placeholders in package...', 3 );
        for ( const o of currentReplacements( this ).concat( pkgReplacements( this ) ) ) {
            this.replaceInFiles(
                [
                    this.releasePath.replace( /\/*$/g, '/**' ),
                    // this.releasePath.replace( /\/*$/g, '/*' ),
                    // this.releasePath.replace( /\/*$/g, '/**/*' ),
                    '!' + this.releasePath.replace( /\/*$/g, '/.vscode/*.code-snippets' ),
                ],
                o.find,
                o.replace,
                this.args.verbose ? 4 : 3,
            );
        }
    }

    protected _copyToPkg(
        sourceGlobs: string[],
        outDir: string,
        sourceDir: string,
        ignoreGlobs: string[] = [],
    ) {

        if ( NodeFS.existsSync( this.fs.pathResolve( outDir, '../' ) ) ) {
            this.verboseLog( 'deleting current contents...', 3 );

            try {
                this.fs.delete( [ outDir ] );
            } catch ( error ) {
                this.nc.timestampVarDump( { error }, {
                    clr: 'red',
                    depth: ( this.args.verbose ? 4 : 3 ),
                } );
            }
        }


        this.verboseLog( 'copying files...', 3 );
        this.copyFiles(
            sourceGlobs,
            outDir,
            sourceDir,
            {
                ignoreGlobs: [
                    '**/.archive/**/*',
                    '**/.cache/**/*',
                    '**/.snapshots/**/*',
                    '**/composer.phar',
                    ...ignoreGlobs,
                ],
            }
        );
    }


    public async zip(): Promise<void> {
        // returns
        if ( this.args.dryrun ) { return; }

        this.progressLog( 'zipping release packages...', 1 );

        const zipPath: string = this.releasePath.replace( /\/*$/g, '' ) + '.zip';

        if ( !this.args.packaging ) {
            this.verboseLog( 'skipping the real zipping...', 2 );
            return;
        }

        this.verboseLog( 'zipping package...', 2 );
        this._zip(
            this.releasePath,
            zipPath,
            [],
            false,
        );
    }

    /**
     * Creates a zip file of the given directory.
     * 
     * @param sourceDir    Path to the directory to zip.
     * @param zipPath      Final path for the output zip file.
     * @param ignoreGlobs  Optional. Globs to explicitly ignore when finding files to zip.
     * @param filesOnly    Optional. Whether to return only files when fetching paths to zip.
     */
    protected _zip(
        sourceDir: string,
        zipPath: string,
        ignoreGlobs: string[] = [],
        filesOnly: boolean = true,
    ): void {

        /**
         * Directory to use as working dir when zipping the project.
         * With a trailing slash.
         */
        const zippingPWD: string = this.fs.pathResolve( sourceDir, '..' ).replace( /\/*$/g, '' ) + '/';

        /**
         * Regex that matches the path to the working directory to zip from.
         */
        const zippingPWD_regex: RegExp = new RegExp( '^' + escRegExp( zippingPWD ), 'g' );

        /*
         * Correcting and formatting the output zip path. 
         */
        zipPath = this.fs.pathResolve( zipPath ).replace( /(\/*|\.zip)?$/g, '' ) + '.zip';

        while ( NodeFS.existsSync( zipPath ) ) {
            zipPath = zipPath.replace( /(\/*|\.zip)?$/g, '' ) + `-${ this.timestamp( null, 'yyyy_MM_dd-HH_mm' ).replace( /_/g, '' ) }.zip`;
        }


        /**
         * All files to include in the zip file.
         */
        const files: string[] = this.glob(
            sourceDir.replace( /\/*$/g, '/**' ),
            {
                filesOnly,
                ignore: [
                    '**/._*',
                    '**/._**/*',
                    '**/.DS_STORE',
                    '**/.smbdelete**',
                    ...ignoreGlobs,
                ],
            },
            false,
        ).map( p => p.replace( zippingPWD_regex, '' ) );

        /*
         * Running the command. 
         */
        const zipCMD: string = `cd "${ this.fs.pathRelative( zippingPWD ) }" && zip "${ zipPath.replace( zippingPWD_regex, '' ) }" '${ files.join( "' '" ) }'`;
        this.cmd( zipCMD );
    }
}

export namespace Package {

    export type Args = AbstractStage.Args<Package.Stages> & {

        'only-build'?: Build.Stages | Build.Stages[];
        'only-snap'?: Snapshot.Stages | Snapshot.Stages[];

        'without-build'?: Build.Stages | Build.Stages[];
        'without-snap'?: Snapshot.Stages | Snapshot.Stages[];
    };

    export type Stages = typeof packageSubStages[ number ];
}