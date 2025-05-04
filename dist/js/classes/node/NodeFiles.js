/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.3.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.3.0-draft
 * @license MIT
 */
// import type { WriteFileOptions } from 'node:fs';
import NodeFS from 'node:fs';
import NodePath from 'node:path';
// import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { mergeArgs, } from '../../functions/index.js';
import { NodeConsole } from './NodeConsole.js';
/**
 * A configurable class for working with files and paths in node.
 */
export class NodeFiles extends AbstractConfigurableClass {
    /* Args ===================================== */
    /**
     * @category Args
     */
    get ARGS_DEFAULT() {
        const defaults = {
            optsRecursive: false,
            root: './',
            writeFileArgs: {
                force: false,
                rename: false,
            },
        };
        // this lets the types work a bit better by letting us export the
        // default as const but ensure that it is the same shape as the args
        const testType = defaults;
        testType;
        return defaults;
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = AbstractConfigurableClass.abstractArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs(mergedDefault, args, this.ARGS_DEFAULT.optsRecursive);
        return merged;
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}, utils = {}) {
        var _a;
        super(args);
        this.nc = (_a = utils.nc) !== null && _a !== void 0 ? _a : new NodeConsole(this.ARGS_DEFAULT);
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
    deleteFiles(paths, dryRun = false, logBaseLevel = 0) {
        for (const path of paths) {
            // continues
            if (!NodeFS.existsSync(path)) {
                continue;
            }
            const stat = NodeFS.statSync(path);
            if (stat.isDirectory()) {
                if (dryRun) {
                    this.nc.timestampLog('deleting directory: ' + path, { depth: logBaseLevel });
                }
                else {
                    NodeFS.rmSync(path, { recursive: true, force: true });
                }
            }
            else if (stat.isFile() || stat.isSymbolicLink()) {
                if (dryRun) {
                    this.nc.timestampLog('deleting file: ' + path, { depth: logBaseLevel });
                }
                else {
                    NodeFS.unlinkSync(path);
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
    readFile(path, args = {}) {
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
     */
    writeFile(path, content, args = {}) {
        path = this.pathResolve(path);
        content = Array.isArray(content)
            ? content.join('\n')
            : content;
        args = this.mergeArgs(this.args.writeFileArgs, args, false);
        // returns if we aren't forcing or renaming
        if (NodeFS.existsSync(path)) {
            // returns
            if (!args.force && !args.rename) {
                return false;
            }
            if (args.rename) {
                path = this.uniquePath(path);
            }
        }
        NodeFS.mkdirSync(NodePath.dirname(path), { recursive: true });
        NodeFS.writeFileSync(path, content, args);
        return NodeFS.existsSync(path) && path;
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
        const newPath = this.pathResolve(NodePath.dirname(path), newName + NodePath.extname(path));
        return isRelative ? this.pathRelative(newPath) : newPath;
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
        if (!NodeFS.existsSync(inputPath)) {
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
        while (NodeFS.existsSync(uniqueFullPath)) {
            // increments here because the index starts at 0
            copyIndex++;
            uniqueFullPath = this.changeBaseName(inputPath, inputBaseNameWithoutNumber + `-${copyIndex}`);
        }
        return uniqueFullPath;
    }
}
//# sourceMappingURL=NodeFiles.js.map