/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Only for {@link PackageJson}.
 */
export interface PackageJson_Overrides {
    [ key: string ]: string | PackageJson_Overrides;
};

/**
 * The general shape of most package.json (npm) files.
 * 
 * Taken from {@link https://docs.npmjs.com/cli/v11/configuring-npm/package-json | NPM docs}.
 * Last updated 2025-05-14.
 * 
 * @since 2.0.0-alpha
 * 
 * @UPGRADE  Add in proper doc blocks for more of the properties.
 */
export interface PackageJson {

    /**
     * Name of the package.
     * 
     * > Some rules:
     * 
     * > The name must be less than or equal to 214 characters. This includes the scope for scoped packages.
     * 
     * > The names of scoped packages can begin with a dot or an underscore. This is not permitted without a scope.
     * 
     * > New packages must not have uppercase letters in the name.
     * 
     * > The name ends up being part of a URL, an argument on the command line, and a folder name. Therefore, the name can't contain any non-URL-safe characters
     */
    name: string;

    /**
     * Current package version.
     *
     * > Version must be parseable by {@link https://github.com/npm/node-semver | node-semver}, which is bundled with npm as a dependency.
     */
    version: string;

    description?: string;

    keywords?: string[];

    homepage?: string;

    bugs?: {
        url?: string;
        email?: string;
    };

    license?: string;

    author?: string | { name: string; email?: string; url?: string; };

    contributors?: Required<PackageJson>[ 'author' ][];

    funding?: string | { type: string; url: string; } | ( string | { type: string; url: string; } )[];

    files?: string[];
    main?: string;
    browser?: string;

    bin?: string | { [ key: string ]: string; };

    man?: string | string[];

    directories?: { [ key: string ]: string; };

    repository?: string | { type: string; url: string; directory?: string; };

    scripts?: { [ key: string ]: string; };

    config?: { [ key: number | string ]: any; };

    dependencies?: { [ key: string ]: string; };
    devDependencies?: { [ key: string ]: string; };

    peerDependencies?: { [ key: string ]: string; };
    peerDependenciesMeta?: { [ key: string ]: { [ key: string ]: string; }; };

    bundleDependencies?: string[];
    optionalDependencies?: { [ key: string ]: string; };

    overrides?: PackageJson_Overrides;

    engines?: { [ key: string ]: string; };
    os?: string[];
    cpu?: string[];

    private?: boolean;
    publishConfig?: { [ key: string ]: boolean | number | string; };
    workspaces?: string[];
};