/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha
 * @license MIT
 */
/**
 * An alias for the typeof keyword that returns additional options.
 *
 * @category  Debuggers
 *
 * @typeParam T_Type  The possible types for the variable being tested. (This
 *                    helps restrict the results as applicable.)
 *
 * @param variable  To test for type.
 *
 * @return  Expanded type options.
 *
 * @since 0.1.0
 */
export function typeOf(variable) {
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
            if (Array.isArray(variable)) {
                return 'array';
            }
            return 'object';
    }
    return typeOf;
}
//# sourceMappingURL=typeOf.js.map