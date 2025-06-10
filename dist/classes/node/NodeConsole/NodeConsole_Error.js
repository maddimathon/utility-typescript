/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
/**
 * Only used by {@link NodeConsole}.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}
 *
 * @since 2.0.0-alpha
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
    cause;
    /**
     * Represents the name for the type of error.
     */
    name = 'NodeConsole_Error';
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * @param args  Optional configuration.
     */
    constructor(msg, args) {
        super(msg);
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
    toJSON() {
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
    toString() {
        // returns
        if (!this.stack) {
            // returns
            if (!this.name) {
                return this.message;
            }
            // returns
            if (!this.message) {
                return this.name;
            }
            return `${this.name}: ${this.message}`;
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
    valueOf() { return this.toJSON(); }
}
//# sourceMappingURL=NodeConsole_Error.js.map