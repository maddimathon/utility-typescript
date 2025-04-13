/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';
import type { BuildArgs, BuildStages } from './Build.js';
import type { SnapshotArgs, SnapshotStages } from './Snapshot.js';


/* IMPORT EXTERNAL DEPENDENCIES */
import NodeFS from 'node:fs';


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';
import { Snapshot } from './Snapshot.js';
import { Build } from './Build.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';



/* # TYPES
 * ========================================================================== */

export interface PackageArgs extends AbstractArgs<PackageStages> {

    'only-build'?: BuildStages | BuildStages[];
    'only-snap'?: SnapshotStages | SnapshotStages[];

    'without-build'?: BuildStages | BuildStages[];
    'without-snap'?: SnapshotStages | SnapshotStages[];
}

export type PackageStages = typeof packageStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const packageStages = [
    'snapshot',
    'build',
    'copy',
    'zip',
] as const;



/* # CLASS
 * ========================================================================== */

export class Package extends AbstractStage<PackageStages, PackageArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = packageStages;

    public get ARGS_DEFAULT(): PackageArgs {
        // @ts-expect-error
        return {
            ...AbstractStage.ARGS_ABSTRACT,
        };
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: PackageArgs ) {
        super( args );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: PackageStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeMaker(
            which,
            `PACKAGE ${ which.toUpperCase() }ING`,
            `PACKAGE FINISHED`,
            `${ which.toUpperCase() }ING PACKAGE`,
        );
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async snapshot() {
        const snap = new Snapshot( {
            ...this.args as SnapshotArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-snap' ],
            without: this.args[ 'without-snap' ],
        } );
        await snap.run();
    }

    protected async build() {
        const build = new Build( {
            ...this.args as BuildArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-build' ],
            without: this.args[ 'without-build' ],
        } );
        await build.run();
    }


    /**
     * Copies files into @releases/ subdirectory.
     */
    public async copy(): Promise<void> {
        this.progressLog( 'copying files to release directory...', 1 );


        this.verboseLog( 'copying files to package...', 2 );
        this._copyToPkg(
            [
                ...this.fns.pkg.files,

                '.npmrc',
                '.nvmrc',
                'package.json',
                'package-lock.json',
                'LICENSE.md',
                'README.md',
            ],
            this.fns.releasePath,
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
        for ( const o of currentReplacements( this.fns ).concat( pkgReplacements( this.fns ) ) ) {
            this.replaceInFiles(
                [
                    this.fns.releasePath.replace( /\/*$/g, '/**' ),
                    // this.fns.releasePath.replace( /\/*$/g, '/*' ),
                    // this.fns.releasePath.replace( /\/*$/g, '/**/*' ),
                    '!' + this.fns.releasePath.replace( /\/*$/g, '/.vscode/*.code-snippets' ),
                ],
                o.find,
                o.replace,
                this.args.verbose ? 4 : 3,
            );
        }


        this.verboseLog( 'replacing placeholders in source...', 3 );
        if ( !this.args.dryrun ) {

            for ( const o of pkgReplacements( this.fns ) ) {
                this.replaceInFiles(
                    '**/*',
                    o.find,
                    o.replace,
                    this.args.verbose ? 4 : 3,
                );
            }
        }
    }

    protected _copyToPkg(
        sourceGlobs: string[],
        outDir: string,
        sourceDir: string,
        ignoreGlobs: string[] = [],
    ) {

        if ( NodeFS.existsSync( this.fns.pathResolve( outDir, '../' ) ) ) {
            this.verboseLog( 'deleting current contents...', 3 );

            try {
                this.fns.deleteFiles( outDir );
            } catch ( err ) {
                // nodeErrorCLI( err as NodeError, ( this.args.verbose ? 4 : 3 ) );
            }
        }


        this.verboseLog( 'copying files...', 3 );
        this.fns.copyFiles(
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

        const zipPath: string = this.fns.releasePath.replace( /\/*$/g, '' ) + '.zip';

        if ( !this.args.packaging ) {
            this.verboseLog( 'skipping the real zipping...', 2 );
            return;
        }

        this.verboseLog( 'zipping package...', 2 );
        this._zip(
            this.fns.releasePath,
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
        const zippingPWD: string = this.fns.pathResolve( sourceDir, '..' ).replace( /\/*$/g, '' ) + '/';

        /**
         * Regex that matches the path to the working directory to zip from.
         */
        const zippingPWD_regex: RegExp = new RegExp( '^' + this.fns.fns.escRegExp( zippingPWD ), 'g' );

        /*
         * Correcting and formatting the output zip path. 
         */
        zipPath = this.fns.pathResolve( zipPath ).replace( /(\/*|\.zip)?$/g, '' ) + '.zip';

        while ( NodeFS.existsSync( zipPath ) ) {
            zipPath = zipPath.replace( /(\/*|\.zip)?$/g, '' ) + `-${ this.fns.timestamp( null, 'yyyy_MM_dd-HH_mm' ).replace( /_/g, '' ) }.zip`;
        }


        /**
         * All files to include in the zip file.
         */
        const files: string[] = this.fns.glob(
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
        const zipCMD: string = `cd "${ this.fns.pathRelative( zippingPWD ) }" && zip "${ zipPath.replace( zippingPWD_regex, '' ) }" '${ files.join( "' '" ) }'`;
        this.cmd( zipCMD );
    }
}