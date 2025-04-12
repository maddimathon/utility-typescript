/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type {  } from '../../types/string-literals/index.js';

import { mergeArgs } from '../objects/mergeArgs.js';

/**
 * Used only for {@link timestamp | timestamp()}.
 */
export namespace timestamp {

    /**
     * Optional configuation for {@link timestamp | timestamp()}.
     * 
     * @interface
     * @expand
     */
    export type Args = {

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
        lang: Intl.LocalesArgument;

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
     * @interface
     * @expand
     * 
     * @expandType timestamp.Args
     */
    export type Args_Input = Partial<Omit<Args, "format">> & {
        format?: Partial<Args[ 'format' ]>;
    };
}

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
 */
export function timestamp(
    date: Date | null = null,
    _args: timestamp.Args_Input = {},
): string {
    const DEFAULT_ARGS: timestamp.Args = {
        date: false,
        time: false,

        debug: false,

        format: mergeArgs( {
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
        } as timestamp.Args[ 'format' ], _args.format ?? {} ),

        lang: 'en-CA',

        separator: ' @ ',
    };

    const args = mergeArgs( DEFAULT_ARGS, _args as Partial<timestamp.Args> );

    if ( args.debug ) {
        console.log( 'timestamp() args =', args );
    }

    if ( date === null ) {
        date = new Date();
    }

    if ( !args.date && !args.time ) {
        args.time = true;
    }

    const formatted: string[] = [];

    if ( args.date ) {
        formatted.push( date.toLocaleString( args.lang, args.format.date ) );
    }

    if ( args.time ) {
        formatted.push( date.toLocaleString( args.lang, args.format.time ) );
    }

    if ( args.debug ) {
        console.log( 'timestamp() formatted =', formatted );
    }

    return formatted.join( args.separator );
}