/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (https://www.maddimathon.com/web)
 * 
 * @license MIT
 */

import * as typeDoc from "typedoc";

import { AbstractStage } from './abstracts/AbstractStage.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';

import { TypeDocUtils } from '../../src/ts/node/functions/TypeDocUtils.js';


const docSubStages = [
    'ts',
    'replace',
] as const;


export class Document extends AbstractStage<Document.Stages, Document.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public readonly subStages = docSubStages;

    public get ARGS_DEFAULT() {
        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as Document.Args;
    }

    public get typeDocMappings() {

        return {
            global: TypeDocUtils.Mappings.global,
            typescript: {
                ...TypeDocUtils.Mappings.global,
                ...TypeDocUtils.Mappings.typescript,
            },
        };
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: Document.Args ) {
        super( args, 'turquoise' );
    }



    /* LOCAL METHODS
     * ====================================================================== */

    protected async runSubStage( stage: Document.Stages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

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

        for ( const o of currentReplacements( this ).concat( pkgReplacements( this ) ) ) {
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
        const homepage = this.pkg.homepage.replace( /\/+$/gi, '' );

        /** URL to repository, without trailing slash or `.git`. */
        const repository = this.pkg.repository.url.replace( /(\/+|\.git)$/gi, '' );

        // UPGRADE - generate entryPoints from pkg.main and pkg.exports
        const entryPoints = [
            'src/ts/index.ts',
            'src/ts/node/index.ts',
            'src/ts/types/index.ts',
        ];

        const config = {
            alwaysCreateEntryPointModule: true,

            basePath: 'src/ts',

            blockTags: [
                ...typeDoc.OptionDefaults.blockTags,

                '@source',
                '@TODO',
                '@UPGRADE',
            ],

            cascadedModifierTags: [
                ...typeDoc.OptionDefaults.cascadedModifierTags,

                '@alpha',
                '@beta',
                '@experimental',
                '@internal',
            ],

            categorizeByGroup: false,

            categoryOrder: [
                'Docs',
                'Documentation',
                'Default Endpoint',
                'Secondary Endpoints',
                'Exports',
                'Modules',
                'Submodules',
                '*',
                'Other',
                'Misc.',
                'Deprecated',
            ],

            // compilerOptions,

            customFooterHtml: `<p>&copy; <a href="https://www.maddimathon.com/web" target="_blank">Maddi Mathon</a>, 2025–${ new Date().getFullYear() }. <a href="${ homepage }/MIT_License.html">MIT license</a>.</p><p>Site generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a>.</p>`,
            customFooterHtmlDisableWrapper: true,

            defaultCategory: 'Misc.',

            disableGit: false,
            disableSources: false,

            entryPoints,
            entryPointStrategy: 'expand',

            excludeInternal: false,
            excludeNotDocumented: false,
            excludePrivate: false,
            excludeProtected: false,
            excludeReferences: false,

            externalSymbolLinkMappings: this.typeDocMappings,

            githubPages: true,

            groupOrder: [
                '*',
                'Documents',
                'Constructors',
                'Properties',
                'Accessors',
                'Functions',
                'Methods',
                'Classes',
                'Interfaces',
                'Type Aliases',
                'Namespaces',
                'Modules',
            ],
            groupReferencesByType: false,

            headings: {
                readme: false,
            },
            hideGenerator: true,
            hostedBaseUrl: homepage,

            includeHierarchySummary: true,
            includeVersion: false,

            jsDocCompatibility: {
                exampleTag: false,
            },

            // json: 'src/docs/typedoc.json',

            kindSortOrder: [
                'Module',
                'Constructor',
                'Property',
                'Variable',
                'Function',
                'Accessor',
                'Method',
                'Enum',
                'EnumMember',
                'Class',
                'Interface',
                'TypeAlias',
                'TypeLiteral',
                'Namespace',

                'Reference',
                'Project',

                'Parameter',
                'TypeParameter',
                'CallSignature',
                'ConstructorSignature',
                'IndexSignature',
                'GetSignature',
                'SetSignature',
            ],

            markdownLinkExternal: true,

            name: [
                this.pkg.config.title,
                this.pkgVersion,
            ].filter( v => v ).join( ' @ ' ),

            navigation: {
                includeCategories: true,
                // includeGroups: true,
                includeFolders: true,
                compactFolders: true,
                // excludeReferences: true,
            },

            navigationLeaves: [
                'types.FromEntries',
                // 'types!FromEntries.Internal',
                // 'types!FromEntries.TuplifyUnion',
            ],

            navigationLinks: {
                'GitHub': repository,
                'by Maddi Mathon': 'https://www.maddimathon.com/web',
            },

            notRenderedTags: [
                ...typeDoc.OptionDefaults.notRenderedTags,

                '@TODO',
                '@UPGRADE',
            ],

            out: 'docs',
            plugin: [
                'typedoc-plugin-inline-sources',
            ],

            preserveLinkText: true,

            projectDocuments: [
                'README.md',
                'CHANGELOG.md',
                'LICENSE.md',
            ],

            readme: 'none',
            router: 'structure',

            searchInComments: true,
            searchInDocuments: true,

            skipErrorChecking: true,

            sourceLinkExternal: true,
            sourceLinkTemplate: `${ repository }/blob/main/${ ( this.args.packaging && !this.args.dryrun ) ? encodeURI( this.pkg.version ) + '/' : '' }{path}#L{line}`,

            sort: [
                'documents-first',
                'static-first',
                'required-first',
                'visibility',
                'alphabetical',
                'kind',
            ],
            sortEntryPoints: false,

            tsconfig: 'src/ts/tsconfig.json',

            useFirstParagraphOfCommentAsSummary: true,

            visibilityFilters: {
                '@alpha': !this.args.releasing || !!this.args.dryrun,
                '@beta': true,
                external: true,
                inherited: true,
                private: !this.args.releasing || !!this.args.dryrun,
                protected: true,
            },
        } as const satisfies typeDoc.Configuration.TypeDocOptions;

        if ( config.out ) {
            this.verboseLog( 'deleting existing files...', 2 );

            const outDir = config.out.replace( /\/+$/gi, '' );

            this.fs.delete( this.glob( [
                outDir + '/*',
                outDir + '/.*',
            ] ) );
        }

        // if ( config.json ) {
        //     if ( !config.out ) {
        //         this.verboseLog( 'deleting existing files...', 2 );
        //     }
        //     this.fs.delete( [ config.json ] );
        // }

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

export namespace Document {

    export type Args = AbstractStage.Args<Document.Stages> & {
    };

    export type Stages = typeof docSubStages[ number ];
}