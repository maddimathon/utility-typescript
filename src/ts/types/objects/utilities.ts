/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * The expected shape for utilities (like the built-in console) that either
 * output or log messages.
 * 
 * @since ___PKG_VERSION___
 */
export interface ConsoleUtility<
    T_OptionalParams extends readonly [ ...any[] ] = [ ...any[] ]
> extends ConsoleUtility.Mini<T_OptionalParams> {
    // UPGRADE - add methods: assert, count, countReset
    // UPGRADE - add methods: dir, dirxml
    // UPGRADE - add methods: group, groupEnd
    // UPGRADE - add methods: table
    // UPGRADE - add methods: time, timeEnd, timeLog, timeStamp
    // UPGRADE - add methods: trace
}

/**
 * Utilities for the {@link ConsoleUtility} interface.
 * 
 * @since ___PKG_VERSION___
 */
export namespace ConsoleUtility {

    /**
     * @since ___PKG_VERSION___
     * 
     * @expand
     */
    export type LogMethod<
        T_OptionalParams extends readonly [ ...any[] ]
    > = ( msg: any, ...optionalParams: T_OptionalParams ) => void;

    /**
     * Underlying method to use for message output.
     * 
     * @expand
     */
    export type OutputMethod = 'debug' | 'error' | 'info' | 'log' | 'warn';

    /**
     * The most minimal shape for a console utility wrapper.
     * 
     * @since ___PKG_VERSION___
     */
    export interface Mini<
        T_OptionalParams extends readonly [ ...any[] ] = [ ...any[] ]
    > {
        debug: LogMethod<T_OptionalParams>;
        error: LogMethod<T_OptionalParams>;
        log: LogMethod<T_OptionalParams>;

        /**
         * If this method exists, it should typically be an alias for
         * {@link ConsoleUtility.verbose}.
         */
        info?: LogMethod<T_OptionalParams>;

        warn: LogMethod<T_OptionalParams>;

        /**
         * This is intended as a better-named version of the typical
         * `console.info()` method.
         */
        verbose: LogMethod<T_OptionalParams>;
    }
}