/**
 * @since 0.2.0
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
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
    mergeArgs,
} from '../../functions/index.js';

import { NodeConsole } from './NodeConsole.js';


/**
 * A configurable class for working with files and paths in node.
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
     * @category Args
     */
    public get ARGS_DEFAULT() {

        const defaults = {
            optsRecursive: false,
            root: './',
            writeFileArgs: {
                force: false,
                rename: false,
            },
        } as const;

        // this lets the types work a bit better by letting us export the
        // default as const but ensure that it is the same shape as the args
        const testType: NodeFiles.Args = defaults;
        testType;

        return defaults;
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: Partial<NodeFiles.Args> ): NodeFiles.Args {

        const mergedDefault: NodeFiles.Args = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as NodeFiles.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs<any, NodeFiles.Args, Partial<NodeFiles.Args>>(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );

        return merged;
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

        this.nc = utils.nc ?? new NodeConsole( this.ARGS_DEFAULT );
    }



    /* METHODS
     * ====================================================================== */


    /* Files ===================================== */

    /**
     * Deletes given files.
     * 
     * @category Filers
     * 
     * @param paths         Paths to delete. Absolute or relative to root dir.
     * @param dryRun        If true, files that would be deleted are printed to the console and not deleted.
     * @param logBaseLevel  Base depth for console messages (via NodeConsole).
     */
    public deleteFiles(
        paths: string[],
        dryRun: boolean = false,
        logBaseLevel: number = 0,
    ): void {

        for ( const path of paths ) {
            // continues
            if ( !NodeFS.existsSync( path ) ) { continue; }

            const stat = NodeFS.statSync( path );

            if ( stat.isDirectory() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting directory: ' + path, { depth: logBaseLevel } );
                } else {
                    NodeFS.rmSync( path, { recursive: true, force: true } );
                }

            } else if ( stat.isFile() || stat.isSymbolicLink() ) {

                if ( dryRun ) {
                    this.nc.timestampLog( 'deleting file: ' + path, { depth: logBaseLevel } );
                } else {
                    NodeFS.unlinkSync( path );
                }
            }
        }
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
     */
    public readFile(
        path: string,
        args: Partial<NodeFiles.ReadFileArgs> = {},
    ): string {

        return NodeFS.readFileSync(
            this.pathResolve( path ),
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
     */
    public writeFile(
        path: string,
        content: string | string[],
        args: Partial<NodeFiles.WriteFileArgs> = {},
    ): string | false {

        path = this.pathResolve( path );

        content = Array.isArray( content )
            ? content.join( '\n' )
            : content;

        args = this.mergeArgs<
            any,
            NodeFiles.WriteFileArgs,
            Partial<NodeFiles.WriteFileArgs>
        >(
            this.args.writeFileArgs,
            args,
            false
        );

        // returns if we aren't forcing or renaming
        if ( NodeFS.existsSync( path ) ) {

            // returns
            if ( !args.force && !args.rename ) {
                return false;
            }

            if ( args.rename ) {
                path = this.uniquePath( path );
            }
        }

        NodeFS.mkdirSync( NodePath.dirname( path ), { recursive: true } );

        NodeFS.writeFileSync( path, content, args );

        return NodeFS.existsSync( path ) && path;
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
            NodePath.dirname( path ),
            newName + NodePath.extname( path ),
        );

        return isRelative ? this.pathRelative( newPath ) : newPath;
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
        if ( !NodeFS.existsSync( inputPath ) ) { return inputPath; }

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
        while ( NodeFS.existsSync( uniqueFullPath ) ) {
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
 */
export namespace NodeFiles {

    /**
     * Optional configuration for {@link NodeFiles}.
     */
    export interface Args extends AbstractConfigurableClass.Args {

        /**
         * Path to the root directory (relative to node's cwd).
         * 
         * @default './'
         */
        root: string;

        /**
         * Default configuration for {@link NodeFiles.writeFile}.
         */
        writeFileArgs: WriteFileArgs;
    }

    /**
     * Optional configuration for {@link NodeFiles.readFile}.
     */
    export interface ReadFileArgs {
        encoding: BufferEncoding;
        flag?: string | undefined;
    }

    /**
     * Optional configuration for {@link NodeFiles.writeFile}.
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
    }
}