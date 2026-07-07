/**
 * @since 2.0.0-beta.3
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { LoggerUtility } from '@maddimathon/universal-types';

import type { ConsoleUtility, TupleShift } from '../types/index.js';

/**
 * The simplest implementation of the {@link ConsoleUtility} interface, intended
 * as a fallback or to be extended.
 * 
 * @category Classes
 *
 * @since 2.0.0-beta.3
 */
export class MiniConsole implements ConsoleUtility {

    constructor () {
        this.debug = this.debug.bind( this );
        this.info = this.info.bind( this );
        this.log = this.log.bind( this );
        this.verbose = this.verbose.bind( this );
        this.warn = this.warn.bind( this );
    }

    public debug( ...params: TupleShift<Parameters<typeof this.output>> ): void {
        this.output( 'debug', ...params );
    }

    public error( ...params: TupleShift<Parameters<typeof this.output>> ): void {
        this.output( 'error', ...params );
    }

    /**
     * Alias for {@link MiniConsole.verbose}.
     */
    public info( ...params: Parameters<typeof this.verbose> ): void {
        this.verbose( ...params );
    }

    public log( ...params: TupleShift<Parameters<typeof this.output>> ): void {
        this.output( 'log', ...params );
    }

    /**
     * Generic base output method for other outputs.
     */
    protected output(
        via: LoggerUtility.OutputMethod,
        msg: any,
    ): void {
        console[ via === 'verbose' ? 'info' : via ]( msg );
    }

    public verbose( ...params: TupleShift<Parameters<typeof this.output>> ): void {
        this.output( 'verbose', ...params );
    }

    public warn( ...params: TupleShift<Parameters<typeof this.output>> ): void {
        this.output( 'warn', ...params );
    }
}