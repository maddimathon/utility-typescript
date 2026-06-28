/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { objectKeySort } from '../objects/objectKeySort.js';

/**
 * Uses {@link Array.filter} to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array.
 * 
 * @category Functions – Array
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
 * @since ___PKG_VERSION___ — Added optional args param.
 */
export function arrayUnique<T_ArrayItem>(
    arr: T_ArrayItem[],
    args: Partial<arrayUnique.Args> = {},
): T_ArrayItem[] {

    // returns
    if ( !Array.isArray( arr ) ) { return arr; }

    const {
        compareViaJson = false,
    } = args;

    // returns
    if ( !compareViaJson ) {
        return [ ...arr ].filter( ( v, i, a ) => a.indexOf( v ) === i );
    }

    const stringify = ( value: any ) => JSON.stringify(
        typeof value === 'object'
            ? Array.isArray( value )
                ? value.sort()
                : objectKeySort( JSON.parse( JSON.stringify( value ) ) )
            : value
    );

    const jsonArr = [ ...arr ].map( stringify );

    return [ ...arr ].filter( ( v, i ) => jsonArr.indexOf( stringify( v ) ) === i );
}

/**
 * Utilities for the {@link arrayUnique} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace arrayUnique {

    /**
     * @since ___PKG_VERSION___
     */
    export type Args = {
        /**
         * Whether to check for uniqueness by comparing JSON strings.
         * 
         * @experimental
         */
        compareViaJson?: boolean;
    };
}