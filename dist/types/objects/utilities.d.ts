/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
/**
 * The expected shape for utilities (like the built-in console) that either
 * output or log messages.
 *
 * @since 2.0.0-beta.3
 */
export interface ConsoleUtility<T_OptionalParams extends [...any[]] = [...any[]]> extends ConsoleUtility.Mini<T_OptionalParams> {
}
/**
 * Utilities for the {@link ConsoleUtility} interface.
 *
 * @since 2.0.0-beta.3
 */
export declare namespace ConsoleUtility {
    /**
     * Method shapes for default console output messages.
     *
     * @since 2.0.0-beta.5.draft
     * @expand
     */
    type LoggerMethod<T_OptionalParams extends [...any[]]> = (msg: any, ...optionalParams: T_OptionalParams) => void;
    /**
     * The most minimal shape for a console utility wrapper.
     *
     * @since 2.0.0-beta.3
     */
    interface Mini<T_OptionalParams extends [...any[]] = any[]> {
        debug: LoggerMethod<T_OptionalParams>;
        error: LoggerMethod<T_OptionalParams>;
        log: LoggerMethod<T_OptionalParams>;
        /**
         * If this method exists, it should typically be an alias for
         * {@link ConsoleUtility.Mini.verbose}.
         */
        info?: LoggerMethod<T_OptionalParams>;
        warn: LoggerMethod<T_OptionalParams>;
        /**
         * This is intended as a better-named version of the typical
         * `console.info()` method.
         */
        verbose: LoggerMethod<T_OptionalParams>;
    }
    /**
     * Default required methods included for different 'levels' of output.
     *
     * N.B.: 'verbose' is used as a more discriptive version of default
     * loggers' 'info' method.
     *
     * @expand
     */
    type OutputMethod = 'debug' | 'error' | 'log' | 'verbose' | 'warn';
}
