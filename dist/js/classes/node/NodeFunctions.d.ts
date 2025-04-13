/**
 * @since tmpl-0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.9.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.9.0-draft
 * @license MIT
 */
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { Functions } from '../Functions.js';
/**
 * Used only for {@link NodeFunctions}.
 */
export declare namespace NodeFunctions {
    /**
     * Optional configuration for {@link NodeFunctions}.
     *
     * @interface
     */
    type Args = Functions.Args & {};
}
/**
 * A configurable class of utility functions.
 *
 * Can be extended, but probably best as a (static) property instead.
 */
export declare class NodeFunctions extends AbstractConfigurableClass<NodeFunctions.Args> {
    /**
     * A completed args object.
     *
     * @category Classes
     */
    readonly fns: Functions;
    /**
     * A completed args object.
     *
     * @category Args
     */
    readonly args: NodeFunctions.Args;
    get ARGS_DEFAULT(): NodeFunctions.Args;
    /**
     * Build a complete args object.
     */
    buildArgs(args?: Partial<NodeFunctions.Args>): NodeFunctions.Args;
    constructor(args?: Partial<NodeFunctions.Args>, fns?: Functions | null);
}
//# sourceMappingURL=NodeFunctions.d.ts.map