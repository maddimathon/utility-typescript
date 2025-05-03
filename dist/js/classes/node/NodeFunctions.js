/**
 * @since 0.1.1
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
import { mergeArgs } from '../../functions/index.js';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { Functions } from '../Functions.js';
import { NodeConsole } from './NodeConsole.js';
import { NodeFiles } from './NodeFiles.js';
/**
 * A configurable class of utility functions.
 *
 * Can be extended, but probably best as a (static) property instead.
 */
export class NodeFunctions extends AbstractConfigurableClass {
    get ARGS_DEFAULT() {
        return {
            optsRecursive: false,
        };
    }
    /**
     * Build a complete args object.
     */
    buildArgs(args) {
        const mergedDefault = Functions.prototype.buildArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(mergedDefault, args, this.ARGS_DEFAULT.optsRecursive);
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * @param args   Optional. Configuration overrides.
     * @param utils  Optional. Configured instances of utility classes. Passing
     *               classes that you're already using is likely marginally more
     *               efficient.
     */
    constructor(args = {}, utils = {}) {
        var _a, _b, _c;
        super(args);
        this.fns = (_a = utils.fns) !== null && _a !== void 0 ? _a : new Functions(this.ARGS_DEFAULT);
        this.nc = (_b = utils.nc) !== null && _b !== void 0 ? _b : new NodeConsole(this.ARGS_DEFAULT);
        this.fs = (_c = utils.fs) !== null && _c !== void 0 ? _c : new NodeFiles(this.ARGS_DEFAULT);
        this.args = this.buildArgs(args);
    }
}
//# sourceMappingURL=NodeFunctions.js.map