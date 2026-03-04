/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { RecursiveMap, RecursiveRecord } from '../../types/objects/records.js';

export async function mapToObjectAsync<
    T_Keys extends keyof any,
    T_Values extends any,
>( map: Map<T_Keys, T_Values> ): Promise<Record<T_Keys, T_Values>>;

export async function mapToObjectAsync<
    T_Keys extends keyof any,
    T_Values extends any,
>( map: RecursiveMap<T_Keys, T_Values> ): Promise<RecursiveRecord<T_Keys, T_Values>>;

/**
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 * 
 * @since ___PKG_VERSION___
 */
export async function mapToObjectAsync<
    T_Keys extends keyof any,
    T_Values extends any,
>(
    map: Map<T_Keys, T_Values>,
): Promise<Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values>> {

    type Entry = [ T_Keys, T_Values | Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values> ];

    return Promise.all(
        Array.from( map.entries() ).map(
            async ( [ key, value ] ): Promise<Entry> => {
                // returns
                if ( !( value instanceof Map ) ) {
                    return [ key, value ];
                }

                return [ key, await mapToObjectAsync( value ) ];
            }
        )
    ).then(
        ( arr ) => Object.fromEntries( arr ) as Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values>
    );
}