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

/**
 * Uses `Array.filter()` to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array
 *
 * @template I  Array item type.
 *
 * @param arr  To simplify.
 * @return  Unique array.
 */
export function arrayUnique<I>( arr: I[] ): I[] {
    // console.log( 'arrayUnique() arr = ', arr );

    return [ ...arr ].filter( ( v, i, a ) => a.indexOf( v ) === i );
}