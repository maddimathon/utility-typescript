/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
import { RecursiveRecord } from '../../types/objects/records.js';
/**
 * Sorts a record object according to its keys and returns a sorted copy.
 *
 * Optionally provide a function to create the strings used to sort each object.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare function objectKeySort<T_Obj extends Record<number | string, any> | RecursiveRecord<number | string, any>>(obj: T_Obj, recursive?: boolean, 
/**
 * Takes an object key and returns the value to use when sorting it.
 *
 * Use this to e.g., add padding to numbers before sorting as strings or to
 * sort 'primary', 'secondary', etc. as their numerical values.
 */
sortMaker?: (key: number | string) => string): T_Obj;
//# sourceMappingURL=objectKeySort.d.ts.map