/**
 * @since 2.0.0-beta.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursiveMap, RecursiveRecord } from '../../types/objects/records.js';

export function mapToObject<
    T_Keys extends keyof any,
    T_Values extends any,
>( map: Map<T_Keys, T_Values> ): Record<T_Keys, T_Values>;

export function mapToObject<
    T_Keys extends keyof any,
    T_Values extends any,
>( map: RecursiveMap<T_Keys, T_Values> ): RecursiveRecord<T_Keys, T_Values>;

/**
 * Converts a Map (and any of its Map children, recursively) to a simple object.
 * 
 * @category Functions – Map
 * 
 * @since 2.0.0-beta.2
 */
export function mapToObject<
    T_Keys extends keyof any,
    T_Values extends any,
>( map: Map<T_Keys, T_Values> | RecursiveMap<T_Keys, T_Values> ): Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values> {

    type Entry = [ T_Keys, T_Values | Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values> ];

    const entries = Array.from( map.entries() ).map(
        ( [ key, value ] ): Entry => {
            // returns
            if ( !( value instanceof Map ) ) {
                return [ key, value ];
            }

            return [
                key,
                mapToObject<T_Keys, T_Values>( value ),
            ];
        }
    ) satisfies Entry[];

    return Object.fromEntries( entries ) as Record<T_Keys, T_Values> | RecursiveRecord<T_Keys, T_Values>;
}