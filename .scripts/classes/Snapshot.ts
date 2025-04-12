/**
 * @snapshot @maddimathon/utility-typescript@___CURRENT_VERSION___
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

export interface SnapshotArgs extends AbstractArgs<SnapshotStages> { }

export type SnapshotStages = typeof snapshotStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const snapshotStages = [
    'snapshot',
] as const;



/* # CLASS
 * ========================================================================== */

export class Snapshot extends AbstractStage<SnapshotStages, SnapshotArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = snapshotStages;



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: SnapshotArgs ) {
        super( args );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: SnapshotStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeMaker(
            which,
            `SNAPSHOT ${ which.toUpperCase() }ING`,
            `SNAPSHOT FINISHED`,
            `${ which.toUpperCase() }ING SNAPSHOT`,
        );
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async snapshot() {
        // this.progressLog( 'making snapshot...', 1 );

        const snapdir = this.pkg.config.paths.snapshots.replace( /\/+$/gi, '' );

        const exportPath: string = this.uniquePath( `${ snapdir }/${ this.pkgName.replace( /^@([^\/]+)\//, '$1_' ) }_${ this.pkgVersion }_${ this.datetimestamp( null, 'yyyyMMdd-HHmm' ) }` );
        const exportName: string = exportPath.replace( /^\/?([^\/]+\/)*/gi, '' );


        const includePaths: string[] = this.glob(
            [ '**/*', ],
            {
                ignore: [
                    '.git/**/*',
                    `${ snapdir }/**/*`,
                    '@releases/**/*',
                    'node_modules/**/*',

                    '**/._*',
                    '**/._**/*',
                    '**/.DS_Store',
                    '**/.smbdelete**',
                ],
            },
            true
        ).map( path => path.replace( new RegExp( `^${ this.escRegExp( `${ snapdir }/` ) }`, 'gi' ), '' ) );

        this.copyFiles( includePaths, exportPath );


        this.cmd( `cd ${ snapdir }/ && zip -r ${ exportName }.zip ${ exportName }` );

        this.cmd( `rm -rf ${ exportPath }` );

        this.progressLog( `snapshot zipped: ${ exportPath }.zip`, 1 );
    }
}