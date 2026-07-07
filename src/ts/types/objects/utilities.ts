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

/**
 * The expected shape for utilities (like the built-in console) that either
 * output or log messages.
 * 
 * @since 2.0.0-beta.3
 */
export interface ConsoleUtility<
    T_OptionalParams extends [ ...any[] ] = [ ...any[] ]
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
 * @since 2.0.0-beta.3
 */
export namespace ConsoleUtility {

    /**
     * The most minimal shape for a console utility wrapper.
     * 
     * @since 2.0.0-beta.3
     */
    export interface Mini<
        T_OptionalParams extends [ ...any[] ] = any[]
    > extends LoggerUtility<T_OptionalParams> {
    }
}