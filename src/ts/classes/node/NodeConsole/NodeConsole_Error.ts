/**
 * @since ___PKG_VERSION___
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

import type { Classify } from '../../../types/objects/classes.js';
import type { NodeConsole } from '../NodeConsole.js';

// import {
//     mergeArgs,
//     timeout,
// } from '../../../functions/index.js';


/**
 * Only used by {@link NodeConsole}.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}
 * 
 * @since ___PKG_VERSION___
 * 
 * @experimental
 * @internal
 */
export class NodeConsole_Error extends Error implements Classify<NodeConsole_Error.JSON> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * Represents the name for the type of error.
     */
    public override readonly cause: Error | undefined;

    /**
     * Represents the name for the type of error.
     */
    public override readonly name: string = 'NodeConsole_Error';

    // /**
    //  * A completed args object.
    //  * 
    //  * @category Args
    //  */
    // protected readonly args: NodeConsole_Error.Args;



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * @param args  Optional configuration.
     */
    public constructor ( msg: string, args: NodeConsole_Error.Args ) {
        super( msg );
        this.cause = args.cause;
    }



    /* LOCAL METHODS
     * ====================================================================== */



    /* DEFAULT METHODS
     * ====================================================================== */

    /**
     * The object shape used when converting to JSON.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    public toJSON(): Classify<NodeConsole_Error.JSON> {

        return {
            cause: this.cause,
            message: this.message,
            name: this.name,
        };
    }

    /**
     * Overrides the default function to return a string representation of this
     * object.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString | Error.prototype.toString()}
     */
    public override toString(): string {

        // returns
        if ( !this.stack ) {

            // returns
            if ( !this.name ) { return this.message; }

            // returns
            if ( !this.message ) { return this.name; }

            return `${ this.name }: ${ this.message }`;
        }

        return this.stack;
    }

    /**
     * Overrides the default function to return an object representation of this
     * object.
     * 
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf | Object.prototype.valueOf()}
     * @see {@link NodeConsole_Error.toJSON | NodeConsole_Error.toJSON()}
     */
    public override valueOf() { return this.toJSON(); }
}

/**
 * Used only for {@link NodeConsole_Error}.
 * 
 * @experimental
 */
export namespace NodeConsole_Error {

    /**
     * Optional configuration for {@link NodeConsole_Error}.
     */
    export type Args = Omit<ErrorOptions, "cause"> & {
        cause?: Error | undefined;
    };

    /**
     * Optional configuration for {@link NodeConsole_Error}.
     */
    export interface JSON {

        message: string;
        name: string;

        cause?: Error;
    };
}