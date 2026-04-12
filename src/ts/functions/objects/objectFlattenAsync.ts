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

import { deleteUndefinedProps } from './deleteUndefinedProps.js';
import { objectFlatten } from './objectFlatten.js';

/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 * 
 * @category Functions – Object
 * 
 * @since 2.0.0-beta.2
 */
export async function objectFlattenAsync<
    T_Keys extends keyof any,
    T_Values extends any,
    T_Obj extends RecursiveRecord<T_Keys, T_Values> = RecursiveRecord<T_Keys, T_Values>,
>(
    objPromise: T_Obj | Promise<T_Obj>,
    args: Partial<objectFlatten.Args> = {},
): Promise<{ [ key: string ]: T_Values; }> {

    return Promise.resolve( objPromise ).then(
        async ( obj ) => {

            // returns
            if ( typeof obj !== 'object' || !obj ) {
                return obj;
            }

            const {
                // prefix,
                separator = '-',
                suffix,

                key_addSuffix,
                key_validate_addPrefix,
            } = objectFlatten.parseArgs( args );

            return Promise.all(
                Object.keys( obj ).map(
                    async ( t_key ): Promise<[ string, T_Values ][]> => {

                        const value = obj[ t_key as T_Keys ] as undefined | T_Values;
                        const key = key_validate_addPrefix( t_key );

                        // continues
                        if ( typeof value === 'undefined' ) {
                            return [ [ key_addSuffix( key ), value as T_Values ] ];
                        }

                        // continues
                        if ( typeof value !== 'object' || !value || Array.isArray( value ) ) {
                            return [ [ key_addSuffix( key ), value ] ];
                        }

                        return objectFlattenAsync<T_Keys, T_Values>(
                            value as RecursiveRecord<T_Keys, T_Values>,
                            deleteUndefinedProps( {
                                ...args,
                                prefix: String( key ),
                                separator,
                                suffix,
                            } ),
                        ).then(
                            subObj => Object.entries( subObj )
                        );
                    }
                )
            ).then(
                entries => Object.fromEntries( entries.flat() ) as { [ key: string ]: T_Values; }
            );
        }
    );
}