/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha
 * @license MIT
 */
import type { RecursivePartial } from '../../types/objects/index.js';
import { mergeArgs } from '../../functions/index.js';
/**
 * Classes with configurable options set in the constructor.
 *
 * @since 0.1.0
 *
 * @example
 * {@includeCode ./AbstractConfigurableClass.example.docs.ts#Example}
 */
export declare abstract class AbstractConfigurableClass<Args extends AbstractConfigurableClass.Args> {
    protected abstract get ARGS_DEFAULT(): Args;
    /**
     * A completed args object.
     *
     * @category Args
     */
    readonly args: Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<Args> | RecursivePartial<Args>): Args;
    /**
     * @param args  Optional configuration.
     *
     * @expandType Args
     */
    constructor(args?: Partial<Args> | RecursivePartial<Args>);
    /**
     * An alias for this package's {@link mergeArgs | mergeArgs()}.
     *
     * @category Aliases
     *
     * @function
     */
    mergeArgs: typeof mergeArgs;
    /**
     * Overrides the default function to return a string representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString(): string;
}
/**
 * Used only for {@link AbstractConfigurableClass}.
 *
 * @since 0.1.0
 */
export declare namespace AbstractConfigurableClass {
    /**
     * Optional configuration for {@link AbstractConfigurableClass}.
     *
     * @since 0.1.0
     */
    interface Args {
        /**
         * Whether the arguments should be merged recursively.
         */
        argsRecursive: boolean;
    }
}
//# sourceMappingURL=AbstractConfigurableClass.d.ts.map