/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { objectFlatten } from './objectFlatten.js';

import { RecursiveRecord } from '../../types/objects/records.js';

/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 * 
 * @param obj     Object to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 * 
 * @since ___PKG_VERSION___
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
                    async ( t_key ): Promise<false | [ string, T_Values ][]> => {

                        const value = obj[ t_key as T_Keys ] as undefined | T_Values;
                        const key = key_validate_addPrefix( t_key );

                        // continues
                        if ( typeof value === 'undefined' ) {
                            return false;
                        }

                        // continues
                        if ( typeof value !== 'object' || !value || Array.isArray( value ) ) {
                            return [ [ key_addSuffix( key ), value ] ];
                        }

                        return objectFlattenAsync<T_Keys, T_Values>(
                            value as RecursiveRecord<T_Keys, T_Values>,
                            {
                                ...args,
                                prefix: String( key ),
                                separator,
                                suffix,
                            },
                        ).then(
                            subObj => Object.entries( subObj )
                        );
                    }
                )
            ).then(
                entries => Object.fromEntries( entries.filter( item => item !== false ).flat() ) as { [ key: string ]: T_Values; }
            );
        }
    );
}