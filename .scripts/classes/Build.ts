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
import type { Functions } from './Functions.js';
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
    'minimize',
    'replace',
    'prettify',
    'test',
    'document',
] as const;



/* # CLASS
 * ========================================================================== */

export class Build extends AbstractStage<BuildStages, BuildArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = buildStages;



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: BuildArgs ) {
        super( args );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: BuildStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        if (
            this.opts.watchedWatcher
            || this.opts.watchedFilename
            || this.opts.watchedEvent
        ) {
            const emoji = which == 'end' ? '✅' : '🚨';
            this.progressLog( `${ emoji } [watch-change-${ which }] file ${ this.opts.watchedEvent }: ${ this.opts.watchedFilename }`, 0 );
        } else {

            this.startEndNoticeMaker(
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
            ...this.opts as CompileArgs & BuildArgs,

            'log-base-level': 1 + ( this.opts[ 'log-base-level' ] ?? 0 ),

            only: this.opts[ 'only-compile' ],
            without: this.opts[ 'without-compile' ],

            building: true,
        } );

        await cmpl.run();
    }

    protected async document() {

        const doc = new Document( {
            ...this.opts as DocumentArgs & BuildArgs,

            'log-base-level': 1 + ( this.opts[ 'log-base-level' ] ?? 0 ),

            only: this.opts[ 'only-document' ],
            without: this.opts[ 'without-document' ],

            building: true,
        } );

        await doc.run();
    }

    protected async minimize() {
        this.progressLog( 'minifying files...', 1 );

        this.verboseLog( 'minifying javascript...', 2 );

        const jsPaths = this.glob( 'dist/js/**/*.js', {
            ignore: [
                '**/*.test.d.ts',
                '**/*.test.js',
            ].concat( ( this.opts.globOpts?.ignore ?? [] ) as string[] ),
        } );

        for ( const path of jsPaths ) {
            this.minify( path, 'js', ( this.opts.verbose ? 3 : 2 ) );
        }

        this.verboseLog( '(NOT IMPLEMENTED) minifying css...', 2 );
    }

    protected async prettify() {
        this.progressLog( '(NOT IMPLEMENTED) prettifying files...', 1 );
    }

    protected async replace() {
        this.progressLog( 'replacing placeholders...', 1 );

        if ( !this.opts.watchedEvent ) {

            this.verboseLog( 'replacing in dist...', 2 );
            for ( const o of currentReplacements( this as Functions ).concat( pkgReplacements( this as Functions ) ) ) {
                this.replaceInFiles(
                    [
                        './dist/**/*',
                    ],
                    o.find,
                    o.replace,
                    this.opts.verbose ? 3 : 2,
                );
            }
        }


        this.verboseLog( 'replacing in README...', 2 );

        const headerRegex = /(<!--README_HEADER-->).*?(<!--\/README_HEADER-->)/gs;

        const descRegex = /(<!--README_DESC-->).*?(<!--\/README_DESC-->)/gs;

        const ctaRegex = /(<!--README_DOCS_CTA-->).*?(<!--\/README_DOCS_CTA-->)/gs;

        this.writeFile( 'README.md', (
            this.readFile( 'README.md' )
                .replace( headerRegex, '$1\n' + this.escRegExpReplace( `# ${ this.pkgTitle } @ ${ this.pkgVersion }` ) + '\n$2' )
                .replace( descRegex, '$1\n' + this.escRegExpReplace( this.pkg.description ) + '\n$2' )
                .replace( ctaRegex, '$1\n' + this.escRegExpReplace( `<a href="${ this.pkg.homepage }" class="button" target="_blank">Read Documentation</a>` ) + '\n$2' )
        ), { force: true } );
    }

    protected async test() {

        const t = new Test( {
            ...this.opts as TestArgs & BuildArgs,

            'log-base-level': 1 + ( this.opts[ 'log-base-level' ] ?? 0 ),

            only: this.opts[ 'only-test' ],
            without: this.opts[ 'without-test' ],

            building: true,
        } );

        await t.run();
    }
}