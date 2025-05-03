/**
 * @since 0.1.0
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

import { describe, expect, test } from '@jest/globals';

import { slugify } from './slugify.js';

describe( 'slugify', () => {

    test( 'a accents', () => {
        expect( slugify( 'ÀÁÂÄÃÆÅĀàáâäãæåā' ) ).toBe( 'aaaaaaaaaaaaaaaa' );
    } );

    test( 'e accents', () => {
        expect( slugify( 'ÈÉÊËĒĖĘèéêëēėę' ) ).toBe( 'eeeeeeeeeeeeee' );
    } );

    test( 'i accents', () => {
        expect( slugify( 'ÎÏÍĪĮÌîïíīįì' ) ).toBe( 'iiiiiiiiiiii' );
    } );

    test( 'o accents', () => {
        expect( slugify( 'ÔÖÒÓŒØŌÕôöòóœøōõ' ) ).toBe( 'oooooooooooooooo' );
    } );

    test( 'u accents', () => {
        expect( slugify( 'ÛÜÙÚŪûüùúū' ) ).toBe( 'uuuuuuuuuu' );
    } );

    test( 'n accents', () => {
        expect( slugify( 'ÑŃñń' ) ).toBe( 'nnnn' );
    } );

    test( 'ampersands', () => {
        expect( slugify( 'something & something else' ) ).toBe( 'something-and-something-else' );
    } );

    test( 'punctuation converted to dashes', () => {
        expect( slugify( 'eXamPle(-–—_:;/) 2346' ) ).toBe( 'example-2346' );
    } );

    test( 'all the rest', () => {
        expect( slugify( '- hello – — _ : there ; / 56498d *%$#' ) ).toBe( 'hello-there-56498d' );
    } );
} );