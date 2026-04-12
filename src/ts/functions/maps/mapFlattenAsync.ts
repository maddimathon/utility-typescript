/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { mapFlatten } from './mapFlatten.js';

import type { RecursiveMap } from '../../types/objects/records.js';
import { deleteUndefinedProps } from './../objects/deleteUndefinedProps.js';

/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 * 
 * @category Functions – Map
 * 
 * @since ___PKG_VERSION___
 */
export async function mapFlattenAsync<
    T_Keys extends number | string,
    T_Values extends any,
    T_Map extends RecursiveMap<T_Keys, T_Values> = RecursiveMap<T_Keys, T_Values>,
>(
    mapPromise: T_Map | Promise<T_Map>,
    args: Partial<mapFlatten.Args> = {},
): Promise<Map<string, T_Values>> {

    return Promise.resolve( mapPromise ).then(
        async ( map ): Promise<Map<string, T_Values>> => {
            // returns
            if ( !( map instanceof Map ) ) {
                return map as Map<string, T_Values>;
            }

            const {
                // prefix,
                separator = '-',
                suffix,

                key_addSuffix,
                key_validate_addPrefix,
            } = mapFlatten.parseArgs( args );

            return Promise.all(
                Array.from( map.entries() ).map(
                    async ( [ t_key, value ] ): Promise<[ string, T_Values ][]> => {

                        const key = key_validate_addPrefix( t_key );

                        // continues
                        if ( typeof value === 'undefined' ) {
                            return [ [ key_addSuffix( key ), value as T_Values ] ];
                        }

                        // continues
                        if ( !( value instanceof Map ) ) {
                            return [ [ key_addSuffix( key ), value ] ];
                        }

                        return mapFlattenAsync<T_Keys, T_Values>(
                            value as RecursiveMap<T_Keys, T_Values>,
                            deleteUndefinedProps( {
                                ...args,
                                prefix: String( key ),
                                separator,
                                suffix,
                            } ),
                        ).then(
                            subMap => Array.from( subMap.entries() )
                        );
                    }
                )
            ).then(
                entries => new Map<string, T_Values>( entries.flat() )
            );
        }
    );
}