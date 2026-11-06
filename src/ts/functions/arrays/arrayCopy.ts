/**
 * @since 2.0.0-beta.6
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */


/**
 * Recursively copies an array and its array children via [ ...arr ].
 * 
 * @since 2.0.0-beta.6
 */
export function arrayCopy<T_Array extends any[]>( arr: T_Array ): T_Array {

    return [ ...arr ].map(
        <T_Item extends T_Array[ number ]>(
            item: T_Item,
        ): T_Item => Array.isArray( item ) ? arrayCopy( item ) : item
    ) as T_Array;
}