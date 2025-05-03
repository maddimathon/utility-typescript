/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.1.0
 */
/*!
 * @maddimathon/utility-typescript@0.1.0
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
export abstract class AbstractConfigurableClass<
    Args extends AbstractConfigurableClass.Args,
> {

    /* STATIC
     * ====================================================================== */

    /**
     * Default arguments for new objects.
     * 
     * @category Args
     */
    public static abstractArgs( args: Partial<AbstractConfigurableClass.Args> = {} ): AbstractConfigurableClass.Args {

        const ARGS_DEFAULT: AbstractConfigurableClass.Args = {
            optsRecursive: false,
        };

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            ARGS_DEFAULT,
            args,
            args.optsRecursive ?? ARGS_DEFAULT.optsRecursive
        );
    }



    /* PROPERTIES
     * ====================================================================== */

    protected abstract get ARGS_DEFAULT(): Args;

    /**
     * A completed args object.
     * 
     * @category Args
     */
    public readonly args: Args;

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public abstract buildArgs( args?: Partial<Args> | RecursivePartial<Args> ): Args;



    /* PROPERTIES
     * ====================================================================== */

    /**
     * @param args  Optional configuration.
     * 
     * @expandType Args
     */
    public constructor ( args: Partial<Args> | RecursivePartial<Args> = {} ) {
        this.args = this.buildArgs( args );
    }



    /* METHODS
     * ====================================================================== */

    /** 
     * An alias for this package's {@link mergeArgs | mergeArgs()}.
     * 
     * @category Aliases
     */
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends Partial<D> | RecursivePartial<D>,
    >(
        defaults: D,
        inputs?: I | undefined,
        recursive?: boolean | undefined,
    ): D & I;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends Partial<D>,
    >(
        defaults: D,
        inputs?: I | undefined,
        recursive?: false | undefined,
    ): D & I;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends RecursivePartial<D>,
    >(
        defaults: D,
        inputs: I | undefined,
        recursive: true,
    ): D & I;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
    >(
        defaults: D,
        inputs?: undefined,
        recursive?: boolean | undefined,
    ): D;
    public mergeArgs<
        V extends unknown,
        D extends mergeArgs.Obj<V>,
        I extends RecursivePartial<D>,
    >(
        defaults: D,
        inputs?: I | undefined,
        recursive: boolean = false,
    ): D & I {
        return mergeArgs( defaults, inputs, recursive );
    }



    /* DEFAULT METHODS
     * ====================================================================== */

    /**
     * The object shape used when converting to JSON.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    public toJSON(): any { return this; }

    /**
     * Overrides the default function to return a string representation of this
     * object.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    public toString(): string { return JSON.stringify( this, null, 4 ); }
}

/**
 * Used only for {@link AbstractConfigurableClass}.
 */
export namespace AbstractConfigurableClass {

    /**
     * Optional configuration for {@link AbstractConfigurableClass}.
     * 
     * @since 0.1.0
     * 
     * @interface
     */
    export type Args = {

        /**
         * Whether the arguments should be merged recursively.
         */
        optsRecursive: boolean;
    };
}