/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { AbstractStage } from './abstracts/AbstractStage.js';
import { Compile } from './Compile.js';
import { Document } from './Document.js';
import { Test } from './Test.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';
import { escRegExpReplace, softWrapText } from '../../src/ts/functions/index.js';



const buildSubStages = [
    'compile',
    'replace',
    'test',
    'document',
] as const;


export class Build extends AbstractStage<Build.Stages, Build.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = buildSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
            building: true,
        } as Build.Args;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: Build.Args ) {
        super( args, 'blue' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runSubStage( stage: Build.Stages ) {
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
            ...this.args as Compile.Args & Build.Args,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-compile' ],
            without: this.args[ 'without-compile' ],

            building: true,
        } );

        await cmpl.run();
    }

    protected async document() {

        const doc = new Document( {
            ...this.args as Document.Args & Build.Args,

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

        const changelogRegex = /(<!--README_DOCS_CHANGELOG-->).*?(<!--\/README_DOCS_CHANGELOG-->)/gs;

        this.fs.write( 'README.md', (
            this.fs.readFile( 'README.md' )
                .replace( headerRegex, '$1\n' + escRegExpReplace( `# ${ this.pkg.config.title } @ ${ this.pkgVersion }` ) + '\n$2' )
                .replace( descRegex, '$1\n' + escRegExpReplace( softWrapText( this.pkg.description, 80 ) ) + '\n$2' )
                .replace( ctaRegex, '$1\n' + escRegExpReplace( `[Read Documentation](${ this.pkg.homepage })` ) + '\n$2' )
                .replace( changelogRegex, '$1\n' + escRegExpReplace( `Read it from [the source](${ this.pkg.repository.url.replace( /(\/+|\.git)$/gi, '' ) }/blob/main/CHANGELOG.md) \nor \n[the docs site](${ this.pkg.homepage }/Changelog.html).` ) + '\n$2' )
        ), { force: true } );

        if ( this.args.releasing ) {

            const installRegex = /(<!--README_INSTALL-->).*?(<!--\/README_INSTALL-->)/gs;

            this.fs.write( 'README.md', (
                this.fs.readFile( 'README.md' )
                    .replace( installRegex, '$1\n' + escRegExpReplace( [
                        '```bash',
                        'npm i -D @maddimathon/utility-js@' + this.pkg.version,
                        'npm i -D github:maddimathon/utility-js#' + this.pkg.version,
                        '```',
                    ].join( '\n' ) ) + '\n$2' )
            ), { force: true } );
        }
    }

    protected async test() {

        const t = new Test( {
            ...this.args as Test.Args & Build.Args,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-test' ],
            without: this.args[ 'without-test' ],

            building: true,
        } );

        await t.run();
    }
}

export namespace Build {

    export type Args = AbstractStage.Args<Build.Stages> & {

        'only-compile'?: Compile.Stages | Compile.Stages[];
        'only-document'?: Document.Stages | Document.Stages[];
        'only-test'?: Test.Stages | Test.Stages[];

        'without-compile'?: Compile.Stages | Compile.Stages[];
        'without-document'?: Document.Stages | Document.Stages[];
        'without-test'?: Test.Stages | Test.Stages[];
    };

    export type Stages = typeof buildSubStages[ number ];
}