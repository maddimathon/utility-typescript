/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';
import type { Functions } from './Functions.js';


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
    'sass',
    'astro',
    'replace',
] as const;



/* # CLASS
 * ========================================================================== */

export class Document extends AbstractStage<DocumentStages, DocumentArgs> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public stages = docStages;



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: DocumentArgs ) {
        super( args );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runStage( stage: DocumentStages ) {
        await this[ stage ]();
    }

    public startEndNotice( which: "start" | "end" | string ): void {

        this.startEndNoticeMaker(
            which,
            `DOCUMENTATION ${ which.toUpperCase() }ING`,
            `DOCUMENTATION FINISHED`,
            `${ which.toUpperCase() }ING DOCUMENTATION`,
        );
    }



    /* STAGE METHODS
     * ====================================================================== */

    protected async astro() {
        this.progressLog( '(NOT IMPLEMENTED) building docs website (astro)...', 1 );
    }

    protected async replace() {
        this.progressLog( 'replacing placeholders...', 1 );

        for ( const o of currentReplacements( this as Functions ).concat( pkgReplacements( this as Functions ) ) ) {
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

    protected async sass() {
        this.progressLog( '(NOT IMPLEMENTED) documenting sass...', 1 );
    }

    protected async ts() {
        this.progressLog( 'documenting typescript...', 1 );

        // TODO - generate entryPoints from pkg.main and pkg.exports
        const config: Partial<typeDoc.TypeDocOptions> = {

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

            customFooterHtml: `<p>Copyright <a href="https://www.maddimathon.com" target="_blank">Maddi Mathon</a>, 2025. MIT license.</p><p>Site generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a>.</p>`,
            customFooterHtmlDisableWrapper: true,

            defaultCategory: 'Misc.',

            entryPoints: [
                './src/ts/index.ts',
                './src/ts/classes/index.ts',
                './src/ts/functions/index.ts',
                './src/ts/types/index.ts',
            ],

            excludeInternal: false,
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
            hostedBaseUrl: this.pkg.homepage,

            includeVersion: false,

            // json: './dist/docs/javascript.TypeDoc.json',

            markdownLinkExternal: true,

            name: [
                this.pkgTitle,
                this.pkgVersion,
            ].filter( v => v ).join( ' @ ' ),

            // navigation: {
            // },

            navigationLinks: {
                'GitHub': this.pkg.repository.url,
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

            // sidebarLinks: {
            // },

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

            this.deleteFiles( [
                outDir + '/*',
                outDir + '/.*',
            ] );
        }

        if ( config.json ) {
            if ( !config.out ) {
                this.verboseLog( 'deleting existing files...', 2 );
            }
            this.deleteFiles( config.json );
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