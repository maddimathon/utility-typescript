/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1
 * @license MIT
 */
import NodeFS from 'node:fs';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { NodeConsole } from './NodeConsole.js';
/**
 * A configurable class for working with files and paths in node.
 *
 * @since 0.2.0
 */
export declare class NodeFiles extends AbstractConfigurableClass<NodeFiles.Args> {
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    readonly nc: NodeConsole;
    /**
     * Default args for this stage.
     *
     * @category Args
     */
    get ARGS_DEFAULT(): {
        readonly argsRecursive: true;
        readonly copyFile: {
            readonly force: true;
            readonly rename: true;
            readonly recursive: false;
        };
        readonly root: "./";
        readonly readDir: {
            readonly recursive: false;
        };
        readonly readFile: {};
        readonly write: {
            force: boolean;
            rename: boolean;
        };
    };
    constructor(args?: Partial<NodeFiles.Args>, utils?: Partial<{
        nc: NodeConsole;
    }>);
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
    copyFile(source: string, destination: string, args?: Partial<NodeFiles.CopyFileArgs>): string | false;
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
    delete(paths: string[], logLevel?: number, dryRun?: boolean): void;
    /**
     * Gets the path dirname via {@link node:fs.dirname}.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    dirname(path: string): string;
    /**
     * Gets the NodeFS.Stats value for the given path.
     *
     * @category Meta
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    getStats(path: string): NodeFS.Stats | undefined;
    /**
     * Checks if the given path is a directory.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    isDirectory(path: string): boolean;
    /**
     * Checks if the given path is a file.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    isFile(path: string): boolean;
    /**
     * Checks if the given path is a symbolic link.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    isSymLink(path: string): boolean;
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
    mkdir(path: string): string | undefined;
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
    readDir(path: string, args?: Partial<NodeFiles.ReadDirArgs>): string[];
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
     *
     * @since 2.0.0-alpha — Renamed to write from writeFiles.
     */
    write(path: string, content: string | string[], args?: Partial<NodeFiles.WriteFileArgs>): string | false;
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
     * Gets the basename of the given path.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    basename(path: string, suffix?: string | false): string;
    /**
     * Checks whether a file, directory, or link exists at the given path.
     *
     * @category Path-makers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    exists(path: string): boolean;
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
 *
 * @since 0.2.0
 */
export declare namespace NodeFiles {
    /**
     * Optional configuration for {@link NodeFiles}.
     *
     * @since 0.2.0
     */
    interface Args extends AbstractConfigurableClass.Args {
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
    }
    /**
     * Optional configuration for {@link NodeFiles.copy}.
     *
     * @see {@link https://nodejs.org/docs/latest-v22.x/api/fs.html#fscpsyncsrc-dest-options | node:fs.cpSync}
     *
     * @since 0.2.0
     */
    interface CopyFileArgs extends WriteFileArgs {
        /**
         * Function to filter copied files/directories.
         *
         * Return true to copy the item, false to ignore it.
         *
         * When ignoring a directory, all of its contents will be skipped as
         * well.
         */
        filter?: (src: string, dest: string) => boolean;
        /**
         * Whether to copy directories recursively.
         */
        recursive: boolean;
    }
    /**
     * Optional configuration for {@link NodeFiles.readDir}.
     *
     * @since 0.2.0
     */
    interface ReadDirArgs {
        recursive: boolean;
    }
    /**
     * Optional configuration for {@link NodeFiles.readFile}.
     *
     * @since 0.2.0
     */
    interface ReadFileArgs {
        flag?: string | undefined;
    }
    /**
     * Optional configuration for {@link NodeFiles.write}.
     *
     * @since 0.2.0
     */
    interface WriteFileArgs extends Partial<ReadFileArgs> {
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
//# sourceMappingURL=NodeFiles.d.ts.map