/**
 * @since ___PKG_VERSION___
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
 * @since ___PKG_VERSION___
 */
export async function makeNumberAsync( input: unknown ): Promise<null | number> {
    return makeNumber( input );
}