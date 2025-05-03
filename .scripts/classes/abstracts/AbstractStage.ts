/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
// import type { ChildProcess } from 'node:child_process';

import type {
    Types,
} from '../../@utilities.js';


/* IMPORT EXTERNAL DEPENDENCIES */
import { minify } from 'minify';
import * as prettier from "prettier";


/* IMPORT LOCAL DEPENDENCIES */
import { currentReplacements, pkgReplacements } from '../../vars/replacements.js';
import { F, BuildFunctions } from '../../@utilities.js';

import {
    // Types as TS,
    classes as cls,
    functions as fns,
} from '../../../src/ts/index.js';



/* # TYPES
 * ========================================================================== */

export type AbstractArgs<Stages extends string | never> = cls.abstracts.AbstractConfigurableClass.Args & {

    _: string[];

    /**
     * Passes --update param to sass when compiling; only compiles updates.
     */
    'css-update'?: boolean;

    /**
     * Only run this stage(s), else runs them all.
     */
    only?: Stages | Stages[];

    optsRecursive?: false;

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
     * Indicates that this is being done as part of the building script.
     */
    building?: boolean;

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
     * Indicates that this is being done as part of the releasing script - i.e.,
     * go full out and update all placeholders.
     */
    releasing?: boolean;

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
> extends cls.abstracts.AbstractConfigurableClass<Args> {

    public static get ARGS_ABSTRACT(): AbstractArgs<string> {

        return {
            _: [],
            optsRecursive: false,
        };
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public abstract stages: readonly Stages[];

    protected readonly fns: BuildFunctions;

    /**
     * Build a complete args object.
     */
    public buildArgs( args?: Partial<Args> ): Args {

        const optsRecursive = this.ARGS_DEFAULT.optsRecursive
            ?? AbstractStage.ARGS_ABSTRACT.optsRecursive;

        const mergedDefault = fns.mergeArgs(
            cls.abstracts.AbstractConfigurableClass.abstractArgs(
                AbstractStage.ARGS_ABSTRACT
            ),
            this.ARGS_DEFAULT,
            optsRecursive
        );

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return fns.mergeArgs( mergedDefault, args, optsRecursive );
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    constructor (
        args: Args,
        protected readonly clr: cls.MessageMaker.Colour = 'black',
    ) {
        super( args as Types.Objects.RecursivePartial<Args> & Args );

        this.fns = new BuildFunctions();
    }



    /* LOCAL METHODS
     * ====================================================================== */


    /* MESSAGES ===================================== */

    protected msgArgs(
        level: number = 0,
        msgArgs: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 1 ] = {},
        timeArgs: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 2 ] = {},
    ): {
        msg: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 1 ];
        time: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 2 ];
    } {
        const depth = level + Number( this.args[ 'log-base-level' ] ?? 0 );

        const msg = {

            bold: depth == 0 || level <= 1,
            clr: this.clr,

            depth,

            linesIn: 0,
            linesOut: 0,

            ...msgArgs,
        };

        const time = {
            ...timeArgs,
        };

        if ( level <= 0 ) {
            msg.linesIn = msgArgs.linesIn ?? 2;
        }

        if ( level > 0 ) {
            msg.linesIn = msgArgs.linesIn ?? 1;
        }

        // if ( level > 1 ) {
        // }

        if ( level > 2 ) {
            msg.italic = msgArgs.italic ?? true;
            msg.linesIn = msgArgs.linesIn ?? 0;
        }

        if ( level > 3 ) {
            msg.clr = msgArgs.clr ?? 'grey';
        }

        return { msg, time };
    }

    public progressLog(
        msg: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 0 ],
        level: number,
        _msgArgs: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 1 ] = {},
        _timeArgs: Parameters<cls.node.NodeConsole[ 'timestampLog' ]>[ 2 ] = {},
    ): void {
        if ( this.args[ 'progress' ] === false ) { return; }

        const {
            msg: msgArgs,
            time: timeArgs,
        } = this.msgArgs( level, _msgArgs, _timeArgs );

        this.fns.nc.timestampLog( msg, msgArgs, timeArgs );
    }

    public abstract startEndNotice( which: "start" | "end" ): Promise<void>;

    public verboseLog(
        msg: string,
        level: number,
        msgArgs: Parameters<typeof this.progressLog>[ 2 ] = {},
        timeArgs: Parameters<typeof this.progressLog>[ 3 ] = {},
    ): void {
        if ( !this.args[ 'verbose' ] ) { return; }
        this.progressLog( msg, level, msgArgs, timeArgs );
    }

    /**
     * Prints a notice message to the console to signal the start or end of a stage.
     * 
     * @see {@link cls.node.NodeConsole.timestampLog}  Function used to print to console.
     */
    protected startEndNoticeLog(
        which: "start" | "end" | string,
        startMsg: string,
        endMsg: string,
        defaultMsg: string,
        msgArgs: Parameters<typeof this.progressLog>[ 2 ] = {},
        timeArgs: Parameters<typeof this.progressLog>[ 3 ] = {},
    ): void {
        if ( this.args[ 'notice' ] === false ) { return; }

        const depth = ( this.args[ 'log-base-level' ] ?? 0 );

        let linesIn = msgArgs.linesIn ?? 2;
        let linesOut = msgArgs.linesOut ?? 0;

        let msg = defaultMsg;

        if ( which === 'start' ) {
            msg = startMsg;

            if ( depth < 1 ) {
                linesIn += 1;
            }

        } else if ( which === 'end' ) {
            msg = endMsg;
            linesOut += 1;

            if ( depth < 1 ) {
                linesOut += 1;
            }
        }

        msgArgs = {
            bold: true,
            clr: this.clr,
            italic: false,

            linesIn,
            linesOut,

            ...msgArgs,

            depth,
        };

        this.progressLog(
            [ [
                msg,
                { flag: true },
            ] ],
            depth,
            msgArgs,
            timeArgs,
        );
    }


    /* RUNNING ===================================== */

    public async run( args: Partial<Args> = {} ) {
        args = {
            ...this.args,
            ...args,
        };

        /* start */
        await this.startEndNotice( 'start' );

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
            }
        }

        /* end */
        await this.startEndNotice( 'end' );
    }

    /**
     * Used to run a single stage within this class; used by `run()`.
     */
    protected abstract runStage( stage: Stages ): Promise<void>;


    /* UTILITIES ===================================== */

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

        if ( !this.args[ 'css-update' ] ) {
            this.fns.deleteFiles( output );
        }

        const packaging: boolean | null = this.args.packaging || null;

        const update: boolean = Boolean( (
            this.args[ 'css-update' ]
            || this.args.watchedWatcher
            || this.args.watchedFilename
            || this.args.watchedEvent
        ) && !packaging );

        const args = {
            update: update ? true : null,
            quiet: this.args[ 'sass-quiet' ] ? true : null,
            'no-source-map': packaging ? true : null,
            'embed-sources': packaging ? null : true,
            trace: true,
            ...params,
        };

        this.verboseLog( `compiling ${ input } to ${ output }...`, 0 + logLevelBase );
        this.fns.cmd( `sass ${ input }:${ output } ${ this.cmdArgs( args ) }` );

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
        tsconfigPath: string,
        logLevelBase: number,
        params: CmdArgs = {},
    ): Promise<void> {
        this.verboseLog( `compiling typescript project ${ tsconfigPath }...`, 0 + logLevelBase );

        const tsconfig: Partial<{
            exclude: string | string[];
            include: string | string[];

            compilerOptions: Partial<{
                baseUrl: string;
                noEmit: boolean;
                outDir: string;
            }>;
        }> = JSON.parse( this.fns.readFile( tsconfigPath ) );

        // deleting current files
        if ( !this.args.watchedEvent && tsconfig.compilerOptions?.noEmit !== true ) {

            const outDir = tsconfig.compilerOptions?.outDir;

            if ( outDir ) {

                const tsconfigDir = tsconfigPath.replace( /\/[^\/]+\.json$/, '/' ).replace( /^[^\/]+\.json$/, './' );
                this.args.debug && this.progressLog( `tsconfigDir = ${ tsconfigDir }`, ( this.args.verbose ? 1 : 0 ) + logLevelBase );

                const outDirGlobs = this.fns.fs.pathRelative( this.fns.fs.pathResolve( tsconfigDir, outDir.replace( /(\/+\**)?$/, '' ) ) ) + '/**/*';

                this.verboseLog( `deleting current contents (${ outDirGlobs })...`, 1 + logLevelBase );
                this.fns.deleteFiles( outDirGlobs );
            }
        }

        const cmdParams: CmdArgs = {
            ...params,
            project: tsconfigPath,
        };

        this.verboseLog( 'running tsc...', 2 + logLevelBase );
        const tscCmd = `tsc ${ this.cmdArgs( cmdParams, true, false ) }`;

        this.args.debug && this.progressLog( tscCmd, ( this.args.verbose ? 3 : 2 ) + logLevelBase );
        this.fns.cmd( tscCmd );
    }

    protected async minify(
        path: string,
        parser: "css" | "html" | "js",
        logLevelBase: number,
    ) {
        this.args.debug && this.progressLog(
            `minifying ${ this.fns.fs.pathRelative( path ) } (${ parser })...`,
            0 + logLevelBase,
            {
                linesIn: 0,
                linesOut: 0,
            },
        );

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

            const content = this.fns.readFile( path );

            if ( content ) {
                const min = await minify[ parser ]( this.fns.readFile( path ), options );
                this.fns.writeFile( path, min, { force: true } );
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
            this.fns.readFile( target ),
            {
                ...defaultParams,
                ...params,
                filepath: undefined,
                parser,
                write: false,
            }
        );

        this.fns.writeFile( target, pretty, { force: true } );
    }

    protected replaceInFiles(
        files: string | string[],
        find: ( string | RegExp ) | ( string | RegExp )[],
        replace: string,
        logLevelBase: number,
        args: Partial<Omit<ReplaceInFilesArgs, "regex" | "replacement" | "string">> = {},
    ): void {
        this.args.debug && this.progressLog(
            `replacing '${ find }' => '${ replace }'`,
            logLevelBase,
            {
                linesIn: 0,
                linesOut: 0,
                maxWidth: null,
            },
        );

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

        this.args.debug && this.fns.nc.timestampVarDump( { cmd }, {
            clr: this.clr,
            depth: ( this.args.verbose ? 1 : 0 ) + logLevelBase + ( this.args[ 'log-base-level' ] ?? 0 ),
            linesIn: 0,
            linesOut: 0,
            maxWidth: null,
        } );

        this.fns.cmd( cmd );
    }
}