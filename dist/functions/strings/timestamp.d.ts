/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.4
 * @license MIT
 */
import type { RecursivePartial } from '../../types/index.js';
/**
 * Formats a date in a predictable way.
 *
 * Meant for human-readable timestamps, not ISO or Unix, etc.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}  Used to format the string.
 *
 * @category Functions – String
 *
 * @param date   Optional. Date object to format. Defaults to now.
 * @param _args  Optional.
 *
 * @return  Formatted date string.
 *
 * @since 0.1.0
 */
export declare function timestamp(date?: Date | null, _args?: Partial<timestamp.Args> | RecursivePartial<timestamp.Args>): string;
/**
 * Used only for {@link timestamp} function.
 *
 * @category Functions – String
 *
 * @since 0.1.0
 */
export declare namespace timestamp {
    /**
     * Optional configuation for {@link timestamp} function.
     *
     * @since 0.1.0
     * @since 2.0.0-beta.3 — Removed lang property.  Removed format property to be date & time property options and changed params from the JS {@link Intl.DateTimeFormatOptions} to simplify and stick to ISO-ish timestamps.
     */
    interface Args {
        /**
         * Whether to inlude the date in the timestamp.
         *
         * If both date and time are false, the time will be included anyway.
         *
         * @default false
         */
        date: boolean | Partial<Args.Format.Date>;
        /**
         * Outputs some var dumps to the console.
         *
         * @internal
         *
         * @default false
         */
        debug?: undefined | boolean;
        /**
         * Whether to inlude the time in the timestamp.
         *
         * If both date and time are false, the time will be included anyway.
         *
         * @default false
         */
        time: boolean | Partial<Args.Format.Time>;
        /**
         * String that joins the date and time stamps, if applicable.
         *
         * @default ' @ '
         */
        separator: string;
    }
    /**
     * Utility types for the {@link Args} type.
     *
     * @since 2.0.0-beta.3
     */
    namespace Args {
        /**
         * Utility types for defining output formats in the {@link Args} type.
         *
         * @since 2.0.0-beta.3
         */
        namespace Format {
            /**
             * Format argument for date output.
             *
             * @since 2.0.0-beta.3
             */
            interface Date {
                year: boolean;
                month: boolean;
                day: boolean;
            }
            /**
             * Format argument for time output.
             *
             * @since 2.0.0-beta.3
             */
            interface Time {
                hour12: boolean | {
                    am: string;
                    pm: string;
                };
                hour: boolean;
                minute: boolean;
                second: boolean;
                millisecond: boolean;
            }
            /**
             * Default format argument values.
             *
             * @since 2.0.0-beta.3
             */
            const DEFAULTS: {
                readonly date: {
                    readonly year: true;
                    readonly month: true;
                    readonly day: true;
                };
                readonly time: {
                    readonly hour12: {
                        am: ' am';
                        pm: ' pm';
                    };
                    readonly hour: true;
                    readonly minute: true;
                    readonly second: false;
                    readonly millisecond: false;
                };
            };
        }
    }
}
