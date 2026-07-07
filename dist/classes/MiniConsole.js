/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5
 * @license MIT
 */
/**
 * The simplest implementation of the {@link ConsoleUtility} interface, intended
 * as a fallback or to be extended.
 *
 * @category Classes
 *
 * @since 2.0.0-beta.3
 */
export class MiniConsole {
    constructor() {
        this.debug = this.debug.bind(this);
        this.error = this.error.bind(this);
        this.info = this.info.bind(this);
        this.log = this.log.bind(this);
        this.verbose = this.verbose.bind(this);
        this.warn = this.warn.bind(this);
    }
    debug(...params) {
        this.output('debug', ...params);
    }
    error(...params) {
        this.output('error', ...params);
    }
    /**
     * Alias for {@link MiniConsole.verbose}.
     */
    info(...params) {
        this.verbose(...params);
    }
    log(...params) {
        this.output('log', ...params);
    }
    /**
     * Generic base output method for other outputs.
     */
    output(via, msg) {
        console[via === 'verbose' ? 'info' : via](msg);
    }
    verbose(...params) {
        this.output('verbose', ...params);
    }
    warn(...params) {
        this.output('warn', ...params);
    }
}
