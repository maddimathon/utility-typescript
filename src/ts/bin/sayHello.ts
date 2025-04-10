#!/usr/bin/env node
/**
 * An example function used on the command line.
 * 
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @since tmpl-0.1.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Testing command line scripts in the package.
 */
export default function ( args: {} ): void {
    console.log( 'hello' );
    console.log( 'args =', args );
}