/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.draft
 * @license MIT
 */
import type { LangLocaleCode } from '../../types/string-literals/index.js';
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
export declare function timestamp(date?: Date | null, _args?: timestamp.Args_Input): string;
/**
 * Used only for {@link timestamp | timestamp()}.
 *
 * @since 0.1.0
 */
export declare namespace timestamp {
    /**
     * Optional configuation for {@link timestamp | timestamp()}.
     *
     * @since 0.1.0
     */
    type Args = {
        /**
         * Whether to inlude the date in the timestamp.
         *
         * If both date and time are false, the time will be included anyway.
         *
         * @default false
         */
        date: boolean;
        /**
         * Outputs some var dumps to the console.
         *
         * @internal
         *
         * @default false
         */
        debug: boolean;
        /**
         * Whether to inlude the time in the timestamp.
         *
         * If both date and time are false, the time will be included anyway.
         *
         * @default false
         */
        time: boolean;
        /**
         * Formatting options for the date and time portions of the timestamp.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options | DateTimeFormatOptions}  Options for JS date formats.
         */
        format: {
            /**
             * @default
             * { year: 'numeric', month: '2-digit', day: '2-digit' }
             */
            date: Intl.DateTimeFormatOptions;
            /**
             * @default { hour12: false, hour: '2-digit', minute: '2-digit' }
             */
            time: Intl.DateTimeFormatOptions;
        };
        /**
         * Language code used to localize the formatted date.
         *
         * Passed to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales | MDN} for allowed values.
         *
         * @default 'en-CA'
         */
        lang: LangLocaleCode;
        /**
         * String that joins the date and time stamps, if applicable.
         *
         * @default ' @ '
         */
        separator: string;
    };
    /**
     * A partial-ized version of {@link timestamp.Args}. Used for the
     * {@link timestamp | timestamp()} optional input args.
     *
     * @since 0.1.0
     */
    type Args_Input = Partial<Omit<Args, "format">> & {
        format?: Partial<Args['format']>;
    };
}
//# sourceMappingURL=timestamp.d.ts.map