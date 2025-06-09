/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';
import { timestamp } from './timestamp.js';

describe( 'timestamp()', () => {

    const date = new Date( '2025-04-01T16:00Z' );

    test( 'timestamp() - defaults', () => {

        // default should include time only
        expect( timestamp( date ) ).toBe( '12:00' );

        // default should include time only, so these should be equivalent
        expect( timestamp( date, { time: true } ) ).toBe( timestamp( date ) );

        // if date is true, time should default to false
        expect( timestamp( date, { date: true } ) ).toBe( '2025-04-01' );
    } );

    test( 'timestamp() - date formats', () => {

        const argifier = (
            dateFormat: Intl.DateTimeFormatOptions,
            args: timestamp.Args_Input = {},
        ): timestamp.Args_Input => (
            {
                ...args,

                date: true,
                format: {
                    ...args.format,
                    date: dateFormat,
                },
            }
        );

        // if date is true, time should default to false
        expect( timestamp( date, { date: true } ) ).toBe( '2025-04-01' );

        // misc configurations

        expect( timestamp( date, argifier( {
            year: '2-digit',
            month: 'short',
        } ) ) ).toBe( 'Apr 25' );

        expect( timestamp( date, argifier( {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
        } ) ) ).toBe( 'Apr 1, 25' );

        expect( timestamp( date, argifier( {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        } ) ) ).toBe( 'Tuesday, April 1, 2025' );

        expect( timestamp( date, argifier( {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }, { lang: 'fr-CA' } ) ) ).toBe( 'mardi 1 avril 2025' );
    } );

    test( 'timestamp() - time formats', () => {

        const argifier = (
            timeFormat: Intl.DateTimeFormatOptions,
            args: timestamp.Args_Input = {},
        ): timestamp.Args_Input => (
            {
                ...args,

                time: true,
                format: {
                    ...args.format,
                    time: timeFormat,
                },
            }
        );

        // time should default to true, date should default to false
        expect( timestamp( date ) ).toBe( '12:00' );

        // misc configurations

        expect( timestamp( date, argifier( {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'UTC',
            timeZoneName: 'short',
        } ) ) ).toBe( '4:00 p.m. UTC' );

        expect( timestamp( date, argifier( {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        } ) ) ).toBe( '12:00:00 p.m.' );

        expect( timestamp( date, argifier( {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'shortGeneric',
        } ) ) ).toBe( '12:00:00 ET' );

        expect( timestamp( date, argifier( {
            // hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'shortGeneric',
        }, { lang: 'fr-CA' } ) ) ).toBe( '12 h 00 HE' );
    } );

    test( 'timestamp() - date & time formats', () => {

        const argifier = ( args: timestamp.Args_Input ): timestamp.Args_Input => (
            {
                ...args,

                date: true,
                time: true,
            }
        );

        // time should default to true, date should default to false
        expect( timestamp( date, { date: true, time: true } ) ).toBe( '2025-04-01 @ 12:00' );

        // misc configuration with custom separator
        expect( timestamp( date, argifier( {

            format: {
                date: {
                    year: '2-digit',
                    month: 'short',
                },
                time: {
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'UTC',
                    timeZoneName: 'short',
                },
            },

            separator: ' -- ',

        } ) ) ).toBe( 'Apr 25 -- 4:00 p.m. UTC' );
    } );
} );