/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha
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
export declare class NodeConsole_Error extends Error {
    /**
     * Represents the name for the type of error.
     */
    readonly cause: unknown;
    /**
     * Represents the name for the type of error.
     */
    readonly name: string;
    /**
     * @param args  Optional configuration.
     */
    constructor(msg: string, args: {
        cause?: unknown;
    });
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON(): {
        cause: unknown;
        message: string;
        name: string;
    };
    /**
     * Overrides the default function to return a string representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString | Error.prototype.toString()}
     */
    toString(): string;
    /**
     * Overrides the default function to return an object representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf | Object.prototype.valueOf()}
     * @see {@link NodeConsole_Error.toJSON | NodeConsole_Error.toJSON()}
     */
    valueOf(): {
        cause: unknown;
        message: string;
        name: string;
    };
}
//# sourceMappingURL=NodeConsole_Error.d.ts.map