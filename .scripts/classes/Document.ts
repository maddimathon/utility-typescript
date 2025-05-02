/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';


/* IMPORT EXTERNAL DEPENDENCIES */
import * as typeDoc from "typedoc";


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';
// import { Doc_Project } from './doc/Doc_Project.js';



/* # TYPES
 * ========================================================================== */

export interface DocumentArgs extends AbstractArgs<DocumentStages> {
}

export type DocumentStages = typeof docStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const docStages = [
    'ts',
    'replace',
] as const;



/* # CLASS
 * ========================================================================== */

export class Document extends AbstractStage<DocumentStages, DocumentArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = docStages;

    public get ARGS_DEFAULT(): DocumentArgs {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as DocumentArgs;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: DocumentArgs ) {
        super( args, 'turquoise' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: DocumentStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeLog(
            which,
            `DOCUMENTATION ${ which.toUpperCase() }ING`,
            `DOCUMENTATION FINISHED`,
            `${ which.toUpperCase() }ING DOCUMENTATION`,
        );
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async replace() {
        this.progressLog( 'replacing placeholders...', 1 );

        for ( const o of currentReplacements( this.fns ).concat( pkgReplacements( this.fns ) ) ) {
            this.replaceInFiles(
                [
                    './docs/**/*',
                ],
                o.find,
                o.replace,
                2,
            );
        }
    }

    protected async ts() {
        this.progressLog( 'documenting typescript...', 1 );

        /** URL to documentation, without trailing slash. */
        const homepage = this.fns.pkg.homepage.replace( /\/+$/gi, '' );

        /** URL to repository, without trailing slash or `.git`. */
        const repository = this.fns.pkg.repository.url.replace( /(\/+|\.git)$/gi, '' );

        // TODO - generate entryPoints from pkg.main and pkg.exports
        const config: Partial<typeDoc.TypeDocOptions> = {

            tsconfig: 'src/ts/tsconfig.json',

            basePath: './src/ts',

            blockTags: [
                ...typeDoc.OptionDefaults.blockTags,

                '@homepage',
                '@package',
                '@source',
            ],

            categorizeByGroup: true,

            categoryOrder: [
                '*',
                'Misc.',
                'Functions',
                'Classes',
                'Namespaces',
                'Modules',
                'Entry Points',
            ],

            // compilerOptions,

            customFooterHtml: `<p>Copyright <a href="https://www.maddimathon.com" target="_blank">Maddi Mathon</a>, 2025. <a href="${ homepage }/MIT_License.html">MIT license</a>.</p><p>Site generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a>.</p>`,
            customFooterHtmlDisableWrapper: true,

            defaultCategory: 'Misc.',

            disableGit: false,
            disableSources: false,

            entryPoints: [
                // './src/ts/index.ts',
                './src/ts/classes/index.ts',
                './src/ts/functions/index.ts',
                './src/ts/types/index.ts',
            ],

            excludeInternal: true,
            excludeNotDocumented: false,
            excludePrivate: false,
            excludeProtected: false,
            excludeReferences: false,

            githubPages: true,

            groupOrder: [
                '*',
                'Functions',
                'Classes',
                'Namespaces',
                'Modules',
            ],
            groupReferencesByType: true,

            headings: {
                readme: false,
            },
            hideGenerator: true,
            hostedBaseUrl: homepage,

            includeHierarchySummary: true,
            includeVersion: false,

            // json: './dist/docs/javascript.TypeDoc.json',

            markdownLinkExternal: true,

            name: [
                this.fns.pkgTitle,
                this.fns.pkgVersion,
            ].filter( v => v ).join( ' @ ' ),

            navigationLinks: {
                'About': `${ homepage }/ReadMe.html`,
                'GitHub': repository,
                'by Maddi Mathon': 'https://www.maddimathon.com',
            },

            out: './docs',
            plugin: [
                'typedoc-plugin-inline-sources',
            ],

            projectDocuments: [
                'README.md',
                'CHANGELOG.md',
                'LICENSE.md',
            ],

            readme: 'none',
            router: 'structure',


            searchInComments: true,
            searchInDocuments: true,

            sidebarLinks: {
                // 'Class Hierarchy': `${ homepage }/hierarchy.html`,
            },

            sourceLinkTemplate: `${ repository }/blob/main/${ ( this.args.packaging && !this.args.dryrun ) ? this.fns.pkg.version + '/' : '' }{path}#L{line}`,
            sortEntryPoints: false,

            useFirstParagraphOfCommentAsSummary: true,

            visibilityFilters: {
                '@alpha': false,
                '@beta': true,
                external: true,
                inherited: true,
                private: false,
                protected: true,
            },
        };

        if ( config.out ) {
            this.verboseLog( 'deleting existing files...', 2 );

            const outDir = config.out.replace( /\/+$/gi, '' );

            this.fns.deleteFiles( [
                outDir + '/*',
                outDir + '/.*',
            ] );
        }

        if ( config.json ) {
            if ( !config.out ) {
                this.verboseLog( 'deleting existing files...', 2 );
            }
            this.fns.deleteFiles( config.json );
        }

        this.verboseLog( 'running typedoc...', 2 );
        const app: typeDoc.Application = await typeDoc.Application.bootstrapWithPlugins( config );

        // May be undefined if errors are encountered.
        const project: typeDoc.Models.ProjectReflection | undefined = await app.convert();

        // returns
        if ( !project ) {
            this.verboseLog( 'typedoc failed', 3 );
            return;
        }

        await app.generateOutputs( project );
    }
}