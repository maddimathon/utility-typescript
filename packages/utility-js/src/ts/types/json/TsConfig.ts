/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * A valid TsConfig object.
 * 
 * Updated 2024-02-11 from {@link https://www.typescriptlang.org/tsconfig | TS docs}.
 * 
 * @since 2.0.0-alpha
 * @since ___PKG_VERSION___ — Moved to new architechture.
 */
export interface TsConfig {

    extends?: string | string[];
    files?: string[] | false;
    include?: string | string[];
    exclude?: string[];

    /** {@inheritDoc TsConfig.CompilerOpts} */
    compilerOptions?: TsConfig.CompilerOpts;

    /** 
     * @see {@link https://www.typescriptlang.org/tsconfig#watch-options | TS docs}
     */
    watchOptions?: {
        watchFile?: "fixedpollinginterval" | "prioritypollinginterval" | "dynamicprioritypolling" | "fixedchunksizepolling" | "usefsevents" | "usefseventsonparentdirectory";
        watchDirectory?: "usefsevents" | "fixedpollinginterval" | "dynamicprioritypolling" | "fixedchunksizepolling";
        fallbackPolling?: "fixedinterval" | "priorityinterval" | "dynamicpriority" | "fixedchunksize ";
        synchronousWatchDirectory?: boolean;
        excludeDirectories?: string[];
        excludeFiles?: string[];
    };

    /** 
     * @see {@link https://www.typescriptlang.org/tsconfig#type-acquisition | TS docs}
     */
    typeAcquisition?: {
        enable?: boolean;
        include?: string[];
        exclude?: string[];
        disableFilenameBasedTypeAcquisition?: boolean;
    };
}

/**
 * Utility types used by {@link TsConfig} interface.
 * 
 * @since 2.0.0-alpha
 * @since ___PKG_VERSION___ — Moved to new architechture.
 */
export namespace TsConfig {

    /**
     * Value of the {@link TsConfig.compilerOptions} property.
     * 
     * @see {@link https://www.typescriptlang.org/tsconfig#compiler-options | TS docs}
     * 
     * @since 2.0.0-alpha
     */
    export interface CompilerOpts {

        /*
         * Type Checking
         * @see {@link https://www.typescriptlang.org/tsconfig#Type_Checking_6248}
         */
        allowUnreachableCode?: boolean | undefined;
        allowUnusedLabels?: boolean | undefined;
        alwaysStrict?: boolean;
        exactOptionalPropertyTypes?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitOverride?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noPropertyAccessFromIndexSignature?: boolean;
        noUncheckedIndexedAccess?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        strict?: boolean;
        strictBindCallApply?: boolean;
        strictFunctionTypes?: boolean;
        strictNullChecks?: boolean;
        strictPropertyInitialization?: boolean;
        useUnknownInCatchVariables?: boolean;

        /*
         * Modules 
         * @see {@link https://www.typescriptlang.org/tsconfig#Modules_6244}
         */
        allowArbitraryExtensions?: boolean;
        allowImportingTsExtensions?: boolean;
        allowUmdGlobalAccess?: boolean;
        baseUrl?: string;
        customConditions?: string[];

        module?: CompilerOpts.Module | Lowercase<CompilerOpts.Module> | Capitalize<Lowercase<CompilerOpts.Module>> | Uppercase<CompilerOpts.Module>;

        moduleResolution?: CompilerOpts.ModuleResolution | Lowercase<CompilerOpts.ModuleResolution> | Capitalize<Lowercase<CompilerOpts.ModuleResolution>> | Uppercase<CompilerOpts.ModuleResolution>;

        moduleSuffixes?: string[];
        noResolve?: boolean;
        paths?: {
            [ key: string ]: string[] | string[];
        };
        resolveJsonModule?: boolean;
        resolvePackageJsonExports?: boolean;
        resolvePackageJsonImports?: boolean;
        rootDir?: string;
        rootDirs?: string[];
        typeRoots?: string[];
        types?: string[];

        /*
         * Emit 
         * @see {@link https://www.typescriptlang.org/tsconfig#Emit_6246}
         */
        declaration?: boolean;
        declarationDir?: string;
        declarationMap?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDeclarationOnly?: boolean;
        importHelpers?: boolean;
        importsNotUsedAsValues?: "remove" | "preserve" | "error";
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        mapRoot?: string;
        newLine?: "crlf" | "lf";
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        outDir?: string;
        outFile?: string;
        preserveConstEnums?: boolean;
        preserveValueImports?: boolean;
        removeComments?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        stripInternal?: boolean;

        /*
         * JavaScript Support 
         * @see {@link https://www.typescriptlang.org/tsconfig#JavaScript_Support_6247}
         */
        allowJs?: boolean;
        checkJs?: boolean;
        maxNodeModuleJsDepth?: number;

        /*
         * Editor Support 
         * @see {@link https://www.typescriptlang.org/tsconfig#Editor_Support_6249}
         */
        disableSizeLimit?: boolean;
        plugin?: string[];

        /*
         * Interop Constraints 
         * @see {@link https://www.typescriptlang.org/tsconfig#Interop_Constraints_6252}
         */
        allowSyntheticDefaultImports?: boolean;
        esModuleInterop?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        isolatedModules?: boolean;
        preserveSymlinks?: boolean;
        verbatimModuleSyntax?: boolean;

        /*
         * Backwards Compatibility 
         * @see {@link https://www.typescriptlang.org/tsconfig#Backwards_Compatibility_6253}
         */
        charset?: "utf8" | "utf16";
        keyofStringsOnly?: boolean;
        noImplicitUseStrict?: boolean;
        noStrictGenericChecks?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;

        /*
         * Language and Environment 
         * @see {@link https://www.typescriptlang.org/tsconfig#Language_and_Environment_6254}
         */
        emitDecoratorMetadata?: boolean;
        experimentalDecorators?: boolean;
        jsx?: "preserve" | "react" | "react-native" | "react-jsx" | "react-jsxdev";
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        jsxImportSource?: string;

        lib?:
        | CompilerOpts.Lib | Lowercase<CompilerOpts.Lib> | Capitalize<Lowercase<CompilerOpts.Lib>> | Uppercase<CompilerOpts.Lib>
        | ( CompilerOpts.Lib | Lowercase<CompilerOpts.Lib> | Capitalize<Lowercase<CompilerOpts.Lib>> | Uppercase<CompilerOpts.Lib> )[];

        moduleDetection?: "legacy" | "auto" | "forced";
        noLib?: boolean;
        reactNamespace?: string;
        target?: CompilerOpts.Target | Lowercase<CompilerOpts.Target> | Capitalize<Lowercase<CompilerOpts.Target>> | Uppercase<CompilerOpts.Target>;
        useDefineForClassFields?: boolean;

        /*
         * Compiler Diagnostics 
         * @see {@link https://www.typescriptlang.org/tsconfig#Compiler_Diagnostics_6251}
         */
        explainFiles?: boolean;
        extendedDiagnostics?: boolean;
        generateCpuProfile?: string;
        listEmittedFiles?: boolean;
        listFiles?: boolean;
        traceResolution?: boolean;

        /*
         * Projects 
         * @see {@link https://www.typescriptlang.org/tsconfig#Projects_6255}
         */
        composite?: boolean;
        disableReferencedProjectLoad?: boolean;
        disableSolutionSearching?: boolean;
        disableSourceOfProjectReferenceRedirect?: boolean;
        incremental?: boolean;
        tsBuildInfoFile?: string;

        /*
         * Output Formatting 
         * @see {@link https://www.typescriptlang.org/tsconfig#Output_Formatting_6256}
         */
        noErrorTruncation?: boolean;
        preserveWatchOutput?: boolean;
        pretty?: boolean;

        /*
         * Completeness 
         * @see {@link https://www.typescriptlang.org/tsconfig#Completeness_6257}
         */
        skipLibCheck?: boolean;

        /*
         * Command Line 
         * @see {@link https://www.typescriptlang.org/tsconfig#Command_line_Options_6171}
         */

        /*
         * Watch Options 
         * @see {@link https://www.typescriptlang.org/tsconfig#Watch_and_Build_Modes_6250}
         */
        assumeChangesOnlyAffectDirectDependencies?: boolean;
    };

    /**
     * Utility types used in the {@link Compiler} interface.
     * 
     * @since 2.0.0-alpha
     */
    export namespace CompilerOpts {

        /**
         * Library strings.
         * 
         * @since 2.0.0-alpha
         */
        export type Lib =
            | "ES5" | "ES2015" | "ES6" | "ES2016" | "ES7" | "ES2017" | "ES2018"
            | "ES2019" | "ES2020" | "ES2021" | "ES2022" | "ESNext" | "DOM"
            | "WebWorker" | "ScriptHost";

        /**
         * Module strings.
         * 
         * @since 2.0.0-alpha
         */
        export type Module =
            | "none" | "CommonJs" | "AMD" | "UMD" | "System" | "ES2015" | "ES6"
            | "ES2020" | "ES2022" | "ESNext" | "Node16" | "Node18" | "NodeNext";

        /**
         * Module resolution strings.
         * 
         * @since 2.0.0-alpha
         */
        export type ModuleResolution =
            | "Classic" | "Node10" | "Node" | "Node16" | "NodeNext" | "Bundler";

        /**
         * Target strings.
         * 
         * @since 2.0.0-alpha
         */
        export type Target =
            | "ES3" | "ES5" | "ES2015" | "ES6" | "ES2016" | "ES2017" | "ES2018"
            | "ES2019" | "ES2020" | "ES2021" | "ES2022" | "ESNext";
    };
}