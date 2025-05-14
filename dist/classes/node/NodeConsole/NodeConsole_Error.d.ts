/**
 * @since 2.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
 * @license MIT
 */
import type { Classify } from '../../../types/objects/classes.js';
/**
 * Only used by {@link NodeConsole}.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}
 *
 * @since 2.0.0-draft
 *
 * @experimental
 * @internal
 */
export declare class NodeConsole_Error extends Error implements Classify<NodeConsole_Error.JSON> {
    /**
     * Represents the name for the type of error.
     */
    readonly cause: Error | undefined;
    /**
     * Represents the name for the type of error.
     */
    readonly name: string;
    /**
     * @param args  Optional configuration.
     */
    constructor(msg: string, args: NodeConsole_Error.Args);
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON(): Classify<NodeConsole_Error.JSON>;
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
    valueOf(): Classify<NodeConsole_Error.JSON>;
}
/**
 * Used only for {@link NodeConsole_Error}.
 *
 * @experimental
 */
export declare namespace NodeConsole_Error {
    /**
     * Optional configuration for {@link NodeConsole_Error}.
     */
    type Args = Omit<ErrorOptions, "cause"> & {
        cause?: Error | undefined;
    };
    /**
     * Optional configuration for {@link NodeConsole_Error}.
     */
    interface JSON {
        message: string;
        name: string;
        cause?: Error;
    }
}
//# sourceMappingURL=NodeConsole_Error.d.ts.map