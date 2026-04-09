/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { RecursiveMap } from '../../types/objects/records.js';
import { deleteUndefinedProps } from './deleteUndefinedProps.js';

/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 *
 * @param map     Map to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 *
 * @since ___PKG_VERSION___
 */
export function mapFlatten<
    T_Keys extends number | string,
    T_Values extends any,
    T_Map extends RecursiveMap<T_Keys, T_Values> = RecursiveMap<T_Keys, T_Values>,
>(
    map: T_Map,
    args: Partial<mapFlatten.Args> = {},
): Map<string, T_Values> {
    // returns
    if ( !( map instanceof Map ) || !map ) {
        return map;
    }

    const {
        // prefix,
        separator = '-',
        suffix,

        key_addSuffix,
        key_validate_addPrefix,
    } = mapFlatten.parseArgs( args );

    const entries: [ string, T_Values ][] = [];

    for ( const [ t_key, value ] of map.entries() ) {

        const key = key_validate_addPrefix( t_key );

        // continues
        if ( typeof value === 'undefined' ) {
            continue;
        }

        // continues
        if ( !( value instanceof Map ) ) {
            entries.push( [ key_addSuffix( key ), value ] );
            continue;
        }

        entries.push(
            ...mapFlatten<T_Keys, T_Values>(
                value as RecursiveMap<T_Keys, T_Values>,
                deleteUndefinedProps( {
                    ...args,
                    prefix: key,
                    separator,
                    suffix,
                } ),
            ).entries()
        );
    }

    return new Map( entries );
}

/**
 * Utilities for the {@link mapFlatten} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace mapFlatten {

    /**
     * Optional params for the {@link mapFlatten} function.
     * 
     * @since ___PKG_VERSION___
     */
    export type Args = {
        prefix?: undefined | string;
        separator?: undefined | string;
        suffix?: undefined | string;
    };

    export function parseArgs( args: Partial<mapFlatten.Args> = {} ) {

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