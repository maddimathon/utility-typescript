/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Makes any input a number if it can be made into a valid number (e.g., by
 * parsing a string).
 *
 * @since ___PKG_VERSION___
 */
export function makeNumber( input: unknown ): null | number {
    // returns
    if ( typeof input === 'number' ) {
        return input;
    }

    const _str = String( input ).replace( /[^\d\.\,]+/gi, '' );

    // returns
    if ( !_str.length ) {
        return null;
    }

    const num = Number( _str );

    // returns
    if ( !Number.isNaN( num ) ) {
        return num;
    }

    return null;
}