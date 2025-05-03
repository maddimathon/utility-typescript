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


/**
 * A configurable class for working with files and paths in node.
 */
export class NodeFiles extends AbstractConfigurableClass<NodeFiles.Args> {



    /* LOCAL PROPERTIES
     * ====================================================================== */


    /* Args ===================================== */

    /**
     * @category Args
     */
    public get ARGS_DEFAULT() {

        const defaults = {
            optsRecursive: false,
            root: './',
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

    public constructor ( args: Partial<NodeFiles.Args> = {} ) {
        super( args );
    }



    /* METHODS
     * ====================================================================== */


    /* Files ===================================== */


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
     * @param _path  Path to make unique.
     *
     * @return  Absolute, unique version of the given `_path`.
     */
    public uniquePath( _path: string ): string {
        _path = this.pathResolve( _path );
        if ( !NodeFS.existsSync( _path ) ) { return _path; }

        const inputPath: string = _path;

        /** This file’s extension. */
        const pathExtension: string | undefined = NodePath.extname( inputPath ) || undefined;

        let uniqueBaseName: string = NodePath.basename( inputPath, pathExtension );

        const inputPathIsNumbered: boolean = uniqueBaseName.match( /-(\d+)$/gi ) !== null;

        /** Copy index - a number to append to OG name. */
        let copyIndex: number = inputPathIsNumbered
            ? Number( inputPath.replace( /^.+-(\d+)\.[a-z|0-9|\.]+$/gi, '$1' ) )
            : 0;

        if ( Number.isNaN( copyIndex ) ) {
            copyIndex = 0;
        }

        /** 
         * Iterate the index until the inputPath is unique
         */
        while ( NodeFS.existsSync(
            this.changeBaseName( inputPath, uniqueBaseName )
        ) ) {
            copyIndex++;

            uniqueBaseName = uniqueBaseName.replace( /-(\d+)$/gi, '' )
                + `-${ copyIndex }`;
        }

        /** RETURN **/
        return this.changeBaseName( inputPath, uniqueBaseName );
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
    }
}