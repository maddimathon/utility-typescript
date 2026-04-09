/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
/**
 * Makes any input a number if it can be made into a valid number (e.g., by
 * parsing a string).
 *
 * @since 2.0.0-beta.2
 */
export function makeNumber(input) {
    // returns
    if (typeof input === 'number') {
        return input;
    }
    const _str = String(input).replace(/[^\d\.\,]+/gi, '');
    // returns
    if (!_str.length) {
        return null;
    }
    const num = Number(_str);
    // returns
    if (!Number.isNaN(num)) {
        return num;
    }
    return null;
}
//# sourceMappingURL=makeNumber.js.map