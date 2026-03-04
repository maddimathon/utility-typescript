/**
 * @since 2.0.0-beta.2.draft
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/design-system-utilities@___CURRENT_VERSION___
 * @license MIT
 */

import { RecursiveRecord } from '../../types/objects/records.js';

/**
 * Sorts a record object according to its keys and returns a sorted copy.
 *
 * Optionally provide a function to create the strings used to sort each object.
 * 
 * @since 2.0.0-beta.2.draft
 */
export async function objectKeySortAsync<
    T_Obj extends Record<number | string, any> | RecursiveRecord<number | string, any>
>(
    objPromise: T_Obj | Promise<T_Obj>,
    recursive: boolean = false,
    /**
     * Takes an object key and returns the value to use when sorting it.
     *
     * Use this to e.g., add padding to numbers before sorting as strings or to
     * sort 'primary', 'secondary', etc. as their numerical values.
     */
    sortMaker?: ( key: number | string ) => string,
): Promise<T_Obj> {

    type Entry = [ keyof T_Obj & number | string, T_Obj[ keyof T_Obj ] ];

    return Promise.resolve( objPromise ).then(
        async ( obj ) => {

            const entries: ( Entry | Promise<Entry> )[] = recursive
                ? Object.entries( obj ).map(
                    async ( [ key, value ] ) => {
                        // returns
                        if ( typeof value !== 'object' || value === null ) {
                            return [ key, value ];
                        }

                        // returns
                        if ( Array.isArray( value ) ) {
                            return [ key, value ];
                        }

                        return objectKeySortAsync( value, recursive, sortMaker ).then( newValue => [ key, newValue ] );
                    }
                )
                : Object.entries( obj );

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

            return Promise.all( entries ).then(
                toSort => Object.fromEntries( toSort.sort( sortFn ) ) as T_Obj
            );
        }
    );
}