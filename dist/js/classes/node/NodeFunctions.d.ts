/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.1
 */
/*!
 * @maddimathon/utility-typescript@0.4.1
 * @license MIT
 */
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { Functions } from '../Functions.js';
import { NodeConsole } from './NodeConsole.js';
import { NodeFiles } from './NodeFiles.js';
/**
 * A configurable class of utility functions.
 *
 * Can be extended, but probably best as a (static) property instead.
 */
export declare class NodeFunctions extends AbstractConfigurableClass<NodeFunctions.Args> {
    /**
     * The instance of {@link Functions} used within this class.
     *
     * @category Classes
     */
    readonly fns: Functions;
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    readonly nc: NodeConsole;
    /**
     * The instance of {@link NodeFiles} used within this class.
     *
     * @category Classes
     */
    readonly fs: NodeFiles;
    get ARGS_DEFAULT(): {
        readonly argsRecursive: false;
    };
    /**
     * Build a complete args object.
     */
    buildArgs(args?: Partial<NodeFunctions.Args>): NodeFunctions.Args;
    /**
     * @param args   Optional. Configuration overrides.
     * @param utils  Optional. Configured instances of utility classes. Passing
     *               classes that you're already using is likely marginally more
     *               efficient.
     */
    constructor(args?: Partial<NodeFunctions.Args>, utils?: Partial<{
        fns: Functions;
        fs: NodeFiles;
        nc: NodeConsole;
    }>);
}
/**
 * Used only for {@link NodeFunctions}.
 */
export declare namespace NodeFunctions {
    /**
     * Optional configuration for {@link NodeFunctions}.
     */
    type Args = Functions.Args & {};
}
//# sourceMappingURL=NodeFunctions.d.ts.map