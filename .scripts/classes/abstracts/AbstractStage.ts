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
import type { ChildProcess } from 'node:child_process';

import type {
    RecursivePartial,
} from '../../@utilities.js';


/* IMPORT EXTERNAL DEPENDENCIES */
import { minify } from 'minify';
import * as prettier from "prettier";


/* IMPORT LOCAL DEPENDENCIES */
import { currentReplacements, pkgReplacements } from '../../vars/replacements.js';
import { F, Functions } from '../../@utilities.js';



/* # TYPES
 * ========================================================================== */

export interface AbstractArgs<Stages extends string | never> extends Partial<Functions.Opts> {

    _: string[];

    /**
     * Passes --update param to sass when compiling; only compiles updates.
     */
    'css-update'?: boolean;

    /**
     * Only run this stage(s), else runs them all.
     */
    only?: Stages | Stages[];

    /**
     * Passes --quiet param to sass when compiling; quiets output.
     */
    'sass-quiet'?: boolean;

    /**
     * Exclude this stage(s), else runs them all.
     */
    without?: Stages | Stages[];


    /* ## LOG MESSAGES ===================================== */

    /**
     * Display extra information that could be helpful for debugging scripts.
     */
    debug?: boolean;

    /**
     * The minimum log level to output.
     */
    'log-base-level'?: number;

    /**
     * Display notice when starting/ending.
     */
    notice?: boolean;

    /**
     * Display progress update messages after initial notice.
     */
    progress?: boolean;

    /**
     * Display extra status updates.
     */
    verbose?: boolean;


    /* ## STAGE FLAGS ===================================== */
    /* these are values used to indicate that another build script is being run */

    /**
     * Indicates a package/release dry-run - i.e., make no irreversable changes.
     */
    dryrun?: boolean;

    /**
     * Indicates that this is being done as part of the packaging script - i.e.,
     * go full out.
     */
    packaging?: boolean;

    /**
     * Indicates that this is being done as just before the start or watch scripts.
     */
    starting?: boolean;


    /* ### Watching-Related ------------------ */

    /**
     * Event name that triggered a watch event.
     */
    watchedEvent?: string;

    /**
     * File that triggered a watch event.
     */
    watchedFilename?: string;

    /**
     * Watcher script that triggered a watch event.
     */
    watchedWatcher?: string;
};

export type CmdArgs = { [ key: string ]: boolean | number | string | null; };

export type ReplaceInFilesArgs = CmdArgs & {
    regex?: RegExp | RegExp[];
    string?: string | string[];
    replacement: string;
    'ignore-case': true | null;
    'no-glob': true | null;
};



/* # CLASS
 * ========================================================================== */

export abstract class AbstractStage<
    Stages extends string | never,
    Args extends AbstractArgs<Stages>,
//@ts-expect-error
> extends Functions<Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public abstract stages: readonly Stages[];



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor ( args: Args ) {
        super( args as RecursivePartial<Args> & Args );
    }



    /* LOCAL METHODS
     * ====================================================================== */


    /* MESSAGES ===================================== */

    public override progressLog(
        msg: string,
        level: number,
    ): void {
        if ( this.opts[ 'progress' ] === false ) { return; }

        super.progressLog(
            msg,
            level + Number( this.opts[ 'log-base-level' ] ?? 0 ),
        );
    }

    public abstract startEndNotice( which: "start" | "end" ): void;

    public verboseLog(
        msg: string,
        level: number,
    ): void {
        if ( this.opts[ 'verbose' ] !== true ) { return; }

        this.progressLog( msg, level );
    }

    protected startEndNoticeMaker(
        which: "start" | "end" | string,
        startMsg: string,
        endMsg: string,
        defaultMsg: string,
    ) {
        if ( this.opts[ 'notice' ] === false ) { return; }

        switch ( which ) {

            case 'start':
                if ( ( this.opts[ 'log-base-level' ] ?? 0 ) > 0 ) {
                    console.log( '' );
                }
                this.progressLog( startMsg, 0 );
                break;

            case 'end':
                this.progressLog( endMsg, 0 );
                console.log( '' );
                break;

            default:
                this.progressLog( defaultMsg, 0 );
                break;
        }
    }

    protected subStageSeparator(): void {
        console.log( '' );
    }


    /* RUNNING ===================================== */

    public async run( args: Partial<Args> = {} ) {
        args = {
            ...this.opts,
            ...args,
        };

        /* start */
        this.startEndNotice( 'start' );

        /* loop through the steps in order */
        for ( const method of this.stages ) {

            const include: boolean = Boolean(
                !args.only
                || args.only == method
                || args.only.includes( method )
            );

            const exclude: boolean = Boolean(
                args.without
                && ( args.without == method || args.without.includes( method ) )
            );

            if ( include && !exclude && this[ method as keyof typeof this ] ) {
                await this.runStage( method );
                ( this.opts.verbose || this.opts.debug ) && this.subStageSeparator();
            }
        }

        /* end */
        this.startEndNotice( 'end' );
    }

    /**
     * Used to run a single stage within this class; used by `run()`.
     */
    protected abstract runStage( stage: Stages ): Promise<void>;


    /* UTILITIES ===================================== */

    public override async acmd( ...params: Parameters<Functions[ 'acmd' ]> ): Promise<ChildProcess | void> {
        return super.acmd( ...params );
    }

    public override cmd( ...params: Parameters<Functions[ 'cmd' ]> ): void {
        super.cmd( ...params );
    }

    protected cmdArgs(
        obj: CmdArgs,
        literalFalse: boolean = false,
        equals: boolean = true,
    ): string {

        const arr: string[] = [];

        const sep: " " | "=" = equals ? '=' : ' ';

        for ( const key in obj ) {

            if (
                obj[ key ] === null
                || typeof obj[ key ] === 'undefined'
                || obj[ key ] === undefined
            ) {
                continue;
            }

            switch ( typeof obj[ key ] ) {

                case 'boolean':
                    if ( obj[ key ] ) {
                        arr.push( `--${ key }` );
                    } else if ( literalFalse ) {
                        arr.push( `--${ key }${ sep }false` );
                    } else {
                        arr.push( `--no-${ key }` );
                    }
                    continue;

                case 'number':
                    arr.push( `--${ key }${ sep }${ obj[ key ] }` );
                    continue;

                case 'string':
                    arr.push( `--${ key }${ sep }"${ obj[ key ] }"` );
                    continue;
            }
        }

        return arr.join( ' ' );
    }


    /* Building Tools ------------------ */

    public async catchErrCLI( fn: Function, logLevelBase: number, ) {
        try {
            await fn();
        } catch ( err ) {
            // nodeErrorCLI( err as NodeError, 1 + logLevelBase );
        }
    }

    protected async compileScss(
        input: string,
        output: string,
        logLevelBase: number,
        params: CmdArgs = {},
    ): Promise<void> {

        if ( !this.opts[ 'css-update' ] ) {
            this.deleteFiles( output );
        }

        const packaging: boolean | null = this.opts.packaging || null;

        const update: boolean = Boolean( (
            this.opts[ 'css-update' ]
            || this.opts.watchedWatcher
            || this.opts.watchedFilename
            || this.opts.watchedEvent
        ) && !packaging );

        const args = {
            update: update ? true : null,
            quiet: this.opts[ 'sass-quiet' ] ? true : null,
            'no-source-map': packaging ? true : null,
            'embed-sources': packaging ? null : true,
            trace: true,
            ...params,
        };

        this.verboseLog( `compiling ${ input } to ${ output }...`, 0 + logLevelBase );
        this.cmd( `sass ${ input }:${ output } ${ this.cmdArgs( args ) }` );

        for ( const o of currentReplacements( F ).concat( pkgReplacements( F ) ) ) {
            this.replaceInFiles(
                output,
                o.find,
                o.replace,
                1 + logLevelBase,
            );
        }
    }

    protected async compileTypescript(
        _tsconfigPath: string,
        logLevelBase: number,
        params: CmdArgs = {},
    ): Promise<void> {
        const tsconfigPath = _tsconfigPath;
        this.verboseLog( `compiling typescript project ${ tsconfigPath }...`, 0 + logLevelBase );

        const tsconfig: Partial<{
            exclude: string | string[];
            include: string | string[];

            compilerOptions: Partial<{
                baseUrl: string;
                noEmit: boolean;
                outDir: string;
            }>;
        }> = JSON.parse( this.readFile( tsconfigPath ) );

        // deleting current files
        if ( tsconfig.compilerOptions?.noEmit !== true ) {

            const outDir = tsconfig.compilerOptions?.outDir;

            if ( outDir ) {

                const tsconfigDir = tsconfigPath.replace( /\/[^\/]+\.json$/, '/' ).replace( /^[^\/]+\.json$/, './' );
                this.opts.debug && this.progressLog( `tsconfigDir = ${ tsconfigDir }`, ( this.opts.verbose ? 1 : 0 ) + logLevelBase );

                const outDirGlobs = this.pathRelative( this.pathResolve( tsconfigDir, outDir.replace( /(\/+\**)?$/, '' ) ) ) + '/**/*';

                this.verboseLog( `deleting current contents (${ outDirGlobs })...`, 1 + logLevelBase );
                this.deleteFiles( outDirGlobs );
            }
        }

        const args: CmdArgs = { ...params };

        this.verboseLog( 'running tsc...', 2 + logLevelBase );
        this.cmd( `tsc --project ${ tsconfigPath } ${ this.cmdArgs( args ) }` );
    }

    protected async minify(
        path: string,
        parser: "css" | "html" | "js",
        logLevelBase: number,
    ) {
        this.verboseLog( `minifying ${ this.pathRelative( path ) } (${ parser })...`, 0 + logLevelBase );

        let options = {};

        switch ( parser ) {

            case 'css':
                const uglyCSS = async () =>
                    await this.prettier( path, 'css', 1 + logLevelBase, {
                        printWidth: 10000,
                        tabWidth: 0,
                    } );

                await this.catchErrCLI( uglyCSS, 1 + logLevelBase );
                break;

            case 'html':
                options = {
                    collapseBooleanAttributes: false,
                    removeEmptyAttributes: false,
                    removeRedundantAttributes: false,
                    removeComments: false,
                    removeAttributeQuotes: false,
                    removeEmptyElements: false,
                    removeOptionalTags: false,
                    removeScriptTypeAttributes: false,
                    removeStyleLinkTypeAttributes: false,
                    useShortDoctype: false,
                    minifyJS: true,
                    minifyCSS: true,
                };
                break;

            case 'js':
                options = {
                    type: 'putout',
                    putout: {
                        mangle: false,
                        mangleClassNames: false,
                        removeConsole: true,
                        removeUnusedVariables: false,
                        removeUselessSpread: false,
                    },
                };
                break;
        }

        await this.catchErrCLI( async () => {

            const content = this.readFile( path );

            if ( content ) {
                const min = await minify[ parser ]( this.readFile( path ), options );
                this.writeFile( path, min, { force: true } );
            }
        }, 1 + logLevelBase );
    }

    protected async prettier(
        target: string,
        parser: NonNullable<prettier.Options[ 'parser' ]>,
        logLevelBase: number,
        params: Omit<prettier.Options, "parser"> = {},
    ): Promise<void> {
        this.verboseLog( `prettifying ${ target } (${ parser })...`, 0 + logLevelBase );

        let defaultParams: prettier.Options = {
            arrowParens: 'always',
            bracketSameLine: false,
            bracketSpacing: true,
            htmlWhitespaceSensitivity: 'strict',
            printWidth: 80,
            proseWrap: 'always',
            quoteProps: 'preserve',
            semi: true,
            singleAttributePerLine: true,
            singleQuote: true,
            tabWidth: 4,
            trailingComma: 'all',
            useTabs: false,
        };

        switch ( parser ) {

            case 'css':
                defaultParams = {
                    ...defaultParams,
                    singleQuote: false,
                };
                break;

            case 'html':
                defaultParams = {
                    ...defaultParams,
                    printWidth: 10000,
                };
                break;

            // case 'scss':
            //     defaultParams = {
            //         ...defaultParams,
            //     };
            //     break;
        }

        const pretty = await prettier.format(
            this.readFile( target ),
            {
                ...defaultParams,
                ...params,
                filepath: undefined,
                parser,
                write: false,
            }
        );

        this.writeFile( target, pretty, { force: true } );
    }

    protected replaceInFiles(
        files: string | string[],
        find: ( string | RegExp ) | ( string | RegExp )[],
        replace: string,
        logLevelBase: number,
        args: Partial<Omit<ReplaceInFilesArgs, "regex" | "replacement" | "string">> = {},
    ): void {
        this.verboseLog( `replacing '${ find }' => '${ replace }'`, logLevelBase );

        const cmdArgs: ReplaceInFilesArgs = {
            replacement: replace,
            'ignore-case': null,
            'no-glob': null,
            ...args,
        };

        const filesArr: ( string | RegExp )[] = Array.isArray( files ) ? files : [ files ];

        const findArr: ( string | RegExp )[] = Array.isArray( find ) ? find : [ find ];

        const findArgs: string = findArr.map( ( f ) => {

            if ( f instanceof RegExp ) {
                f = f.source;
            }
            return `--regex='${ f }'`;
        } ).join( ' ' );

        const cmd: string = `replace-in-files ${ findArgs } ${ this.cmdArgs( cmdArgs ) } '${ filesArr.join( "' '" ) }'`;
        this.opts.debug && this.progressLog(
            JSON.stringify( { cmd } ),
            ( this.opts.verbose ? 1 : 0 ) + logLevelBase,
        );

        this.cmd( cmd );
    }
}