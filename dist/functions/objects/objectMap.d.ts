/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
import type { ToEntry } from '../../types/index.js';
/**
 * A utility to map the values of an object using a callback function.
 *
 * @param obj       The object to map.
 * @param callback  The callback function used to define new values.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 * @since 2.0.0-beta.5.draft — Improved typing with {@link ToEntry} and callback overloading.
 *
 * @preventExpand ToEntry
 */
export declare function objectMap<T_InputObj extends object, T_Result extends unknown>(obj: T_InputObj, callback: (entry: ToEntry<T_InputObj>) => T_Result): {
    [K in keyof T_InputObj]: T_Result;
};
