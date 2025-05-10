/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.4
 */
/*!
 * @maddimathon/utility-typescript@0.4.4
 * @license MIT
 */
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { NodeConsole } from './NodeConsole.js';
/**
 * A configurable class for working with files and paths in node.
 */
export declare class NodeFiles extends AbstractConfigurableClass<NodeFiles.Args> {
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    readonly nc: NodeConsole;
    /**
     * @category Args
     */
    get ARGS_DEFAULT(): {
        readonly argsRecursive: false;
        readonly root: "./";
        readonly writeFileArgs: {
            readonly force: false;
            readonly rename: false;
        };
    };
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<NodeFiles.Args>): NodeFiles.Args;
    constructor(args?: Partial<NodeFiles.Args>, utils?: Partial<{
        nc: NodeConsole;
    }>);
    /**
     * Deletes given files.
     *
     * @category Filers
     *
     * @param paths         Paths to delete. Absolute or relative to root dir.
     * @param dryRun        If true, files that would be deleted are printed to the console and not deleted.
     * @param logBaseLevel  Base depth for console messages (via NodeConsole).
     */
    deleteFiles(paths: string[], dryRun?: boolean, logBaseLevel?: number): void;
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
    readFile(path: string, args?: Partial<NodeFiles.ReadFileArgs>): string;
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
    writeFile(path: string, content: string | string[], args?: Partial<NodeFiles.WriteFileArgs>): string | false;
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
     * @see {@link NodeFiles.changeBaseName}  Used to update the basename to test for uniqueness.
     *
     * @param inputPath  Path to make unique.
     *
     * @return  Absolute, unique version of the given `inputPath`.
     */
    uniquePath(inputPath: string): string;
}
/**
 * Used only for {@link NodeFiles}.
 */
export declare namespace NodeFiles {
    /**
     * Optional configuration for {@link NodeFiles}.
     */
    type Args = AbstractConfigurableClass.Args & {
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
    };
    /**
     * Optional configuration for {@link NodeFiles.readFile}.
     */
    type ReadFileArgs = {
        encoding: BufferEncoding;
        flag?: string | undefined;
    };
    /**
     * Optional configuration for {@link NodeFiles.writeFile}.
     */
    type WriteFileArgs = Partial<ReadFileArgs> & {
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
//# sourceMappingURL=NodeFiles.d.ts.map