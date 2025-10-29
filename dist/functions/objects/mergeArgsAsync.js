/**
 * @since 2.0.0-beta.1.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1.draft
 * @license MIT
 */
import { arrayUnique } from '../arrays/arrayUnique.js';
/**
 * Returns an updated version of `defaults` merged with the contents of
 * `inputs`.
 *
 * Useful for parsing objects passed to functions with extra, optional options.
 * Preserves all input properties.
 *
 * Overloaded for better typing dependent on recursion.
 *
 * @category Arg Objects
 *
 * @since 0.1.0
 */
export async function mergeArgsAsync(defaults, inputs, recursive = false, mergeArrays = false) {
    // returns
    // invalid default object just returns the input (or empty object)
    if (typeof defaults !== 'object' || !defaults) {
        return { ...inputs ?? {} };
    }
    // returns
    // invalid or non-existant input means we can just return a copy of the defaults
    if (typeof inputs === 'undefined' || typeof inputs !== 'object' || !inputs) {
        return { ...defaults };
    }
    // merged, but not recursively
    const simpleMerge = {
        ...defaults,
        ...inputs,
    };
    // returns
    // no need to get deeper
    if (!recursive) {
        return simpleMerge;
    }
    const entries = Array.from(Object.entries(simpleMerge), async ([key, inputValue]) => {
        // returns
        // this is not in the defaults
        if (!(key in defaults)) {
            return [key, inputValue];
        }
        const defaultValue = defaults[key];
        // returns
        // this is not a property that needs recursion
        if (defaultValue === null
            || inputValue === null
            || typeof defaultValue === 'undefined'
            || typeof defaultValue !== 'object'
            || typeof inputValue === 'undefined'
            || typeof inputValue !== 'object') {
            return [key, inputValue];
        }
        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (Array.isArray(defaultValue)
            || Array.isArray(inputValue)) {
            if (mergeArrays
                && Array.isArray(defaultValue)
                && Array.isArray(inputValue)) {
                return [key, arrayUnique(defaultValue.concat(inputValue))];
            }
            return [key, inputValue];
        }
        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (typeof defaultValue.prototype !== 'undefined'
            || typeof inputValue.prototype !== 'undefined') {
            return [key, inputValue];
        }
        return mergeArgsAsync(defaultValue, inputValue, recursive, mergeArrays).then((value) => [key, value]);
    });
    return Promise.all(entries).then(Object.fromEntries);
}
//# sourceMappingURL=mergeArgsAsync.js.map