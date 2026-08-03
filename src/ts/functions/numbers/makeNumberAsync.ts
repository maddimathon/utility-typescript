/**
 * @since 2.0.0-beta.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { makeNumber } from './makeNumber.js';

/**
 * Makes any input a number if it can be made into a valid number (e.g., by
 * parsing a string).
 * 
 * @category Functions – String
 * 
 * @since 2.0.0-beta.2
 */
export async function makeNumberAsync( input: unknown ): Promise<null | number> {
    return makeNumber( input );
}