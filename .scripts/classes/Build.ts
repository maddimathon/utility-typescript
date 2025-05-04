/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';
import type { CompileArgs, CompileStages } from './Compile.js';
import type { DocumentArgs, DocumentStages } from './Document.js';
import type { TestArgs, TestStages } from './Test.js';


/* IMPORT EXTERNAL DEPENDENCIES */


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';
import { Compile } from './Compile.js';
import { Document } from './Document.js';
import { Test } from './Test.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';
import { softWrapText } from 'src/ts/functions/index.js';



/* # TYPES
 * ========================================================================== */

export interface BuildArgs extends AbstractArgs<BuildStages> {

    'only-compile'?: CompileStages | CompileStages[];
    'only-document'?: DocumentStages | DocumentStages[];
    'only-test'?: TestStages | TestStages[];

    'without-compile'?: CompileStages | CompileStages[];
    'without-document'?: DocumentStages | DocumentStages[];
    'without-test'?: TestStages | TestStages[];
}

export type BuildStages = typeof buildStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const buildStages = [
    'compile',
    'replace',
    'test',
    'document',
] as const;



/* # CLASS
 * ========================================================================== */

export class Build extends AbstractStage<BuildStages, BuildArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = buildStages;

    public get ARGS_DEFAULT(): BuildArgs {
        // @ts-expect-error
        return {
            ...AbstractStage.ARGS_ABSTRACT,
        };
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: BuildArgs ) {
        super( args, 'blue' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: BuildStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        if (
            this.args.watchedWatcher
            || this.args.watchedFilename
            || this.args.watchedEvent
        ) {
            const emoji = which == 'end' ? '✅' : '🚨';
            this.progressLog( `${ emoji } [watch-change-${ which }] file ${ this.args.watchedEvent }: ${ this.args.watchedFilename }`, 0 );
        } else {

            this.startEndNoticeLog(
                which,
                `BUILD ${ which.toUpperCase() }ING`,
                `BUILD FINISHED`,
                `${ which.toUpperCase() }ING BUILD`,
            );
        }
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async compile() {

        const cmpl = new Compile( {
            ...this.args as CompileArgs & BuildArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-compile' ],
            without: this.args[ 'without-compile' ],

            building: true,
        } );

        await cmpl.run();
    }

    protected async document() {

        const doc = new Document( {
            ...this.args as DocumentArgs & BuildArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-document' ],
            without: this.args[ 'without-document' ],

            building: true,
        } );

        await doc.run();
    }

    protected async replace() {
        this.progressLog( 'replacing placeholders...', 1 );

        if ( !this.args.watchedEvent ) {

            this.verboseLog( 'replacing in dist...', 2 );

            for ( const o of currentReplacements( this ).concat( pkgReplacements( this ) ) ) {

                this.replaceInFiles(
                    [
                        'dist/**/*',
                    ],
                    o.find,
                    o.replace,
                    this.args.verbose ? 3 : 2,
                );
            }
        }


        this.verboseLog( 'replacing in README...', 2 );

        const headerRegex = /(<!--README_HEADER-->).*?(<!--\/README_HEADER-->)/gs;

        const descRegex = /(<!--README_DESC-->).*?(<!--\/README_DESC-->)/gs;

        const ctaRegex = /(<!--README_DOCS_CTA-->).*?(<!--\/README_DOCS_CTA-->)/gs;

        this.fns.fs.writeFile( 'README.md', (
            this.fns.fs.readFile( 'README.md' )
                .replace( headerRegex, '$1\n' + this.fns.fns.escRegExpReplace( `# ${ this.pkg.config.title } @ ${ this.pkgVersion }` ) + '\n$2' )
                .replace( descRegex, '$1\n' + this.fns.fns.escRegExpReplace( softWrapText( this.pkg.description, 80 ) ) + '\n$2' )
                .replace( ctaRegex, '$1\n' + this.fns.fns.escRegExpReplace( `<a href="${ this.pkg.homepage }" class="button">Read Documentation</a>` ) + '\n$2' )
        ), { force: true } );

        if ( this.args.releasing ) {

            const installRegex = /(<!--README_INSTALL-->).*?(<!--\/README_INSTALL-->)/gs;

            this.fns.fs.writeFile( 'README.md', (
                this.fns.fs.readFile( 'README.md' )
                    .replace( installRegex, '$1\n' + this.fns.fns.escRegExpReplace( [
                        '```bash',
                        'npm i -D @maddimathon/utility-typescript@' + this.pkg.version,
                        'npm i -D github:maddimathon/utility-typescript#' + this.pkg.version,
                        '```',
                    ].join( '\n' ) ) + '\n$2' )
            ), { force: true } );
        }
    }

    protected async test() {

        const t = new Test( {
            ...this.args as TestArgs & BuildArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-test' ],
            without: this.args[ 'without-test' ],

            building: true,
        } );

        await t.run();
    }
}