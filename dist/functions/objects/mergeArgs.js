/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta
 * @license MIT
 */
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
export function mergeArgs(defaults, inputs, recursive = false) {
    // invalid default object becomes an empty object
    if (typeof defaults !== 'object' || !defaults) {
        defaults = {};
    }
    // returns
    // invalid or non-existant input means we can just return a copy of the defaults
    if (typeof inputs === 'undefined' || typeof inputs !== 'object' || !inputs) {
        return { ...defaults };
    }
    // merged, but not recursively
    const result = {
        ...defaults,
        ...inputs,
    };
    // returns
    // no need to get any deeper than that
    if (!recursive) {
        return result;
    }
    const defaultKeys = Object.keys(defaults);
    for (const key of defaultKeys) {
        // continues
        // no override value for this key was input
        if (!(key in inputs) || inputs[key] === undefined) {
            continue;
        }
        const defaultValue = defaults[key];
        const inputValue = inputs[key];
        // continues
        // this is not a property that needs recursion
        if (defaultValue === null
            || inputValue === null
            || typeof defaultValue === 'undefined'
            || typeof defaultValue !== 'object'
            || typeof inputValue === 'undefined'
            || typeof inputValue !== 'object') {
            continue;
        }
        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (typeof defaultValue.prototype !== 'undefined'
            || typeof inputValue.prototype !== 'undefined') {
            continue;
        }
        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (Array.isArray(defaultValue)
            || Array.isArray(inputValue)) {
            continue;
        }
        // get deep
        result[key] = mergeArgs(defaultValue, inputValue, recursive);
    }
    return result;
}
//# sourceMappingURL=mergeArgs.js.map