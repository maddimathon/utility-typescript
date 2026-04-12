/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/design-system-utilities@2.0.0-beta.3.draft
 * @license MIT
 */
import type { RecursiveRecord } from '../../types/objects/records.js';
/**
 * Sorts a record object according to its keys and returns a sorted copy.
 *
 * Optionally provide a function to create the strings used to sort each object.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 */
export declare function objectKeySortAsync<T_Obj extends Record<number | string, any> | RecursiveRecord<number | string, any>>(objPromise: T_Obj | Promise<T_Obj>, recursive?: boolean, 
/**
 * Takes an object key and returns the value to use when sorting it.
 *
 * Use this to e.g., add padding to numbers before sorting as strings or to
 * sort 'primary', 'secondary', etc. as their numerical values.
 */
sortMaker?: (key: number | string) => string): Promise<T_Obj>;
