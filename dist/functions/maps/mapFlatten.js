/**
 * @since 2.0.0-beta.3.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import { deleteUndefinedProps } from './../objects/deleteUndefinedProps.js';
/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 *
 * @category Functions – Map
 *
 * @since 2.0.0-beta.3.draft
 */
export function mapFlatten(map, args = {}) {
    // returns
    if (!(map instanceof Map) || !map) {
        return map;
    }
    const { 
    // prefix,
    separator = '-', suffix, key_addSuffix, key_validate_addPrefix, } = mapFlatten.parseArgs(args);
    const entries = [];
    for (const [t_key, value] of map.entries()) {
        const key = key_validate_addPrefix(t_key);
        // continues
        if (typeof value === 'undefined') {
            continue;
        }
        // continues
        if (!(value instanceof Map)) {
            entries.push([key_addSuffix(key), value]);
            continue;
        }
        entries.push(...mapFlatten(value, deleteUndefinedProps({
            ...args,
            prefix: key,
            separator,
            suffix,
        })).entries());
    }
    return new Map(entries);
}
/**
 * Utilities for the {@link mapFlatten} function.
 *
 * @category Functions – Map
 *
 * @since 2.0.0-beta.3.draft
 */
(function (mapFlatten) {
    function parseArgs(args = {}) {
        const { prefix, separator = '-', suffix, } = args;
        return {
            prefix,
            separator,
            suffix,
            key_addSuffix: (key) => {
                key = String(key);
                const _includeSuffix = !!suffix?.length;
                // returns
                if (key.length < 1) {
                    return _includeSuffix ? suffix : '';
                }
                return _includeSuffix ? `${key}${separator}${suffix}` : key;
            },
            key_validate_addPrefix: (key) => [
                prefix,
                key === '$' ? '' : String(key),
            ].filter(v => v?.length).join(separator),
        };
    }
    mapFlatten.parseArgs = parseArgs;
})(mapFlatten || (mapFlatten = {}));
