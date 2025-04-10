/**
 * @package @maddimathon/template-npm-library@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 * 
 * @since ___PKG_VERSION___
 */


/* IMPORT TYPES */
// import type { TypeDump } from '../@utilities.js';
import type { AbstractArgs } from './abstracts/AbstractStage.js';
import type { Functions } from './Functions.js';


/* IMPORT EXTERNAL DEPENDENCIES */
import * as typeDoc from "typedoc";
import * as typeDocPlugin_MD from "typedoc-plugin-markdown";


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

type LocalTypeDocOptions =
    Pick<
        Required<typeDoc.TypeDocOptions & typeDocPlugin_MD.PluginOptions>,
        "json"
    >
    & Partial<typeDoc.TypeDocOptions & typeDocPlugin_MD.PluginOptions>;



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

        const siteTitle = [
            this.pkgTitle,
            this.pkgVersion,
        ].filter( v => v ).join( ' @ ' );

        // TODO - generate entryPoints from pkg.main and pkg.exports
        const config: LocalTypeDocOptions = {

            blockTags: [
                ...typeDoc.OptionDefaults.blockTags,

                '@homepage',
                '@package',
            ],

            // categorizeByGroup: true,

            categoryOrder: [
                '*',
                'Misc.',
                'Exports',
                'Partial Exports',
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
            groupReferencesByType: true,

            headings: {
                readme: false,
            },
            hideGenerator: true,
            hostedBaseUrl: this.pkg.homepage,

            // includeHierarchySummary: true,
            includeVersion: false,

            json: './dist/docs/javascript.TypeDoc.json',

            markdownLinkExternal: true,

            // name: [
            //     this.pkgName.replace( /^@maddimathon\//gi, '' ),
            //     this.pkgVersion,
            // ].filter( v => v ).join( ' @ ' ),
            name: siteTitle,

            // navigation: {
            // },

            navigationLinks: {
                'GitHub': this.pkg.repository.url,
                'by Maddi Mathon': 'https://www.maddimathon.com',
            },

            out: './docs',
            plugin: [
                'typedoc-github-theme',
                // 'typedoc-plugin-markdown',
            ],

            // projectDocuments: [
            //     'README.md',
            // ],

            // readme: 'none',
            // router: 'kind',
            // router: 'member',
            // router: 'structure',

            searchInComments: true,
            searchInDocuments: true,

            // sidebarLinks: {
            //     // [ siteTitle ]: '/index.html',
            //     // 'Hierarchy': '/hierarchy.html',
            // },

            sortEntryPoints: false,
            theme: 'typedoc-github-theme',
            useFirstParagraphOfCommentAsSummary: true,

            visibilityFilters: {
                '@alpha': false,
                '@beta': false,
                external: true,
                inherited: true,
                private: false,
                protected: true,
            },


            // typedoc-plugin-markdown options
            // entryFileName: 'index',
            // expandParameters: true,
            // hideBreadcrumbs: true,
            // hidePageHeader: true,
            // modulesFileName: 'entry-points',
            // sanitizeComments: true,
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

        this.verboseLog( 'running tsdoc...', 2 );
        const app: typeDoc.Application = await typeDoc.Application.bootstrapWithPlugins( config );

        // May be undefined if errors are encountered.
        const project: typeDoc.Models.ProjectReflection | undefined = await app.convert();

        // returns
        if ( !project ) {
            this.verboseLog( 'tsdoc failed', 3 );
            return;
        }

        await app.generateOutputs( project );

        // const typeDocJson = JSON.parse( this.readFile( config.json ) ) as ( '' | null | undefined | typeDoc.JSONOutput.ProjectReflection );

        // // returns
        // if ( !typeDocJson ) {
        //     this.verboseLog( 'tsdoc json export empty', 3 );
        //     return;
        // }

        // const docsProject = new Doc_Project( typeDocJson, {
        //     'log-level-base': ( this.opts.verbose ? 3 : 2 ) + ( this.opts[ 'log-base-level' ] ?? 0 ),
        // } );

        // this.deleteFiles( 'src/docs/content/js.json' );
        // this.writeFile( 'src/docs/content/js.json', JSON.stringify( docsProject, null, 4 ) );
    }
}