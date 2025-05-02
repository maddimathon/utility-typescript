/**
 * @since 0.9.0-draft
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
import { mergeArgs } from '../../functions/index.js';
import { RecursivePartial } from '../../types/objects/basics.js';
/**
 * Classes with configurable options set in the constructor.
 *
 * @example
 * class ExampleClass extends AbstractConfigurableClass<ExampleClassArgs> {
 *
 *
 *     /* PROPERTIES
 *      * ====================================================================== *\/
 *
 *     public get ARGS_DEFAULT(): ExampleClassArgs {
 *
 *         return {
 *             optsRecursive: false,
 *         };
 *     }
 *
 *     /**
 *      * Build a complete args object.
 *      *\/
 *     public buildArgs( args?: Partial<ExampleClassArgs> ): ExampleClassArgs {
 *
 *          const mergedDefault = AbstractConfigurableClass.abstractArgs(
 *              this.ARGS_DEFAULT
 *          ) as ExampleClassArgs;
 *
 *          // using this.mergeArgs here can cause issues because this method is
 *          // sometimes called from the prototype
 *          return mergeArgs(
 *              mergedDefault,
 *              args,
 *              this.ARGS_DEFAULT.optsRecursive
 *          );
 *     }
 *
 *
 *
 *     /* CONSTRUCTOR
 *      * ====================================================================== *\/
 *
 *     public constructor ( args: Partial<ExampleClassArgs> = {} ) {
 *         super( args );
 *     }
 * }
 */
export declare abstract class AbstractConfigurableClass<Args extends AbstractConfigurableClass.Args> {
    /**
     * Default arguments for new objects.
     *
     * @category Args
     */
    static abstractArgs(args?: Partial<AbstractConfigurableClass.Args>): AbstractConfigurableClass.Args;
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
    abstract buildArgs(args?: Partial<Args> | RecursivePartial<Args>): Args;
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
     */
    mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends Partial<D> | RecursivePartial<D>>(defaults: D, inputs?: I | undefined, recursive?: boolean | undefined): D & I;
    mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends Partial<D>>(defaults: D, inputs?: I | undefined, recursive?: false | undefined): D & I;
    mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends RecursivePartial<D>>(defaults: D, inputs: I | undefined, recursive: true): D & I;
    mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>>(defaults: D, inputs?: undefined, recursive?: boolean | undefined): D;
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON(): any;
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
 */
export declare namespace AbstractConfigurableClass {
    /**
     * Optional configuration for {@link AbstractConfigurableClass}.
     *
     * @since 0.9.0-draft
     *
     * @interface
     */
    type Args = {
        /**
         * Whether the arguments should be merged recursively.
         */
        optsRecursive: boolean;
    };
}
//# sourceMappingURL=AbstractConfigurableClass.d.ts.map