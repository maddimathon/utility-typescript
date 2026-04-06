/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2.draft
 * @license MIT
 */
import { objectFlatten } from './objectFlatten.js';
import { deleteUndefinedProps } from './deleteUndefinedProps.js';
/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 *
 * @param obj     Object to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 *
 * @since 2.0.0-beta.2.draft
 */
export async function objectFlattenAsync(objPromise, args = {}) {
    return Promise.resolve(objPromise).then(async (obj) => {
        // returns
        if (typeof obj !== 'object' || !obj) {
            return obj;
        }
        const { 
        // prefix,
        separator = '-', suffix, key_addSuffix, key_validate_addPrefix, } = objectFlatten.parseArgs(args);
        return Promise.all(Object.keys(obj).map(async (t_key) => {
            const value = obj[t_key];
            const key = key_validate_addPrefix(t_key);
            // continues
            if (typeof value === 'undefined') {
                return false;
            }
            // continues
            if (typeof value !== 'object' || !value || Array.isArray(value)) {
                return [[key_addSuffix(key), value]];
            }
            return objectFlattenAsync(value, deleteUndefinedProps({
                ...args,
                prefix: String(key),
                separator,
                suffix,
            })).then(subObj => Object.entries(subObj));
        })).then(entries => Object.fromEntries(entries.filter(item => item !== false).flat()));
    });
}
//# sourceMappingURL=objectFlattenAsync.js.map