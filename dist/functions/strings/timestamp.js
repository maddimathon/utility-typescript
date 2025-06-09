/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.draft
 * @license MIT
 */
import { mergeArgs } from '../objects/mergeArgs.js';
/**
 * Formats a date in a predictable way.
 *
 * Meant for human-readable timestamps, not ISO or Unix, etc.
 *
 * @category Formatters
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}  Used to format the string.
 *
 * @param date   Optional. Date object to format. Defaults to now.
 * @param _args  Optional.
 *
 * @return  Formatted date string.
 *
 * @since 0.1.0
 */
export function timestamp(date = null, _args = {}) {
    const DEFAULT_ARGS = {
        date: false,
        time: false,
        debug: false,
        format: mergeArgs({
            date: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            },
            time: {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit',
            },
        }, _args.format ?? {}),
        lang: 'en-CA',
        separator: ' @ ',
    };
    const args = mergeArgs(DEFAULT_ARGS, _args);
    if (args.debug) {
        console.log('timestamp() args =', args);
    }
    if (date === null) {
        date = new Date();
    }
    if (!args.date && !args.time) {
        args.time = true;
    }
    const formatted = [];
    if (args.date) {
        formatted.push(date.toLocaleString(args.lang, args.format.date));
    }
    if (args.time) {
        formatted.push(date.toLocaleString(args.lang, args.format.time));
    }
    if (args.debug) {
        console.log('timestamp() formatted =', formatted);
    }
    return formatted.join(args.separator);
}
//# sourceMappingURL=timestamp.js.map