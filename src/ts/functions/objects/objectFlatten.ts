/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

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
export function objectFlatten<
    T_Keys extends keyof any,
    T_Values extends any,
    T_Obj extends RecursiveRecord<T_Keys, T_Values> = RecursiveRecord<T_Keys, T_Values>,
>(
    obj: T_Obj,
    args: Partial<objectFlatten.Args> = {},
): { [ key: string ]: T_Values; } {
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

    const entries: [ string, T_Values ][] = [];

    for ( const t_key of Object.keys( obj ) ) {

        const value = obj[ t_key as T_Keys ] as undefined | T_Values;

        const key = key_validate_addPrefix( t_key );

        // continues
        if ( typeof value === 'undefined' ) {
            continue;
        }

        // continues
        if ( typeof value !== 'object' || !value || Array.isArray( value ) ) {
            entries.push( [ key_addSuffix( key ), value ] );
            continue;
        }

        entries.push(
            ...Object.entries(
                objectFlatten(
                    value as RecursiveRecord<T_Keys, T_Values>,
                    {
                        ...args,
                        prefix: String( key ),
                        separator,
                        suffix,
                    },
                )
            ) as [ string, T_Values ][]
        );
    }

    return Object.fromEntries( entries );
}

/**
 * Utilities for the {@link objectFlatten} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace objectFlatten {

    /**
     * Optional params for the {@link objectFlatten} function.
     * 
     * @since ___PKG_VERSION___
     */
    export type Args = {
        prefix?: string;
        separator?: string;
        suffix?: string;
    };

    export function parseArgs( args: Partial<objectFlatten.Args> = {} ) {

        const {
            prefix,
            separator = '-',
            suffix,
        } = args;

        return {
            prefix,
            separator,
            suffix,

            key_addSuffix: ( key: number | string ): string => {
                key = String( key );
                const _includeSuffix = !!suffix?.length;

                // returns
                if ( key.length < 1 ) {
                    return _includeSuffix ? suffix : '';
                }

                return _includeSuffix ? `${ key }${ separator }${ suffix }` : key;
            },

            key_validate_addPrefix: ( key: number | string ): string => [
                prefix,
                key === '$' ? '' : String( key ),
            ].filter( v => v?.length ).join( separator ),
        } as const;
    }
}