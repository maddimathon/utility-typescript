/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

import { describe, expect, test } from '@jest/globals';

import { softWrapText } from './softWrapText.js';
// import { VariableInspector } from '../../classes/VariableInspector.js';

describe( 'softWrapText', () => {

    test( 'without any newlines', () => {

        const wrappedText = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui',
            'eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula.',
            'Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            'Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet',
            'velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit',
            'amet dapibus nibh. Sed ultricies viverra nisi, in sodales mauris vehicula et.',
            'Maecenas ut pharetra orci.',
        ].join( '\n' );

        const longText = wrappedText.replace( /\n/g, ' ' );

        expect( softWrapText( longText, 80 ) ).toBe( wrappedText );
    } );

    test( 'with newlines', () => {

        const parts = [
            [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui',
                'eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula.',
                'Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ],
            [
                'Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet',
                'velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit',
                'amet dapibus nibh. Sed ultricies viverra nisi, in sodales mauris vehicula et.',
                'Maecenas ut pharetra orci.',
            ],
        ];

        const wrappedText = parts.map( p => p.join( '\n' ) ).join( '\n\n' );

        // VariableInspector.dump( { wrappedText } );

        const longText = parts.map( p => p.join( ' ' ) ).join( '\n\n' );

        // VariableInspector.dump( { longText } );

        // VariableInspector.dump( { 'softWrapText( longText, 80 )': softWrapText( longText, 80 ) } );

        expect( softWrapText( longText, 80 ) ).toBe( wrappedText );
    } );
} );