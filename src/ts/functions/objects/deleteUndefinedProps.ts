/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { Test } from '../../types/index.js';

/**
 * Deletes the properties of the given object whose types are undefined.
 * 
 * @since ___PKG_VERSION___
 */
export function deleteUndefinedProps<T_Obj extends object>(
    obj: T_Obj,
): deleteUndefinedProps.OmitUndefined<T_Obj> {

    for ( const [ key, value ] of Object.entries( obj ) as [ keyof T_Obj, T_Obj[ keyof T_Obj ] ][] ) {

        if ( typeof value === 'undefined' ) {
            delete obj[ key ];
        }
    }

    return obj as deleteUndefinedProps.OmitUndefined<T_Obj>;
}

/**
 * Utilities for the {@link deleteUndefinedProps} function.
 * 
 * @since ___PKG_VERSION___
 */
export namespace deleteUndefinedProps {

    /**
     * Utility for {@link OmitUndefined} type.
     * 
     * @since ___PKG_VERSION___
     * @internal
     */
    export type KeysToKeep<T_Obj extends object> = (
        {
            [ K in keyof T_Obj ]: undefined extends T_Obj[ K ]
            ? never
            : K
        } & { [ key: number | string | symbol ]: never; }
    )[ keyof T_Obj ];

    /**
     * Utility for {@link OmitUndefined} type.
     * 
     * @since ___PKG_VERSION___
     * @internal
     */
    export type KeysToPartialize<T_Obj extends object> = (
        {
            [ K in keyof T_Obj ]: Test.Exactly<T_Obj[ K ], undefined> extends true
            ? never
            : undefined extends T_Obj[ K ]
            ? K
            : never
        } & { [ key: number | string | symbol ]: never; }
    )[ keyof T_Obj ];

    export type OmitUndefined<T_Obj extends object> = {
        [ K in KeysToKeep<T_Obj> ]: T_Obj[ K ];
    } & {
        [ K in KeysToPartialize<T_Obj> ]?: Exclude<T_Obj[ K ], undefined>;
    };
}