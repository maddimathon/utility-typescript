/**
 * @since 0.2.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { WriteFileOptions } from 'node:fs';
import NodeFS from 'node:fs';
import NodePath from 'node:path';

// import type { RecursivePartial } from '../../types/objects/index.js';

import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';

import {
    arrayUnique,
} from '../../functions/index.js';

import { NodeConsole } from './NodeConsole.js';


/**
 * A configurable class for working with files and paths in node.
 * 
 * @since 0.2.0
 */
export class NodeFiles extends AbstractConfigurableClass<NodeFiles.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * The instance of {@link NodeConsole} used within this class.
     * 
     * @category Classes
     */
    public readonly nc: NodeConsole;


    /* Args ===================================== */

    /**
     * Default args for this stage.
     * 
     * @category Args
     */
    public get ARGS_DEFAULT() {

        const write = {
            force: false,
            rename: false,
        };

        return {
            argsRecursive: true,

            copyFile: {
                force: true,
                rename: true,
                recursive: false,
            },

            root: './',

            readDir: {
                recursive: false,
            },

            readFile: {},

            write,

        } as const satisfies NodeFiles.Args;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (
        args: Partial<NodeFiles.Args> = {},
        utils: Partial<{
            nc: NodeConsole;
        }> = {},
    ) {
        super( args );

        this.nc = utils.nc ?? new NodeConsole( this.ARGS_DEFAULT as unknown as NodeConsole.Args );

        const propNames = arrayUnique(
            Object.getOwnPropertyNames( NodeFiles.prototype )
                .concat( Object.getOwnPropertyNames( this.constructor.prototype ) )
        ) as ( keyof NodeFiles | "constructor" )[];

        for ( const _name of propNames ) {

            // continues on match
            switch ( _name ) {

                case 'args':
                case 'ARGS_DEFAULT':
                case 'buildArgs':
                case 'constructor':
                case 'nc':
                    continue;
            }

            // continues
            if ( typeof this[ _name ] !== 'function' ) {
                continue;
            }

            // @ts-expect-error
            this[ _name ] = this[ _name ].bind( this );
        }
    }



    /* METHODS
     * ====================================================================== */


    /* Files ===================================== */

    /**
     * Copies a file to another path.
     * 
     * @category Filers
     * 
     * @experimental
     * 
     * @param source       Location to write file.
     * @param destination  Location to copy the source path to.
     * @param args         Optional configuration.
     * 
     * @return  Path to file if written, or false on failure.
     * 
     * @since 2.0.0-alpha
     * @since 2.0.0-alpha.1 — Now checks that the file exists first. If so, 
     *                            returns ''.
     * 
     * @experimental
     */
    public copyFile(
        source: string,
        destination: string,
        args: Partial<NodeFiles.CopyFileArgs> = {},
    ): string | false {

        source = this.pathResolve( source );
        destination = this.pathResolve( destination );

        args = this.mergeArgs( this.args.copyFile, args, false );

        // returns
        if ( !this.exists( source ) ) {
            return false;
        }

        // returns if we aren't forcing or renaming
        if ( this.exists( destination ) ) {

            // returns
            if ( !args.force && !args.rename ) {
                return false;
            }

            if ( args.force ) {
                this.delete( [ destination ] );
            } else if ( args.rename ) {
                destination = this.uniquePath( destination );
            }
        }

        // returns
        if ( !args.recursive && this.isDirectory( source ) ) {
            this.mkdir( destination );
            return this.exists( destination ) && destination;
        }

        const destinationDir = this.dirname( destination );

        if ( !this.exists( destinationDir ) ) {
            this.mkdir( destinationDir );
        }

        NodeFS.cpSync( source, destination, {
            ...args,

            errorOnExist: false,
            mode: undefined,
            preserveTimestamps: true,
            // verbatimSymlinks: true,
        } );

        return ( this.exists( destination ) || this.isSymLink( destination ) ) && destination;
    }

    /**
     * Deletes given files.
     * 
     * @category Filers
     * 
     * @param paths         Paths to delete. Absolute or relative to root dir.
     * @param dryRun        If true, files that would be deleted are printed to the console and not deleted.
     * @param logLevel  Base depth for console messages (via NodeConsole).
     * 
     * @since 2.0.0-alpha — Renamed to delete from deleteFiles.
     */
    public delete(
        paths: string[],
        logLevel: number = 0,
        dryRun: boolean = false,
    ): void {

        for ( const path of paths ) {
            // continues
            if ( !this.exists( path ) ) { continue; }

            const stat = this.getStats( path );

            // continues
            if ( !stat ) { continue; }

            if ( stat.isDirectory() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting directory: ' + this.pathRelative( path ).replace( ' ', '%20' ), { depth: logLevel, linesIn: 0, linesOut: 0, maxWidth: null } );
                } else {
                    NodeFS.rmSync( path, { recursive: true, force: true } );
                }

            } else if ( stat.isFile() || stat.isSymbolicLink() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting file: ' + this.pathRelative( path ).replace( ' ', '%20' ), { depth: logLevel, linesIn: 0, linesOut: 0, maxWidth: null } );
                } else {
                    NodeFS.unlinkSync( path );
                }
            }
        }
    }

    /**
     * Gets the path dirname via {@link node:fs.dirname}.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public dirname( path: string ) {
        return NodePath.dirname( path );
    }

    /**
     * Gets the NodeFS.Stats value for the given path.
     * 
     * @category Meta
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public getStats( path: string ) {
        if ( !this.exists( path ) ) {
            return undefined;
        }
        return NodeFS.statSync( path );
    }

    /**
     * Checks if the given path is a directory.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public isDirectory( path: string ) {
        return this.getStats( path )?.isDirectory() ?? false;
    }

    /**
     * Checks if the given path is a file.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public isFile( path: string ) {
        return this.getStats( path )?.isFile() ?? false;
    }

    /**
     * Checks if the given path is a symbolic link.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public isSymLink( path: string ) {
        return this.getStats( path )?.isSymbolicLink() ?? false;
    }

    /**
     * Creates a directory.
     * 
     * @category Filers
     * 
     * @since 2.0.0-alpha
     * @since 2.0.0-alpha.1 — Removed args param and now forces recursion.
     * 
     * @experimental
     */
    public mkdir( path: string ) {
        return NodeFS.mkdirSync( path, {
            recursive: true,
        } );
    }

    /**
     * Read the paths within a directory.
     * 
     * @category Filers
     * 
     * @param path  Directory to read.
     * @param args  Optional configuration.
     * 
     * @return  Paths within the given directory.
     * 
     * @since 2.0.0-alpha
     * @since 2.0.0-alpha.1 — Now checks that the file exists first. If so, 
     *                            returns ''.
     * 
     * @experimental
     */
    public readDir(
        path: string,
        args: Partial<NodeFiles.ReadDirArgs> = {},
    ): string[] {
        path = this.pathResolve( path );

        // returns
        if ( !this.exists( path ) ) {
            return [];
        }

        args = this.mergeArgs( this.args.readDir, args, false );

        return NodeFS.readdirSync(
            path,
            {
                ...args,
                withFileTypes: false,
                encoding: 'utf-8',
            }
        ).filter( path => !path.match( /(^|\/)\._/g ) );
    }

    /**
     * Reads a file.
     * 
     * @category Filers
     * 
     * @param path  File to read.
     * @param args  Optional configuration.
     * 
     * @return  Contents of the file.
     * 
     * @since 2.0.0-alpha.1 — Now checks that the file exists first. If so, 
     *                            returns ''.
     */
    public readFile(
        path: string,
        args: Partial<NodeFiles.ReadFileArgs> = {},
    ): string {
        path = this.pathResolve( path );

        // returns
        if ( !this.exists( path ) ) {
            return '';
        }

        args = this.mergeArgs( this.args.readFile, args, false );

        return NodeFS.readFileSync(
            path,
            {
                ...args,
                encoding: 'utf-8',
            }
        );
    }

    /**
     * Writes a file.
     * 
     * @category Filers
     * 
     * @param path     Location to write file.
     * @param content  Contents to write.
     * @param args     Optional configuration.
     * 
     * @return  Path to file if written, or false on failure.
     * 
     * @since 2.0.0-alpha — Renamed to write from writeFiles.
     */
    public write(
        path: string,
        content: string | string[],
        args: Partial<NodeFiles.WriteFileArgs> = {},
    ): string | false {

        path = this.pathResolve( path );

        content = Array.isArray( content )
            ? content.join( '\n' )
            : content;

        args = this.mergeArgs(
            this.args.write,
            args,
            false
        );

        // returns if we aren't forcing or renaming
        if ( this.exists( path ) ) {

            // returns
            if ( !args.force && !args.rename ) {
                return false;
            }

            if ( args.rename ) {
                path = this.uniquePath( path );
            }
        }

        this.mkdir( this.dirname( path ) );

        NodeFS.writeFileSync( path, content, args );

        return this.exists( path ) && path;
    }


    /* Paths ===================================== */

    /**
     * Changes just the file name of a path
     * 
     * @category Path-makers
     * 
     * @param path     
     * @param newName  
     * 
     * @return  Full path with updated basename.
     */
    public changeBaseName(
        path: string,
        newName: string,
    ): string {

        const isRelative = !path.match( /^\//g );

        const newPath = this.pathResolve(
            this.dirname( path ),
            newName + NodePath.extname( path ),
        );

        return isRelative ? this.pathRelative( newPath ) : newPath;
    }

    /**
     * Gets the basename of the given path.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public basename(
        path: string,
        suffix?: string | false,
    ): string {

        if ( suffix === false ) {
            suffix = undefined;
        } else if ( !suffix ) {
            suffix = NodePath.extname( path ) || undefined;
        }

        return NodePath.basename( path, suffix );
    }

    /**
     * Checks whether a file, directory, or link exists at the given path.
     * 
     * @category Path-makers
     * 
     * @since 2.0.0-alpha
     * 
     * @experimental
     */
    public exists( path: string ): boolean {
        return NodeFS.existsSync( this.pathResolve( path ) );
    }

    /**
     * Returns relative paths, based on the root defined the the opts.
     * 
     * @category Path-makers
     * 
     * @param path  Path to make relative.
     */
    public pathRelative( path: string ): string {
        const relative = NodePath.relative( this.pathResolve(), path );
        return relative ? relative : '.';
    }

    /**
     * Resolves relative to the root defined the the opts.
     * 
     * @category Path-makers
     * 
     * @param paths  Paths to resolve.
     */
    public pathResolve( ...paths: string[] ): string {
        return NodePath.resolve( this.args.root, ...paths );
    }

    /**
     * Returns a unique version of the inputPath (i.e., where no file exists) by
     * appending a number.
     * 
     * @category Path-makers
     * 
     * @see {@link NodeFiles.changeBaseName}  Used to update the basename to test for uniqueness.
     * 
     * @param inputPath  Path to make unique.
     *
     * @return  Absolute, unique version of the given `inputPath`.
     */
    public uniquePath( inputPath: string ): string {
        inputPath = this.pathResolve( inputPath );
        if ( !this.exists( inputPath ) ) { return inputPath; }

        /** Used to iterate until we have a unique path. */
        const inputBaseName: string = NodePath.basename(
            inputPath,
            NodePath.extname( inputPath ) || undefined
        );

        /** Used as a base to append copyIndex to. */
        const inputBaseNameWithoutNumber: string = inputBaseName.replace( /-(\d+)$/gi, '' );

        /** Copy index - a number to append to OG name. */
        let copyIndex: number = Number(
            inputBaseName.replace( /^.+-(\d+)$/gi, '$1' )
        ) || 0;

        /** Full path with the updated unique basename. */
        let uniqueFullPath = inputPath;

        // Iterate the index until the inputPath is unique
        while ( this.exists( uniqueFullPath ) ) {
            // increments here because the index starts at 0
            copyIndex++;

            uniqueFullPath = this.changeBaseName(
                inputPath,
                inputBaseNameWithoutNumber + `-${ copyIndex }`
            );
        }

        return uniqueFullPath;
    }
}

/**
 * Used only for {@link NodeFiles}.
 * 
 * @since 0.2.0
 */
export namespace NodeFiles {

    /**
     * Optional configuration for {@link NodeFiles}.
     * 
     * @since 0.2.0
     */
    export interface Args extends AbstractConfigurableClass.Args {

        argsRecursive: true;

        /**
         * Default configuration for {@link NodeFiles.copy}.
         * 
         * @since 2.0.0-alpha — Renamed to copyFile from copyFileArgs.
         */
        copyFile: CopyFileArgs;

        /**
         * Default configuration for {@link NodeFiles.readDir}.
         * 
         * @since 2.0.0-alpha — Renamed to readDir from readDirArgs.
         */
        readDir: ReadDirArgs;

        /**
         * Default configuration for {@link NodeFiles.readFile}.
         * 
         * @since 2.0.0-alpha — Renamed to readFile from readFileArgs.
         */
        readFile: ReadFileArgs;

        /**
         * Path to the root directory (relative to node's cwd).
         * 
         * @default './'
         */
        root: string;

        /**
         * Default configuration for {@link NodeFiles.write}.
         * 
         * @since 2.0.0-alpha — Renamed to write from writeArgs.
         */
        write: WriteFileArgs;
    };

    /**
     * Optional configuration for {@link NodeFiles.copy}.
     * 
     * @see {@link https://nodejs.org/docs/latest-v22.x/api/fs.html#fscpsyncsrc-dest-options | node:fs.cpSync}
     * 
     * @since 0.2.0
     */
    export interface CopyFileArgs extends WriteFileArgs {

        /**
         * Function to filter copied files/directories.
         *
         * Return true to copy the item, false to ignore it.
         *
         * When ignoring a directory, all of its contents will be skipped as
         * well.
         */
        filter?: ( src: string, dest: string ) => boolean;

        /**
         * Whether to copy directories recursively.
         */
        recursive: boolean;
    };

    /**
     * Optional configuration for {@link NodeFiles.readDir}.
     * 
     * @since 0.2.0
     */
    export interface ReadDirArgs {
        recursive: boolean;
    };

    /**
     * Optional configuration for {@link NodeFiles.readFile}.
     * 
     * @since 0.2.0
     */
    export interface ReadFileArgs {
        flag?: string | undefined;
    };

    /**
     * Optional configuration for {@link NodeFiles.write}.
     * 
     * @since 0.2.0
     */
    export interface WriteFileArgs extends Partial<ReadFileArgs> {

        /** 
         * Overwrite file at destination if it exists.
         * 
         * @default false
         */
        force: boolean;

        /** 
         * If a file exists at destination, append a number to the file’s
         * basename so it’s unique.
         *
         * @default false
         */
        rename: boolean;
    };
}