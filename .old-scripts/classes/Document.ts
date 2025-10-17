/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import * as typeDoc from "typedoc";


import { AbstractStage } from './abstracts/AbstractStage.js';

import {
    currentReplacements,
    pkgReplacements,
} from '../vars/replacements.js';
// import { Doc_Project } from './doc/Doc_Project.js';


const docSubStages = [
    'ts',
    'replace',
] as const;


export class Document extends AbstractStage<Document.Stages, Document.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public subStages = docSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
        } as Document.Args;
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
        const config: Partial<typeDoc.TypeDocOptions> = {

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

            categorizeByGroup: true,

            categoryOrder: [
                '*',
                'Other',
                'Misc.',
                'Deprecated',
            ],

            // compilerOptions,

            customFooterHtml: `<p>Copyright <a href="https://www.maddimathon.com" target="_blank">Maddi Mathon</a>, 2025. <a href="${ homepage }/MIT_License.html">MIT license</a>.</p><p>Site generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a>.</p>`,
            customFooterHtmlDisableWrapper: true,

            defaultCategory: 'Misc.',

            disableGit: false,
            disableSources: false,

            entryPoints: [
                'src/ts/classes/index.ts',
                'src/ts/functions/index.ts',
                'src/ts/types/index.ts',
            ],

            entryPointStrategy: 'expand',

            excludeInternal: false,
            excludeNotDocumented: false,
            excludePrivate: false,
            excludeProtected: false,
            excludeReferences: false,

            externalSymbolLinkMappings: {

                typescript: {

                    Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
                    'Error.cause': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause',
                    'Error.name': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name',

                    Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
                    RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',

                    Awaited: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype',
                    Capitalize: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
                    ConstructorParameters: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype',
                    Exclude: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers',
                    Extract: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union',
                    InstanceType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype',
                    Lowercase: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
                    NoInfer: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype',
                    NonNullable: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype',
                    Omit: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
                    OmitThisParameter: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype',
                    Parameters: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype',
                    Partial: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
                    Pick: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys',
                    Record: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
                    Required: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype',
                    ReturnType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype',
                    ThisParameterType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype',
                    ThisType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype',
                    Uncapitalize: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
                    Uppercase: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
                },
            },

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
            groupReferencesByType: true,

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

            navigationLinks: {
                'GitHub': repository,
                'by Maddi Mathon': 'https://www.maddimathon.com',
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

            projectDocuments: [
                'README.md',
                'CHANGELOG.md',
                'LICENSE.md',
            ],

            readme: 'none',
            router: 'structure',

            searchInComments: true,
            searchInDocuments: true,

            sourceLinkExternal: true,
            sourceLinkTemplate: `${ repository }/blob/main/${ ( this.args.packaging && !this.args.dryrun ) ? encodeURI( this.pkg.version ) + '/' : '' }{path}#L{line}`,

            sort: [
                'documents-first',
                'static-first',
                'required-first',
                'kind',
                'visibility',
                'alphabetical',
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
        };

        if ( config.out ) {
            this.verboseLog( 'deleting existing files...', 2 );

            const outDir = config.out.replace( /\/+$/gi, '' );

            this.fs.delete( this.glob( [
                outDir + '/*',
                outDir + '/.*',
            ] ) );
        }

        if ( config.json ) {
            if ( !config.out ) {
                this.verboseLog( 'deleting existing files...', 2 );
            }
            this.fs.delete( [ config.json ] );
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

export namespace Document {

    export type Args = AbstractStage.Args<Document.Stages> & {
    };

    export type Stages = typeof docSubStages[ number ];
}