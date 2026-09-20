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
 * @experimental
 */
export function arrayCopy<T_Item extends any>( arr: T_Item[] ): T_Item[] {
    return [ ...arr ].map(
        item => Array.isArray( item ) ? arrayCopy( item ) as T_Item : item
    );
}