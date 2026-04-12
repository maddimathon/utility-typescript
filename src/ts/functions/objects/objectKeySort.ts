/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursiveRecord } from '../../types/objects/records.js';

/**
 * Sorts a record object according to its keys and returns a sorted copy.
 * 
 * Optionally provide a function to create the strings used to sort each object.
 * 
 * @category Functions – Object
 * 
 * @since 2.0.0-beta.2
 */
export function objectKeySort<
    T_Obj extends Record<number | string, any> | RecursiveRecord<number | string, any>
>(
    obj: T_Obj,
    recursive: boolean = false,
    /**
     * Takes an object key and returns the value to use when sorting it.
     *
     * Use this to e.g., add padding to numbers before sorting as strings or to
     * sort 'primary', 'secondary', etc. as their numerical values.
     */
    sortMaker?: ( key: number | string ) => string,
): T_Obj {

    type Entry = [ keyof T_Obj & number | string, T_Obj[ keyof T_Obj ] ];

    let entries: Entry[] = Object.entries( obj );

    if ( recursive ) {
        entries = entries.map( ( [ key, value ] ) => {
            // returns
            if ( typeof value !== 'object' || value === null ) {
                return [ key, value ];
            }

            // returns
            if ( Array.isArray( value ) ) {
                return [ key, value ];
            }

            return [ key, objectKeySort( value, recursive, sortMaker ) ];
        } );
    }

    let sortFn = sortMaker
        ? ( a: Entry, b: Entry ) => {
            const sort_a = sortMaker( a[ 0 ] );
            const sort_b = sortMaker( b[ 0 ] );

            if ( sort_a > sort_b ) {
                return 1;
            }

            if ( sort_a < sort_b ) {
                return -1;
            }

            return 0;
        }
        : ( a: Entry, b: Entry ) => {

            if ( a[ 0 ] > b[ 0 ] ) {
                return 1;
            }

            if ( a[ 0 ] < b[ 0 ] ) {
                return -1;
            }

            return 0;
        };

    return Object.fromEntries( entries.sort( sortFn ) ) as T_Obj;
}