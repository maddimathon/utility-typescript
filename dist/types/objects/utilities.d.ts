/**
 * @since 2.0.0-beta.3
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
import type { LoggerUtility } from '@maddimathon/universal-types';
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
     * The most minimal shape for a console utility wrapper.
     *
     * @since 2.0.0-beta.3
     */
    interface Mini<T_OptionalParams extends [...any[]] = any[]> extends LoggerUtility<T_OptionalParams> {
    }
}
