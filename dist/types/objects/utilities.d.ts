/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3
 * @license MIT
 */
/**
 * The expected shape for utilities (like the built-in console) that either
 * output or log messages.
 *
 * @since 2.0.0-beta.3
 */
export interface ConsoleUtility<T_OptionalParams extends readonly [...any[]] = [...any[]]> extends ConsoleUtility.Mini<T_OptionalParams> {
}
/**
 * Utilities for the {@link ConsoleUtility} interface.
 *
 * @since 2.0.0-beta.3
 */
export declare namespace ConsoleUtility {
    /**
     * @since 2.0.0-beta.3
     *
     * @expand
     */
    type LogMethod<T_OptionalParams extends readonly [...any[]]> = (msg: any, ...optionalParams: T_OptionalParams) => void;
    /**
     * Underlying method to use for message output.
     *
     * @expand
     */
    type OutputMethod = 'debug' | 'error' | 'info' | 'log' | 'warn';
    /**
     * The most minimal shape for a console utility wrapper.
     *
     * @since 2.0.0-beta.3
     */
    interface Mini<T_OptionalParams extends readonly [...any[]] = [...any[]]> {
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
