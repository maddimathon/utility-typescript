/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
import { objectFlatten } from './objectFlatten.js';
import { RecursiveRecord } from '../../types/objects/records.js';
/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 *
 * @param obj     Object to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 *
 * @since 2.0.0-beta.2
 */
export declare function objectFlattenAsync<T_Keys extends keyof any, T_Values extends any, T_Obj extends RecursiveRecord<T_Keys, T_Values> = RecursiveRecord<T_Keys, T_Values>>(objPromise: T_Obj | Promise<T_Obj>, args?: Partial<objectFlatten.Args>): Promise<{
    [key: string]: T_Values;
}>;
//# sourceMappingURL=objectFlattenAsync.d.ts.map