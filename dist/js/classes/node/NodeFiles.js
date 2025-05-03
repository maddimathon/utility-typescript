/**
 * @since 0.2.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.2.0
 */
/*!
 * @maddimathon/utility-typescript@0.2.0
 * @license MIT
 */
// import type { WriteFileOptions } from 'node:fs';
import NodeFS from 'node:fs';
import NodePath from 'node:path';
// import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { mergeArgs, } from '../../functions/index.js';
/**
 * A configurable class for working with files and paths in node.
 */
export class NodeFiles extends AbstractConfigurableClass {
    /* LOCAL PROPERTIES
     * ====================================================================== */
    /* Args ===================================== */
    /**
     * @category Args
     */
    get ARGS_DEFAULT() {
        const defaults = {
            optsRecursive: false,
            root: './',
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
    constructor(args = {}) {
        super(args);
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
     * @param _path  Path to make unique.
     *
     * @return  Absolute, unique version of the given `_path`.
     */
    uniquePath(_path) {
        _path = this.pathResolve(_path);
        if (!NodeFS.existsSync(_path)) {
            return _path;
        }
        const inputPath = _path;
        /** This file’s extension. */
        const pathExtension = NodePath.extname(inputPath) || undefined;
        let uniqueBaseName = NodePath.basename(inputPath, pathExtension);
        const inputPathIsNumbered = uniqueBaseName.match(/-(\d+)$/gi) !== null;
        /** Copy index - a number to append to OG name. */
        let copyIndex = inputPathIsNumbered
            ? Number(inputPath.replace(/^.+-(\d+)\.[a-z|0-9|\.]+$/gi, '$1'))
            : 0;
        if (Number.isNaN(copyIndex)) {
            copyIndex = 0;
        }
        /**
         * Iterate the index until the inputPath is unique
         */
        while (NodeFS.existsSync(this.changeBaseName(inputPath, uniqueBaseName))) {
            copyIndex++;
            uniqueBaseName = uniqueBaseName.replace(/-(\d+)$/gi, '')
                + `-${copyIndex}`;
        }
        /** RETURN **/
        return this.changeBaseName(inputPath, uniqueBaseName);
    }
}
//# sourceMappingURL=NodeFiles.js.map