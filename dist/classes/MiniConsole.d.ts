/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3
 * @license MIT
 */
import type { ConsoleUtility, TupleShift } from '../types/index.js';
/**
 * The simplest implementation of the {@link ConsoleUtility} interface, intended
 * as a fallback or to be extended.
 *
 * @category Classes
 *
 * @since 2.0.0-beta.3
 */
export declare class MiniConsole implements ConsoleUtility {
    constructor();
    debug(...params: TupleShift<Parameters<typeof this.output>>): void;
    error(...params: TupleShift<Parameters<typeof this.output>>): void;
    /**
     * Alias for {@link MiniConsole.verbose}.
     */
    info(...params: Parameters<typeof this.verbose>): void;
    log(...params: TupleShift<Parameters<typeof this.output>>): void;
    /**
     * Generic base output method for other outputs.
     */
    protected output(via: ConsoleUtility.OutputMethod, msg: any): void;
    verbose(...params: TupleShift<Parameters<typeof this.output>>): void;
    warn(...params: TupleShift<Parameters<typeof this.output>>): void;
}
