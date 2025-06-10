/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */

import type {
    RecursivePartial,
} from '../../types/objects/index.js';

import {
    mergeArgs,
} from '../../functions/index.js';


/**
 * Classes with configurable options set in the constructor.
 * 
 * @since 0.1.0
 * 
 * @example
 * {@includeCode ./AbstractConfigurableClass.example.docs.ts#Example}
 */
export abstract class AbstractConfigurableClass<
    Args extends AbstractConfigurableClass.Args,
> {


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
    public buildArgs( args?: Partial<Args> | RecursivePartial<Args> ): Args {

        const mergedDefault = this.ARGS_DEFAULT as Args;

        // using this.mergeArgs here can cause issues because 
        // this method is sometimes called from the prototype
        return mergeArgs( mergedDefault, args, this.ARGS_DEFAULT.argsRecursive );
    }



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
     * 
     * @function
     */
    public mergeArgs = mergeArgs;



    /* DEFAULT METHODS
     * ====================================================================== */

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
 * 
 * @since 0.1.0
 */
export namespace AbstractConfigurableClass {

    /**
     * Optional configuration for {@link AbstractConfigurableClass}.
     * 
     * @since 0.1.0
     */
    export interface Args {

        /**
         * Whether the arguments should be merged recursively.
         */
        argsRecursive: boolean;
    };
}