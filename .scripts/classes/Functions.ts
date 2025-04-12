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

import type { GlobOptions } from 'glob';
import { globSync } from 'glob';

import { DateTime } from 'luxon';

import type * as U from '../@utilities.js';

import {
    escRegExp,
    escRegExpReplace,
    mergeArgs,
    slugify,
    toTitleCase,
    typeOf,
} from '../../src/ts/functions/index.js';


export namespace Functions {

    export type Opts = {

        ansiEscape: string;

        /** Colour codes that I like for each colour. */
        ansiColours: {
            [ C in U.Types.ColourSlug ]: string;
        };

        copyFilesOpts: Functions.CopyFilesOpts,

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

        readDirOpts: Functions.ReadDirOpts,
        readFileOpts: Functions.ReadFileOpts,

        root: string,

        tabWidth: number;
        tabCharacter: string;

        /** For the typeOf() method. */
        typeOfOpts: {
            /** If true, arrays will return `'array'` instead of `'object'`. */
            distinguishArrays: boolean;
        };

        writeFileOpts: Functions.WriteFileOpts,
    } & U.Types.ArgsObject;

    type OptsPartialKeys = "copyFilesOpts" | "globOpts" | "readDirOpts" | "readFileOpts" | "typeOfOpts" | "writeFileOpts";

    export type Opts_Partial = Partial<Omit<Opts, OptsPartialKeys>> & {
        [ K in OptsPartialKeys ]?: Partial<Opts[ K ]>;
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

import { ChildProcess } from 'node:child_process';
import { RecursivePartial } from 'src/ts/types/objects/basics.js';

export class Functions<
    Opts extends ( { [ key: string ]: any; } & Functions.Opts ) = Functions.Opts,
    Opts_Partial extends ( Partial<Functions.Opts> | Functions.Opts_Partial ) = Functions.Opts_Partial,
> {

    protected _opts?: Opts = undefined;

    protected set opts( input: U.Types.Objects.RecursivePartial<Opts> ) {
        if (
            typeof this._opts !== 'undefined'
            && this._opts !== undefined
        ) { return; }

        this._opts = this.mergeArgs( this.opts, input, true );
    }

    public get opts(): Opts {
        if (
            typeof this._opts !== 'undefined'
            && this._opts !== undefined
        ) { return this._opts; }

        //@ts-expect-error
        return {

            ansiColours: {
                red: "2;165;44;50",
                orange: "2;147;63;34",
                yellow: "2;122;80;0",
                green: "2;24;103;31",
                turquoise: "2;4;98;76",
                blue: "2;45;91;134",
                purple: "2;121;60;150",
                pink: "2;143;56;114",
                grey: "2;91;87;88",

                white: "2;245;245;245",
                black: "2;51;51;51",
            },
            ansiEscape: '\x1b',

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



    /** CONSTRUCTOR
     ** ==================================================================== **/

    // @ts-expect-error
    constructor ( opts: Opts_Partial = {} ) {
        // @ts-expect-error
        this.opts = opts;
    }



    /** ALIASES
     ** Aliases for built-in functions/expressions.
     ** ==================================================================== **/

    /**
     * Alias for `typeof` keyword, but with added options: "class", "NaN", "null".
     */
    protected typeOf<T extends typeOf.TestType>(
        variable: T,
        _opts: Partial<typeOf.Args> = {},
    ): string & typeOf.Return<T> {
        return typeOf( variable );
    }


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
            this.opts.globOpts as U.Types.ArgsObject,
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
                path => NodeFS.lstatSync( this.pathResolve( path ) ).isFile()
            );
        }

        return relative ? filepaths.map(
            ( path ) => this.pathRelative( path )
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
                    console.log( 'deleting directory: ' + path );
                } else {
                    NodeFS.rmSync( path, { recursive: true, force: true } );
                }

            } else if ( stat.isFile() || stat.isSymbolicLink() ) {

                if ( dryRun ) {
                    console.log( 'deleting file: ' + path );
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
        _opts: Partial<Functions.ReadFileOpts> = {},
    ): string {
        const path = this.pathResolve( _path );

        const opts: Functions.ReadFileOpts = this.mergeArgs(
            this.opts.readFileOpts,
            {
                ..._opts,
                encoding: 'utf-8',
            } as Partial<Functions.ReadFileOpts> & { encoding: 'utf-8'; },
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
        _opts: Partial<Functions.WriteFileOpts> = {},
    ): string | false {

        const content: string = Array.isArray( _content )
            ? _content.join( '\n' )
            : _content;

        const opts: Functions.WriteFileOpts = this.parseArgs(
            this.opts.writeFileOpts as U.Types.ArgsObject,
            _opts as U.Types.ArgsObject,
            true
        ) as Functions.WriteFileOpts;

        const path = !opts.force && opts.rename
            ? this.uniquePath( this.pathResolve( _path ) )
            : this.pathResolve( _path );

        /**
         * Write the file
         */
        if ( !opts.force && NodeFS.existsSync( path ) ) { return false; }

        NodeFS.mkdirSync( NodePath.dirname( path ), { recursive: true } );

        NodeFS.writeFileSync(
            this.pathResolve( path ),
            content,
            opts.opts
        );

        /**
         * RETURN
         */
        return NodeFS.existsSync( path ) ? path : false;
    }


    /** NodePath ==================================== **/

    /**
     * Returns relative paths, based on the root defined the the opts.
     * 
     * @param path  Path to make relative. Passed through this.pathResolve() first.
     */
    public pathRelative( path: string ): string {
        return NodePath.relative( this.pathResolve(), this.pathResolve( path ) );
    }

    /**
     * Resolves relative to the root defined the the opts.
     */
    public pathResolve( ...paths: string[] ): string {
        return NodePath.resolve( this.opts.root, ...paths );
    }



    /** FILE UTILITIES
     ** ==================================================================== **/

    /**
     * Changes just the file name of a path
     * 
     * @param path     
     * @param newName  
     * 
     * @return  Full path with updated basename.
     */
    protected _changeBaseName(
        path: string,
        newName: string
    ): string {

        return this.pathResolve(
            NodePath.dirname( path ),
            newName
        );
    }

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
        _source: string = this.opts.root,
        _opts: Partial<Functions.CopyFilesOpts> = {}
    ): void {
        if ( !Array.isArray( _glob ) ) { _glob = [ _glob ]; }

        // I prefer them as constants
        const [ glob, destination, source ] = [ _glob, _destination, _source ];

        // @ts-expect-error
        const opts: Functions.CopyFilesOpts
            = this.parseArgs(
                this.opts.copyFilesOpts,
                _opts
            );

        /** 
         * Resolved versions of the directory paths with trailing slashes.
         */
        const resolved = {
            destination: this.pathResolve( destination ).replace( /\/*$/gi, '/' ),
            source: this.pathResolve( source ).replace( /\/*$/gi, '/' ),
        };

        const ignoreGlobs: string[] = opts.includeDefaultIgnoreGlobs ? [
            ...opts.ignoreGlobs,
        ] : opts.ignoreGlobs;
        ignoreGlobs.push( '**/._*' );

        // Uses NodePath because the resolved paths have already gone through this.pathResolve()
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
                    new RegExp( '^' + this.escRegExp( resolved.source ), 'gi' ),
                    this.escRegExpReplace( resolved.destination )
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

    /**
     * Returns a unique version of the inputPath (i.e., where no file exists) by
     * appending a number.
     *
     * @return  A unique version of the given inputPath.
     */
    public uniquePath( _path: string ): string {
        if ( !NodeFS.existsSync( _path ) ) { return _path; }
        const inputPath: typeof _path = _path;

        /** @var pathExtension  This file’s extension. */
        const pathExtension: string = NodePath.extname( inputPath );

        /** @var copyIndex  Copy index - a number to append to OG name */
        let copyIndex = 1;

        /** @var uniqueFileName */
        let uniqueFileName = NodePath.basename(
            inputPath,
            pathExtension || undefined
        ) + `-${ copyIndex }${ pathExtension }`;

        /** 
         * Iterate the index until the inputPath is unique
         */
        while ( NodeFS.existsSync(
            this._changeBaseName( inputPath, uniqueFileName )
        ) ) {

            uniqueFileName = uniqueFileName.replace(
                new RegExp(
                    `-${ copyIndex }${ this.escRegExp( pathExtension ) }$`,
                    'gi'
                ),
                `-${ copyIndex + 1 }${ this.escRegExpReplace( pathExtension ) }`
            );
            copyIndex++;
        }

        /** RETURN **/
        return this._changeBaseName( inputPath, uniqueFileName );
    }



    /** CACHING
     ** ==================================================================== **/

    /** 
     * Resolves subpath & returns absolute path in cache.
     * 
     * @param subPath  Relative to the cache directory set in opts.
     * 
     * @return  Absolute path.
     */
    protected _cachePath( subPath: string ): string {
        return this.pathResolve( this.opts.paths.cacheDir, subPath );
    }

    /**
     * Writes information to a file in the cache directory.
     * 
     * @param name   Cache name to use.
     * @param value  Value to cache, as a string.
     * 
     * @return  Path to the cache or false on failure.
     */
    public cacheSet( name: string, value: string ): string | false {

        return this.writeFile(
            this._cachePath( `${ name }.txt` ),
            value,
            { force: true, rename: false, }
        );
    }

    /**
     * Gets information from a file in the cache directory.
     * 
     * @param name  Cache name to get.
     * 
     * @return  Contents of the cache or null if none exists.
     */
    public cacheGet( name: string ): string | null {

        const path = this._cachePath( `${ name }.txt` );

        if ( !NodeFS.existsSync( path ) ) { return null; }

        return this.readFile( path );
    }

    /**
     * @param name  Cache name to delete.
     */
    public cacheDel( name: string ): void {
        return this.deleteFiles( this._cachePath( `${ name }.txt` ) );
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
            this.#pkg = JSON.parse( this.readFile( this.opts.paths.packageJson ) ) as U.Types.PackageJson;
        }

        return this.#pkg;
    }

    /**
     * The package slug as defined in package.json.
     */
    #pkgName: string | undefined = undefined;

    /**
     * The package slug as defined in package.json.
     */
    public get pkgName(): string {

        if ( this.#pkgName === undefined ) {
            this.#pkgName = this.pkg.name;
        }

        return this.#pkgName;
    }

    /**
     * A readable name for the package in sentence case.
     */
    #pkgTitle: string | undefined = undefined;

    /**
     * A readable name for the package in sentence case.
     */
    public get pkgTitle(): string {

        if ( this.#pkgTitle === undefined ) {
            this.#pkgTitle = this.pkg.config.title;
        }

        return this.#pkgTitle;
    }

    public get pkgVersion(): string {
        const suffix: string = ( this.opts.dryrun || ( !this.opts.packaging && !this.opts.releasing ) ) ? '-draft' : '';
        return `${ this.pkg.version }${ suffix }`;
    }

    #releasePath: string | undefined = undefined;

    public get releasePath(): string {

        if ( this.#releasePath === undefined ) {

            this.#releasePath = this.pathRelative( this.pathResolve(
                this.pkg.config.paths.releases,
                `${ this.pkgName.replace( /^@([^\/]+)\//, '$1_' ) }@${ this.pkgVersion.replace( /^(tpl|template)-/gi, '' ).replace( /\./gi, '-' ) }`
            ) );
        }

        return this.#releasePath;
    }

    public progressLog(
        msg: string,
        level: number = 0,
    ): void {

        // if ( level <= 0 ) { console.log( '' ); }
        if ( level <= 1 ) { console.log( '' ); }

        const timestamp = `[${ DateTime.now().toFormat( 'HH:mm' ) }] `;

        const indent: string = ' '.repeat( level * timestamp.length );

        // const lineWidth: number = 80 - timestamp.length;

        // const lineWidthRegex: RegExp = RegExp( `(?<=^(.{${ lineWidth }})+)`, 'gi' );

        // const lines: string[] = msg.split( /\n/g ).map( line => line.split( lineWidthRegex ) ).flat();

        const lines: string[] = msg.split( /\n/g );

        const joiner: string = '\n' + indent + ' '.repeat( timestamp.length );

        console.log( indent + timestamp + lines.join( joiner ) );
    }



    /** OBJECT MANIPULATION
     ** ==================================================================== **/

    /**
     * Adds an indent after every new line.
     * 
     * @param str     
     * @param indent  Optional. Default `this.tab`.
     * 
     * @return  The same text, but with an indent added after every new line.
     * 
     * @see this.tab  Default for `indent` param.
     */
    protected hangingIndent(
        str: string,
        indent: string = this.tab,
    ): string {
        return str.replace( /\n/gis, '\n' + indent );
    }

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

            switch ( this.typeOf( line, { distinguishArrays: true, } ) ) {

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

    /**
     * Turns the given slug into a string with only a-z, 0-9, and hyphens.
     *
     * @param convertMe  String to convert.
     *
     * @return  Slug version of the input string.
     */
    public slugify( convertMe: string ): string {
        return slugify( convertMe );
    }

    public toTitleCase( convertMe: string ): string {
        return toTitleCase( convertMe );
    }



    /** OVERRIDING BUILT-IN METHODS
     ** ==================================================================== **/

    /**
     * Overwrites the default function to return a string representation of this
     * object.
     *
     * @override  Default value in `Object.prototype`.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | MDN documentation}
     */
    public toString(): string { return JSON.stringify( this, null, 4 ); }



    /** PRE-FORMATTED STRINGS
     ** ==================================================================== **/

    /** 
     * To use for tabs/indents based on this.opts values.
     */
    protected get tab(): string {
        return this.opts.tabCharacter.repeat( this.opts.tabWidth );
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



    /** REGULAR EXPRESSIONS
     ** ==================================================================== **/

    /**
     * Escapes a string for use in a regular expression.
     */
    protected escRegExp( convertMe: string ): string {
        return escRegExp( convertMe );
    }

    /**
     * Escapes a string for use as a replacement for a regular expression.
     */
    protected escRegExpReplace( convertMe: string ): string {
        return escRegExpReplace( convertMe );
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

        // console.log( 'Console error:' + output, );
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



    /** WORKING WITH OPTION OBJECTS
     ** ==================================================================== **/

    /**
     * Returns an updated version of `defaults` mereged with the contents of
     * `inputs`.  Useful for parsing objects passed to functions with extra,
     * optional options.
     *
     * @see {@link mergeArgs}
     */
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends Partial<D>,
    >(
        defaults: D,
        inputs?: I | undefined,
        recursive?: false | undefined,
    ): D & I;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends RecursivePartial<D>,
    >(
        defaults: D,
        inputs: I | undefined,
        recursive: true,
    ): D & I;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends Partial<D> | RecursivePartial<D>,
    >(
        defaults: D,
        inputs?: I | undefined,
        recursive: boolean = false,
    ): D & I {
        // @ts-expect-error
        return mergeArgs( defaults, inputs, recursive );
    }


    /**
     * Returns an updated version of `defaults` based on the parsed contents of
     * `inputs`.  Useful for parsing objects passed to functions with extra,
     * optional options.
     *
     * @param defaults             Default values (if notspecified in inputs).
     * @param inputs               Overriding values (changes to make).
     * @param recursive            Optional. Whether to parse the object
     *                             recursively. Default false.
     *
     * @return  Resulting object with all the `defaults` keys with either
     *          default values or input values, as appropriate.
     */
    public parseArgs<V extends U.Types.ArgsSingleValue, D extends U.Types.ArgsObject<V>>(
        defaults: D,
        inputs?: U.Types.Objects.RecursivePartial<D>,
        recursive?: true,
    ): D;
    public parseArgs<V extends U.Types.ArgsSingleValue, D extends U.Types.ArgsObject<V>>(
        defaults: D,
        inputs?: Partial<D>,
        recursive?: false,
    ): D;
    public parseArgs<V extends U.Types.ArgsSingleValue, D extends U.Types.ArgsObject<V>>(
        defaults: D,
        inputs?: Partial<D>,
        recursive: boolean = false,
    ): D {
        if ( typeof inputs !== 'object' || !inputs ) { return { ...defaults }; }
        if ( typeof defaults !== 'object' || !defaults ) { return {} as D; }

        const result: D = { ...defaults };

        const defaultKeys: ( keyof D )[] = Object.keys( defaults ) as ( keyof D )[];

        for ( const key of defaultKeys ) {

            const defaultValue: D[ keyof D ] = defaults[ key ];
            const inputValue: D[ keyof D ] | undefined = inputs[ key ];

            if (
                recursive
                && typeof defaultValue === 'object'
                && typeof inputValue === 'object'
                && defaultValue !== null
                && inputValue !== null
                && !Array.isArray( defaultValue )
                && !Array.isArray( inputValue )
            ) {

                // get deep
                // @ts-expect-error
                result[ key ] = this.parseArgs(
                    { ...defaultValue } as D[ keyof D ] & U.Types.ArgsObject,
                    { ...inputValue },
                    recursive,
                ) as D[ keyof D ];

            } else {

                // single-level
                result[ key ] = ( inputValue ?? defaultValue );
            }
        }
        return result;
    }
}