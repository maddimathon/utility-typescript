/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { NodeConsole } from '../NodeConsole.js';


/**
 * Only used by {@link NodeConsole}.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}
 * 
 * @since ___PKG_VERSION___
 * 
 * @experimental
 * @internal
 * @private
 */
export class NodeConsole_Error extends Error {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * Represents the name for the type of error.
     */
    public override readonly cause: unknown;

    /**
     * Represents the name for the type of error.
     */
    public override readonly name: string = 'NodeConsole_Error';



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * @param args  Optional configuration.
     */
    public constructor ( msg: string, args: { cause?: unknown; } ) {
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
    public toJSON() {

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