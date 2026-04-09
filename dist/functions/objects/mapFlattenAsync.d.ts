/**
 * @since 2.0.0-beta.3.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import { mapFlatten } from './mapFlatten.js';
import { RecursiveMap } from '../../types/objects/records.js';
/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 *
 * @param map     Map to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 *
 * @since 2.0.0-beta.3.draft
 */
export declare function mapFlattenAsync<T_Keys extends number | string, T_Values extends any, T_Map extends RecursiveMap<T_Keys, T_Values> = RecursiveMap<T_Keys, T_Values>>(mapPromise: T_Map | Promise<T_Map>, args?: Partial<mapFlatten.Args>): Promise<Map<string, T_Values>>;
//# sourceMappingURL=mapFlattenAsync.d.ts.map