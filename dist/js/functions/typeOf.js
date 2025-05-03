/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.2.0
 */
/*!
 * @maddimathon/utility-typescript@0.2.0
 * @license MIT
 */
import { mergeArgs } from './objects/mergeArgs.js';
/**
 * An alias for the typeof keyword that returns additional options.
 *
 * @category  Debuggers
 *
 * @see {@link typeOf.Args}
 * @see {@link typeOf.TestType}
 * @see {@link typeOf.Return}
 *
 * @typeParam T  Type of the variable being checked.
 *
 * @param variable  To test for value type.
 * @param _args     Optional configuration. See {@link typeOf.Args}.
 *
 * @return Expanded type string.
 */
export function typeOf(variable, _args = {}) {
    const args = mergeArgs({
        distinguishArrays: true,
    }, _args, false);
    /*
     * BY VALUE
     */
    if (variable === null) {
        return 'null';
    }
    if (variable === undefined) {
        return 'undefined';
    }
    /*
     * BY TYPE
     */
    const typeOf = typeof variable;
    switch (typeOf) {
        case 'function':
            return typeof variable.prototype === 'undefined'
                ? 'function'
                : 'class';
        case 'number':
            // returns
            if (Number.isNaN(variable)) {
                return 'NaN';
            }
            return 'number';
        case 'object':
            // returns
            if (args.distinguishArrays && Array.isArray(variable)) {
                return 'array';
            }
            return 'object';
    }
    return typeOf;
}
//# sourceMappingURL=typeOf.js.map