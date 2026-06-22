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
        expect( timestamp( date, { date: false, time: true } ) ).toBe( timestamp( date ) );

        // if date is true, time should default to false
        expect( timestamp( date, { date: true } ) ).toBe( '2025-04-01' );
    } );

    test( 'timestamp() - date formats', () => {

        // if date is true, time should default to false
        expect( timestamp( date, { date: true } ) ).toBe( '2025-04-01' );

        // misc configurations
        expect( timestamp( date, {
            date: { year: false }
        } ) ).toBe( '04-01' );

        expect( timestamp( date, {
            date: { month: false }
        } ) ).toBe( '2025-01' );

        expect( timestamp( date, {
            date: { day: false }
        } ) ).toBe( '2025-04' );

        expect( timestamp( date, {
            date: { month: false, day: false }
        } ) ).toBe( '2025' );

        expect( timestamp( date, {
            date: { year: false, month: false }
        } ) ).toBe( '01' );

        expect( timestamp( date, {
            date: { year: false, day: false }
        } ) ).toBe( '04' );
    } );

    test( 'timestamp() - time formats', () => {

        // time should default to true, date should default to false
        expect( timestamp( date ) ).toBe( '12:00' );

        // misc configurations

        expect( timestamp( date, {
            time: { second: true },
        } ) ).toBe( '12:00:00' );

        expect( timestamp( date, {
            time: { minute: false },
        } ) ).toBe( '12' );

        expect( timestamp( date, {
            time: { hour12: true, minute: false },
        } ) ).toBe( '12 pm' );

        expect( timestamp( date, {
            time: { millisecond: true },
        } ) ).toBe( '12:00:00.000' );

        expect( timestamp( date, {
            time: { hour12: true, millisecond: true },
        } ) ).toBe( '12:00:00.000 pm' );

        expect( timestamp( date, {
            time: { hour12: { am: 'AM', pm: 'PM' }, second: true },
        } ) ).toBe( '12:00:00PM' );
    } );

    test( 'timestamp() - date & time formats', () => {

        // time should default to true, date should default to false
        expect( timestamp( date, { date: true, time: true } ) ).toBe( '2025-04-01 @ 12:00' );

        // misc configuration with custom separator
        expect( timestamp( date, {
            date: true,
            time: true,
            separator: ' at ',
        } ) ).toBe( '2025-04-01 at 12:00' );
    } );
} );