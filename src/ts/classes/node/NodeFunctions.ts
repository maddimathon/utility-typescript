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

import { mergeArgs } from '../../functions/index.js';

import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';

import { Functions } from '../Functions.js';
import { NodeConsole } from './NodeConsole.js';


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
     * The instance of {@link Functions} used within this class.
     * 
     * @category Classes
     */
    public readonly fns: Functions;

    /**
     * The instance of {@link NodeConsole} used within this class.
     * 
     * @category Classes
     */
    public readonly nc: NodeConsole;

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

        const mergedDefault: NodeFunctions.Args = Functions.prototype.buildArgs(
            this.ARGS_DEFAULT
        );

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * @param args   Optional. Configuration overrides.
     * @param utils  Optional. Configured instances of utility classes. Passing 
     *               classes that you're already using is likely marginally more 
     *               efficient.
     */
    public constructor (
        args: Partial<NodeFunctions.Args> = {},
        utils: Partial<{
            fns: Functions;
            nc: NodeConsole;
        }> = {},
    ) {
        super( args );

        this.fns = utils.fns ?? new Functions( this.ARGS_DEFAULT );
        this.nc = utils.nc ?? new NodeConsole( this.ARGS_DEFAULT );

        this.args = this.buildArgs( args );
    }



    /* METHODS
     * ====================================================================== */
}