/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.3.0
 */
/*!
 * @maddimathon/utility-typescript@0.3.0
 * @license MIT
 */
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
/**
 * A configurable class for working with files and paths in node.
 */
export declare class NodeFiles extends AbstractConfigurableClass<NodeFiles.Args> {
    /**
     * @category Args
     */
    get ARGS_DEFAULT(): {
        readonly optsRecursive: false;
        readonly root: "./";
    };
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<NodeFiles.Args>): NodeFiles.Args;
    constructor(args?: Partial<NodeFiles.Args>);
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
    changeBaseName(path: string, newName: string): string;
    /**
     * Returns relative paths, based on the root defined the the opts.
     *
     * @category Path-makers
     *
     * @param path  Path to make relative.
     */
    pathRelative(path: string): string;
    /**
     * Resolves relative to the root defined the the opts.
     *
     * @category Path-makers
     *
     * @param paths  Paths to resolve.
     */
    pathResolve(...paths: string[]): string;
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
    uniquePath(_path: string): string;
}
/**
 * Used only for {@link NodeFiles}.
 */
export declare namespace NodeFiles {
    /**
     * Optional configuration for {@link NodeFiles}.
     */
    interface Args extends AbstractConfigurableClass.Args {
        /**
         * Path to the root directory (relative to node's cwd).
         *
         * @default './'
         */
        root: string;
    }
}
//# sourceMappingURL=NodeFiles.d.ts.map