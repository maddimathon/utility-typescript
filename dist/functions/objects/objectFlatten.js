/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
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
export function objectFlatten(obj, args = {}) {
    // returns
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    const { 
    // prefix,
    separator = '-', suffix, key_addSuffix, key_validate_addPrefix, } = objectFlatten.parseArgs(args);
    const entries = [];
    for (const t_key of Object.keys(obj)) {
        const value = obj[t_key];
        const key = key_validate_addPrefix(t_key);
        // continues
        if (typeof value === 'undefined') {
            continue;
        }
        // continues
        if (typeof value !== 'object' || !value || Array.isArray(value)) {
            entries.push([key_addSuffix(key), value]);
            continue;
        }
        entries.push(...Object.entries(objectFlatten(value, {
            ...args,
            prefix: String(key),
            separator,
            suffix,
        })));
    }
    return Object.fromEntries(entries);
}
/**
 * Utilities for the {@link objectFlatten} function.
 *
 * @since 2.0.0-beta.2
 */
(function (objectFlatten) {
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
    objectFlatten.parseArgs = parseArgs;
})(objectFlatten || (objectFlatten = {}));
//# sourceMappingURL=objectFlatten.js.map