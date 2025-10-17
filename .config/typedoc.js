// @ts-check

import * as typeDoc from "typedoc";

const homepage = 'https://maddimathon.github.io/utility-js';

const repository = 'https://github.com/maddimathon/utility-js.git';

/** @type { { [ key: string ]: string; } } */
const navigationLinks = {
    'GitHub': repository,
    'by Maddi Mathon': 'https://www.maddimathon.com',
};

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {

    blockTags: [
        ...typeDoc.OptionDefaults.blockTags,

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

    // categorizeByGroup: true,

    categoryOrder: [
        'Documentation',
        '*',
        'Other',
        'Internal',
        'Deprecated',
    ],

    customFooterHtml: `<p>Copyright <a href="https://www.maddimathon.com" target="_blank">Maddi Mathon</a>, 2024.</p><p>Site generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a>.</p>`,
    customFooterHtmlDisableWrapper: true,

    disableGit: false,
    disableSources: false,

    entryPoints: [
        '../packages/utility-build/src/ts/index.ts',
        '../packages/utility-node/src/ts/index.ts',
        '../packages/utility-js/src/ts/index.ts',
    ],

    excludeInternal: false,
    excludeNotDocumented: false,
    excludePrivate: false,
    excludeProtected: false,
    excludeReferences: false,

    externalSymbolLinkMappings: {

        glob: {
            GlobOptions: 'https://github.com/search?q=repo%3Aisaacs%2Fnode-glob+path%3A%2F%5Esrc%5C%2F%2F+symbol%3AGlobOptions&type=code',
        },

        global: {
            'Error.name': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name',
        },

        minify: {
            Options: 'https://github.com/search?q=repo%3ADefinitelyTyped%2FDefinitelyTyped+path%3A%2F%5Etypes%5C%2Fminify%5C%2F%2F+symbol%3AOptions&type=code',
        },

        postcss: {
            'postcss.process': 'https://postcss.org/api/#processor-process',

            'postcss.Parser': 'https://postcss.org/api/#postcss-parser',
            'postcss.SourceMapOptions': 'https://postcss.org/api/#sourcemapoptions',
            'postcss.Syntax': 'https://postcss.org/api/#syntax',
        },

        prettier: {
            Options: 'https://prettier.io/docs/options',
        },

        sass: {
            Options: 'https://sass-lang.com/documentation/js-api/interfaces/options/',
        },

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

    hideGenerator: true,

    highlightLanguages: [
        ...typeDoc.OptionDefaults.highlightLanguages,

        'astro',
        'csv',
        'handlebars',
        'jsx',
        'latex',
        'markdown',
        'md',
        'php',
        'regex',
        'regexp',
        'sass',
        'scss',
        'sh',
        'shell',
        'shellscript',
        'sql',
        'swift',
        'tsv',
        'vue-html',
        'vue',
        'xml',
        'yaml',
        'yml',
        'zsh',
    ],

    hostedBaseUrl: homepage,

    jsDocCompatibility: {
        exampleTag: false,
    },

    includeVersion: false,

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

    name: 'NPM Utility Libraries',

    // navigation: {
    //     includeCategories: true,
    //     includeGroups: false,
    // },

    navigationLinks,

    notRenderedTags: [
        ...typeDoc.OptionDefaults.notRenderedTags,

        '@TODO',
        '@UPGRADE',
    ],

    out: '../docs',
    plugin: [
        'typedoc-plugin-inline-sources',
    ],

    projectDocuments: [
        '../README.md',
    ],

    readme: 'none',
    router: 'structure',

    searchInComments: true,
    searchInDocuments: true,

    sourceLinkExternal: true,
    sourceLinkTemplate: `${ repository }/blob/main/{path}#L{line}`,

    sort: [
        'documents-first',
        'static-first',
        'required-first',
        'kind',
        'visibility',
        'alphabetical',
    ],

    tsconfig: '../src/docs/tsconfig.json',

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

export default config;