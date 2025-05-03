#!/usr/bin/env tsx
'use strict';
/**
 * Some utility functions to use while building the project.
 * 
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 */

import {
    exec as nodeExec,
    execSync as nodeExecSync,
} from 'child_process';

import type { WriteFileOptions } from 'node:fs';
import NodeFS from 'node:fs';

import NodePath from 'node:path';

import { ChildProcess } from 'node:child_process';

import type { GlobOptions } from 'glob';
import { globSync } from 'glob';

import { DateTime } from 'luxon';

import type * as U from '../@utilities.js';

import {
    classes as cls,
    // functions as fns,
} from '../../src/ts/index.js';


export class BuildFunctions extends cls.node.NodeFunctions {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public override get ARGS_DEFAULT(): BuildFunctions.Args {

        return {

            optsRecursive: true,

            dryrun: false,
            packaging: false,
            releasing: false,

            copyFilesOpts: {
                ignoreGlobs: [],
                includeDefaultIgnoreGlobs: true,
            },

            formats: {
                date: {
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                },
                time: {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    // second: '2-digit',
                },
            },

            globOpts: {
                absolute: true,
                dot: true,
                ignore: [
                    '**/._*',
                    '**/._*/**/*',
                    '**/.DS_STORE',
                    '**/.smbdelete*',
                    '**/.smbdelete*/**/*',
                ],
                realpath: true,
            },

            lang: 'en-CA',

            paths: {
                cacheDir: './.scripts/.cache',
                packageJson: './package.json',
            },

            pkgName: p => `${ p.name }@${ p.version }`,

            readDirOpts: {
                encoding: 'utf-8',
                recursive: true,
            },
            readFileOpts: {
                encoding: 'utf-8',
                flag: undefined,
            },

            root: NodePath.resolve( './' ),

            tabCharacter: ' ',
            tabWidth: 4,

            typeOfOpts: {
                distinguishArrays: false,
            },

            writeFileOpts: {
                force: false,
                rename: false,
                opts: {
                    encoding: 'utf-8',
                },
            },
        };
    }

    public override readonly args: BuildFunctions.Args;



    /** CONSTRUCTOR
     ** ==================================================================== **/

    constructor (
        args?: Partial<BuildFunctions.Args>,
        utils?: ConstructorParameters<typeof cls.node.NodeFunctions>[ 1 ],
    ) {
        super( args, utils );
        this.args = this.buildArgs( args ) as BuildFunctions.Args;
    }



    /** ALIASES
     ** Aliases for built-in functions/expressions.
     ** ==================================================================== **/


    /** Glob ==================================== **/

    /**
     * Alias for `globSync()`.
     * 
     * @param relative  Whether relative paths should be returned.
     */
    public glob(
        globs: string | string[],
        opts: GlobOptions & { filesOnly?: boolean; } = {},
        relative: boolean = false,
    ): string[] {

        const globResult = globSync( globs, this.mergeArgs(
            this.args.globOpts as U.Types.ArgsObject,
            opts as U.Types.ArgsObject,
            false
        ) ) as string | string[];

        let filepaths: string[] = (
            Array.isArray( globResult )
                ? globResult
                : [ globResult ]
        ).sort();

        if ( opts.filesOnly ) {
            filepaths = filepaths.filter(
                path => NodeFS.lstatSync( this.fs.pathResolve( path ) ).isFile()
            );
        }

        return relative ? filepaths.map(
            ( path ) => this.fs.pathRelative( path )
        ) : filepaths;
    }


    /** NodeFS ==================================== **/

    /**
     * Deletes globbed files.
     * 
     * @param glob      
     * @param globOpts  
     */
    public deleteFiles(
        glob: string | string[],
        globOpts: GlobOptions = {},
        dryRun: boolean = false
    ): void {

        const paths = this.glob( glob, globOpts, false );

        for ( const path of paths ) {

            if ( !NodeFS.existsSync( path ) ) { continue; }

            const stat = NodeFS.statSync( path );

            if ( stat.isDirectory() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting directory: ' + path );
                } else {
                    NodeFS.rmSync( path, { recursive: true, force: true } );
                }

            } else if ( stat.isFile() || stat.isSymbolicLink() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting file: ' + path );
                } else {
                    NodeFS.unlinkSync( path );
                }
            }
        }
    }

    /**
     * Reads a file.
     * 
     * @param _path     
     * @param _opts     
     * 
     * @return  Contents of the file.
     */
    public readFile(
        _path: string,
        _opts: Partial<BuildFunctions.ReadFileOpts> = {},
    ): string {
        const path = this.fs.pathResolve( _path );

        const opts: BuildFunctions.ReadFileOpts
            = this.mergeArgs(
                this.args.readFileOpts,
                {
                    ..._opts,
                    encoding: 'utf-8',
                } as Partial<BuildFunctions.ReadFileOpts> & { encoding: 'utf-8'; },
            );

        /**
         * RETURN
         */
        return NodeFS.readFileSync( path, opts );
    }

    /**
     * Writes a file.
     * 
     * @param _path     
     * @param _content  
     * @param _opts     
     * 
     * @return  Path to file if written, or false on failure.
     */
    public writeFile(
        _path: string,
        _content: string | string[],
        _opts: Partial<BuildFunctions.WriteFileOpts> = {},
    ): string | false {

        const content: string = Array.isArray( _content )
            ? _content.join( '\n' )
            : _content;

        const opts: BuildFunctions.WriteFileOpts = this.mergeArgs(
            this.args.writeFileOpts as U.Types.ArgsObject,
            _opts as U.Types.ArgsObject,
            true
        ) as BuildFunctions.WriteFileOpts;

        const path = !opts.force && opts.rename
            ? this.fs.uniquePath( this.fs.pathResolve( _path ) )
            : this.fs.pathResolve( _path );

        /**
         * Write the file
         */
        if ( !opts.force && NodeFS.existsSync( path ) ) { return false; }

        NodeFS.mkdirSync( NodePath.dirname( path ), { recursive: true } );

        NodeFS.writeFileSync(
            this.fs.pathResolve( path ),
            content,
            opts.opts
        );

        /**
         * RETURN
         */
        return NodeFS.existsSync( path ) ? path : false;
    }



    /** FILE UTILITIES
     ** ==================================================================== **/

    /**
     * Copies globbedFiles from one directory to another.
     * 
     * @param _glob         
     * @param _destination  Destination directory.
     * @param _source       Source directory.
     * @param _opts         
     */
    public copyFiles(
        _glob: string | string[],
        _destination: string,
        _source: string = this.args.root,
        _opts: Partial<BuildFunctions.CopyFilesOpts> = {}
    ): void {
        if ( !Array.isArray( _glob ) ) { _glob = [ _glob ]; }

        // I prefer them as constants
        const [ glob, destination, source ] = [ _glob, _destination, _source ];

        const opts: BuildFunctions.CopyFilesOpts
            = this.mergeArgs(
                this.args.copyFilesOpts,
                _opts
            );

        /** 
         * Resolved versions of the directory paths with trailing slashes.
         */
        const resolved = {
            destination: this.fs.pathResolve( destination ).replace( /\/*$/gi, '/' ),
            source: this.fs.pathResolve( source ).replace( /\/*$/gi, '/' ),
        };

        const ignoreGlobs: string[] = opts.includeDefaultIgnoreGlobs ? [
            ...opts.ignoreGlobs,
        ] : opts.ignoreGlobs;
        ignoreGlobs.push( '**/._*' );

        // Uses NodePath because the resolved paths have already gone through this.fs.pathResolve()
        const globbedFiles: string[] = this.glob(
            glob.map( g => NodePath.resolve( resolved.source, g ) ),
            {
                ignore: ignoreGlobs.map( g => NodePath.resolve( resolved.source, g ) ),
            }
        );

        // const ignoreFiles = this.glob( opts.ignoreGlobs, { root: resolved.source, ignore: [], } );

        /**
         * Write the files.
         */
        for ( const file of globbedFiles ) {
            // if ( ignoreFiles.includes( file ) ) { continue; }

            const destFile = file
                .replace(
                    new RegExp( '^' + this.fns.escRegExp( resolved.source ), 'gi' ),
                    this.fns.escRegExpReplace( resolved.destination )
                )
                .replace( /\/+$/gi, '' );

            const destDirectory = NodePath.dirname( destFile );

            const stats = NodeFS.statSync( file );

            if ( stats.isDirectory() ) {

                NodeFS.mkdirSync( destDirectory, { recursive: true } );
                // this.copyFiles(
                //     '*',
                //     destFile,
                //     file,
                // );

            } else {
                NodeFS.mkdirSync( destDirectory, { recursive: true } );
                NodeFS.copyFileSync( file, destFile );
            }
        }
    }



    /** META UTILITIES
     ** ==================================================================== **/

    /** 
     * An object of the project’s pacakge.json file.
     */
    #pkg: U.Types.PackageJson | undefined = undefined;

    /** 
     * An object of the project’s pacakge.json file.
     */
    public get pkg(): U.Types.PackageJson {

        if ( this.#pkg === undefined ) {
            this.#pkg = JSON.parse(
                this.readFile( this.args.paths.packageJson )
            ) as U.Types.PackageJson;
        }

        return this.#pkg;
    }

    public get pkgVersion(): string {
        return `${ this.pkg.version }${ this.args.dryrun ? '-draft' : '' }`;
    }

    #releasePath: string | undefined = undefined;

    public get releasePath(): string {

        if ( this.#releasePath === undefined ) {

            this.#releasePath = this.fs.pathRelative( this.fs.pathResolve(
                this.pkg.config.paths.releases,
                `${ this.pkg.name.replace( /^@([^\/]+)\//, '$1_' ) }@${ this.pkgVersion.replace( /^(tpl|template)-/gi, '' ).replace( /\./gi, '-' ) }`
            ) );
        }

        return this.#releasePath;
    }



    /** OBJECT MANIPULATION
     ** ==================================================================== **/

    /**
     * Joins string arrays with a single new line and adds an indent to the
     * beginning of every line, and adds next level of indent for child arrays.
     *
     * @param lines   
     * @param indent  Optional. Default `this.tab`.
     *
     * @return  The same text, but with an indent added after every new line.
     *
     * @see this.tab  Default for `indent` param.
     */
    protected implodeWithIndent(
        lines: ( string | string[] )[],
        indent: string = this.tab,
    ): string {

        return lines.map( ( line ) => {

            switch ( this.fns.typeOf( line, { distinguishArrays: true, } ) ) {

                case 'array':
                    return this.implodeWithIndent(
                        line as string[],
                        indent + this.tab
                    );

                case 'string':
                    return indent + line;

                default:
                    return indent + String( line );
            }
        } ).flat().join( `\n` );
    }



    /** PRE-FORMATTED STRINGS
     ** ==================================================================== **/

    /** 
     * To use for tabs/indents based on this.args values.
     */
    protected get tab(): string {
        return this.args.tabCharacter.repeat( this.args.tabWidth );
    }

    /**
     * A predictably-formatted datestamp.
     * 
     * @param date  Optional. Default is a new Date object.
     * 
     * @return
     */
    public datestamp(
        date: Date | null = null,
        format: string | null = null,
    ): string {
        return DateTime.fromJSDate( date ?? new Date() ).toFormat( format ?? 'yyyy-MM-dd' );
    }

    /**
     * A predictably-formatted datetimestamp.
     * 
     * @param date  Optional. Default is a new Date object.
     * 
     * @return
     */
    public datetimestamp(
        date: Date | null = null,
        format: string | null = null,
    ): string {
        return DateTime.fromJSDate( date ?? new Date() ).toFormat( format ?? 'yyyy-MM-dd hh:mm' );
    }

    /**
     * A predictably-formatted timestamp.
     * 
     * @param date  Optional. Default is a new Date object.
     * 
     * @return
     */
    public timestamp(
        date: Date | null = null,
        format: string | null = null,
    ): string {
        return DateTime.fromJSDate( date ?? new Date() ).toFormat( format ?? 'hh:mm' );
    }



    /** # SHELL COMMANDS
     ** ==================================================================== **/

    /**
     * Outputs given error to console.
     */
    private _cmdErr( err: {
        status: number,
        signal: number | null,
        output: string[],
        pid: number,
        stdout: string,
        stderr: string,
    } ) {

        const output: string =
            err.output
                ? this.implodeWithIndent( err.output.filter( ( l ) => l !== null ) )
                : Object.keys( err )
                    .map( ( key ) => `${ key }: ${ err[ key as keyof typeof err ] }` )
                    .join( '\n' );

        console.log( 'Console error:' + output, );
        process.exit( 1 );
    }

    /**
     * Runs given string as a terminal command.
     */
    public cmd( cmd: string ) {
        try {
            nodeExecSync( cmd, {
                encoding: 'utf-8',
            } );
        } catch ( err ) {
            this._cmdErr( err as Parameters<typeof this._cmdErr>[ 0 ] );
        }
    }

    /**
     * Runs given string as an async terminal command.
     */
    public async acmd( cmd: string ): Promise<ChildProcess | void> {
        try {
            nodeExec( cmd, {
                encoding: 'utf-8',
            } );
        } catch ( err ) {
            this._cmdErr( err as Parameters<typeof this._cmdErr>[ 0 ] );
        }
    }
}

export namespace BuildFunctions {

    export type Args = cls.node.NodeFunctions.Args & {
        dryrun: boolean;
        packaging: boolean;
        releasing: boolean;

        copyFilesOpts: CopyFilesOpts,

        /** For printing Date objects */
        formats: {
            date: Intl.DateTimeFormatOptions;
            // datetime: Intl.DateTimeFormatOptions;
            time: Intl.DateTimeFormatOptions;
        };

        globOpts: GlobOptions,

        /** Language code to use for content */
        lang: U.Types.StringLiterals.LangCode | U.Types.StringLiterals.LangLocaleCode;

        /**
         * Paths to important files/dirs used by this class.
         */
        paths: {
            /**
             * Cache directory to use while building.
             */
            cacheDir: string;
            packageJson: string;
        };

        /**
         * Function that returns the string to use for folders/zips while packaging.
         */
        pkgName: ( pkg: U.Types.PackageJson ) => string;

        readDirOpts: ReadDirOpts,
        readFileOpts: ReadFileOpts,

        root: string,

        tabWidth: number;
        tabCharacter: string;

        /** For the typeOf() method. */
        typeOfOpts: {
            /** If true, arrays will return `'array'` instead of `'object'`. */
            distinguishArrays: boolean;
        };

        writeFileOpts: WriteFileOpts,
    };

    type OptsPartialKeys = "copyFilesOpts" | "globOpts" | "readDirOpts" | "readFileOpts" | "typeOfOpts" | "writeFileOpts";

    export type Opts_Partial = Partial<Omit<Args, OptsPartialKeys>> & {
        [ K in OptsPartialKeys ]?: Partial<Args[ K ]>;
    };

    /** For notices */
    export type BuildStage =
        | "compile"
        | "build"
        | "dryrun"
        | "package"
        | "setup"
        | "start"
        | "watch";

    /** Default options for `copyFiles()`. */
    export type CopyFilesOpts = {

        /** Default globs to ignore when dealing with files. */
        ignoreGlobs: string[],

        /** Whether to include the default ignoreGlobs. */
        includeDefaultIgnoreGlobs: boolean,
    };

    export type ReadDirOpts = {
        encoding: BufferEncoding;
        recursive: boolean;
    };

    export type ReadFileOpts = {
        encoding: BufferEncoding;
        flag?: string | undefined;
    };

    /** Default options for `writeFile()`. */
    export type WriteFileOpts = {

        /** Overwrite file at destination if it exists. */
        force: boolean,

        /** If a file exists at destination, append a number to the file’s basename so it’s unique. */
        rename: boolean,

        /** Value to pass to the node write file function. */
        opts: WriteFileOptions,
    };
}