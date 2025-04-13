/**
 * @since tmpl-0.1.1
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';

import { Functions } from '../Functions.js';


/**
 * Used only for {@link NodeFunctions}.
 */
export namespace NodeFunctions {

    /**
     * Optional configuration for {@link NodeFunctions}.
     * 
     * @interface
     */
    export type Args = Functions.Args & {
    };
}

/**
 * A configurable class of utility functions.
 * 
 * Can be extended, but probably best as a (static) property instead.
 */
export class NodeFunctions extends AbstractConfigurableClass<NodeFunctions.Args> {


    /* PROPERTIES
     * ====================================================================== */

    /**
     * A completed args object.
     * 
     * @category Classes
     */
    public readonly fns: Functions;

    /**
     * A completed args object.
     * 
     * @category Args
     */
    public override readonly args: NodeFunctions.Args;

    public get ARGS_DEFAULT(): NodeFunctions.Args {

        return {
            optsRecursive: false,
        };
    }

    /**
     * Build a complete args object.
     */
    public buildArgs( args?: Partial<NodeFunctions.Args> ): NodeFunctions.Args {

        const mergedDefault: NodeFunctions.Args = Functions.prototype.buildArgs( this.ARGS_DEFAULT );

        return this.mergeArgs(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (
        args: Partial<NodeFunctions.Args> = {},
        fns: Functions | null = null,
    ) {
        super( args );
        this.fns = fns ?? new Functions( this.ARGS_DEFAULT );


        this.args = this.buildArgs( args );
    }



    /* METHODS
     * ====================================================================== */
}