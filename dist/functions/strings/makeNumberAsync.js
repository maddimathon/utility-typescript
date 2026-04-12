/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
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
export async function makeNumberAsync(input) {
    return makeNumber(input);
}
