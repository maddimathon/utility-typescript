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
import { deleteUndefinedProps } from './../objects/deleteUndefinedProps.js';
/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 *
 * @category Functions – Map
 *
 * @since 2.0.0-beta.3.draft
 */
export async function mapFlattenAsync(mapPromise, args = {}) {
    return Promise.resolve(mapPromise).then(async (map) => {
        // returns
        if (!(map instanceof Map)) {
            return map;
        }
        const { 
        // prefix,
        separator = '-', suffix, key_addSuffix, key_validate_addPrefix, } = mapFlatten.parseArgs(args);
        return Promise.all(Array.from(map.entries()).map(async ([t_key, value]) => {
            const key = key_validate_addPrefix(t_key);
            // continues
            if (typeof value === 'undefined') {
                return [[key_addSuffix(key), value]];
            }
            // continues
            if (!(value instanceof Map)) {
                return [[key_addSuffix(key), value]];
            }
            return mapFlattenAsync(value, deleteUndefinedProps({
                ...args,
                prefix: String(key),
                separator,
                suffix,
            })).then(subMap => Array.from(subMap.entries()));
        })).then(entries => new Map(entries.flat()));
    });
}
