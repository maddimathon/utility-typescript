/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha
 * @license MIT
 */
// import type { WriteFileOptions } from 'node:fs';
import NodeFS from 'node:fs';
import NodePath from 'node:path';
// import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { arrayUnique, } from '../../functions/index.js';
import { NodeConsole } from './NodeConsole.js';
/**
 * A configurable class for working with files and paths in node.
 *
 * @since 0.2.0
 */
export class NodeFiles extends AbstractConfigurableClass {
    /* LOCAL PROPERTIES
     * ====================================================================== */
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    nc;
    /* Args ===================================== */
    /**
     * Default args for this stage.
     *
     * @category Args
     */
    get ARGS_DEFAULT() {
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
        };
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}, utils = {}) {
        super(args);
        this.nc = utils.nc ?? new NodeConsole(this.ARGS_DEFAULT);
        const propNames = arrayUnique(Object.getOwnPropertyNames(NodeFiles.prototype)
            .concat(Object.getOwnPropertyNames(this.constructor.prototype)));
        for (const _name of propNames) {
            // continues on match
            switch (_name) {
                case 'args':
                case 'ARGS_DEFAULT':
                case 'buildArgs':
                case 'constructor':
                case 'nc':
                    continue;
            }
            // continues
            if (typeof this[_name] !== 'function') {
                continue;
            }
            // @ts-expect-error
            this[_name] = this[_name].bind(this);
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
     *
     * @experimental
     */
    copyFile(source, destination, args = {}) {
        source = this.pathResolve(source);
        destination = this.pathResolve(destination);
        args = this.mergeArgs(this.args.copyFile, args, false);
        // returns if we aren't forcing or renaming
        if (this.exists(destination)) {
            // returns
            if (!args.force && !args.rename) {
                return false;
            }
            if (args.force) {
                this.delete([destination]);
            }
            else if (args.rename) {
                destination = this.uniquePath(destination);
            }
        }
        // returns
        if (!args.recursive && this.isDirectory(source)) {
            this.mkdir(destination, { ...args, recursive: true });
            return this.exists(destination) && destination;
        }
        const destinationDir = this.dirname(destination);
        if (!this.exists(destinationDir)) {
            this.mkdir(destinationDir, { ...args, recursive: true });
        }
        NodeFS.cpSync(source, destination, {
            ...args,
            errorOnExist: false,
            mode: undefined,
            preserveTimestamps: true,
            // verbatimSymlinks: true,
        });
        return (this.exists(destination) || this.isSymLink(destination)) && destination;
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
    delete(paths, logLevel = 0, dryRun = false) {
        for (const path of paths) {
            // continues
            if (!this.exists(path)) {
                continue;
            }
            const stat = this.getStats(path);
            // continues
            if (!stat) {
                continue;
            }
            if (stat.isDirectory()) {
                if (dryRun) {
                    this.nc.timestampLog('deleting directory: ' + this.pathRelative(path).replace(' ', '%20'), { depth: logLevel, linesIn: 0, linesOut: 0, maxWidth: null });
                }
                else {
                    NodeFS.rmSync(path, { recursive: true, force: true });
                }
            }
            else if (stat.isFile() || stat.isSymbolicLink()) {
                if (dryRun) {
                    this.nc.timestampLog('deleting file: ' + this.pathRelative(path).replace(' ', '%20'), { depth: logLevel, linesIn: 0, linesOut: 0, maxWidth: null });
                }
                else {
                    NodeFS.unlinkSync(path);
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
    dirname(path) {
        return NodePath.dirname(path);
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
    getStats(path) {
        if (!this.exists(path)) {
            return undefined;
        }
        return NodeFS.statSync(path);
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
    isDirectory(path) {
        return this.getStats(path)?.isDirectory() ?? false;
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
    isFile(path) {
        return this.getStats(path)?.isFile() ?? false;
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
    isSymLink(path) {
        return this.getStats(path)?.isSymbolicLink() ?? false;
    }
    /**
     * Creates a directory.
     *
     * @category Filers
     *
     * @since 2.0.0-alpha
     *
     * @experimental
     */
    mkdir(path, args) {
        return NodeFS.mkdirSync(path, args);
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
     *
     * @experimental
     */
    readDir(path, args = {}) {
        args = this.mergeArgs(this.args.readDir, args, false);
        return NodeFS.readdirSync(this.pathResolve(path), {
            ...args,
            withFileTypes: false,
            encoding: 'utf-8',
        }).filter(path => !path.match(/(^|\/)\._/g));
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
    readFile(path, args = {}) {
        args = this.mergeArgs(this.args.readFile, args, false);
        return NodeFS.readFileSync(this.pathResolve(path), {
            ...args,
            encoding: 'utf-8',
        });
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
    write(path, content, args = {}) {
        path = this.pathResolve(path);
        content = Array.isArray(content)
            ? content.join('\n')
            : content;
        args = this.mergeArgs(this.args.write, args, false);
        // returns if we aren't forcing or renaming
        if (this.exists(path)) {
            // returns
            if (!args.force && !args.rename) {
                return false;
            }
            if (args.rename) {
                path = this.uniquePath(path);
            }
        }
        this.mkdir(this.dirname(path), { ...args, recursive: true });
        NodeFS.writeFileSync(path, content, args);
        return this.exists(path) && path;
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
    changeBaseName(path, newName) {
        const isRelative = !path.match(/^\//g);
        const newPath = this.pathResolve(this.dirname(path), newName + NodePath.extname(path));
        return isRelative ? this.pathRelative(newPath) : newPath;
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
    basename(path, suffix) {
        if (suffix === false) {
            suffix = undefined;
        }
        else if (!suffix) {
            suffix = NodePath.extname(path) || undefined;
        }
        return NodePath.basename(path, suffix);
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
    exists(path) {
        return NodeFS.existsSync(this.pathResolve(path));
    }
    /**
     * Returns relative paths, based on the root defined the the opts.
     *
     * @category Path-makers
     *
     * @param path  Path to make relative.
     */
    pathRelative(path) {
        const relative = NodePath.relative(this.pathResolve(), path);
        return relative ? relative : '.';
    }
    /**
     * Resolves relative to the root defined the the opts.
     *
     * @category Path-makers
     *
     * @param paths  Paths to resolve.
     */
    pathResolve(...paths) {
        return NodePath.resolve(this.args.root, ...paths);
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
    uniquePath(inputPath) {
        inputPath = this.pathResolve(inputPath);
        if (!this.exists(inputPath)) {
            return inputPath;
        }
        /** Used to iterate until we have a unique path. */
        const inputBaseName = NodePath.basename(inputPath, NodePath.extname(inputPath) || undefined);
        /** Used as a base to append copyIndex to. */
        const inputBaseNameWithoutNumber = inputBaseName.replace(/-(\d+)$/gi, '');
        /** Copy index - a number to append to OG name. */
        let copyIndex = Number(inputBaseName.replace(/^.+-(\d+)$/gi, '$1')) || 0;
        /** Full path with the updated unique basename. */
        let uniqueFullPath = inputPath;
        // Iterate the index until the inputPath is unique
        while (this.exists(uniqueFullPath)) {
            // increments here because the index starts at 0
            copyIndex++;
            uniqueFullPath = this.changeBaseName(inputPath, inputBaseNameWithoutNumber + `-${copyIndex}`);
        }
        return uniqueFullPath;
    }
}
/**
 * Used only for {@link NodeFiles}.
 *
 * @since 0.2.0
 */
(function (NodeFiles) {
    ;
    ;
    ;
    ;
    ;
})(NodeFiles || (NodeFiles = {}));
//# sourceMappingURL=NodeFiles.js.map