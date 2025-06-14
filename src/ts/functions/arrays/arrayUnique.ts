/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Uses `Array.filter()` to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array.
 * 
 * @category Array Helpers
 * 
 * @source
 *
 * @typeParam T_ArrayItem  Array item type.
 *
 * @param arr  To simplify.
 * 
 * @return  Unique array.
 * 
 * @since 0.1.0
 */
export function arrayUnique<T_ArrayItem>( arr: T_ArrayItem[] ): T_ArrayItem[] {

    // returns
    if ( !Array.isArray( arr ) ) { return arr; }

    return [ ...arr ].filter( ( v, i, a ) => a.indexOf( v ) === i );
}