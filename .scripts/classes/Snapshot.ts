/**
 * @snapshot @maddimathon/utility-typescript
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

export type SnapshotArgs = AbstractArgs<SnapshotStages> & {};

export type SnapshotStages = typeof snapshotSubStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const snapshotSubStages = [
    'snapshot',
] as const;



/* # CLASS
 * ========================================================================== */

export class Snapshot extends AbstractStage<SnapshotStages, SnapshotArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = snapshotSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as SnapshotArgs;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: SnapshotArgs ) {
        super( args, 'orange' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: SnapshotStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        this.startEndNoticeLog(
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

        const exportPath: string = this.fns.fs.uniquePath( `${ snapdir }/${ this.pkg.name.replace( /^@([^\/]+)\//, '$1_' ) }_${ this.pkgVersion }_${ this.datetimestamp( null, 'yyyyMMdd-HHmm' ) }` );
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
        ).map( path => path.replace( new RegExp( `^${ this.fns.fns.escRegExp( `${ snapdir }/` ) }`, 'gi' ), '' ) );

        this.copyFiles( includePaths, exportPath );


        this.fns.nc.cmd( `cd ${ snapdir }/ && zip -r ${ exportName }.zip ${ exportName }` );

        this.fns.nc.cmd( `rm -rf ${ exportPath }` );

        this.progressLog( `snapshot zipped: ${ exportPath }.zip`, 1, { maxWidth: null } );
    }
}