/**
 * @since 2.0.0-beta.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Maps a single-level object's properties to new values based on a callback
 * function.
 * 
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 */
export async function objectMapAsync<
    T_Obj extends object,
    T_NewValue extends unknown,
>(
    objPromise: T_Obj | Promise<T_Obj>,
    callback: ( entry: [
        keyof T_Obj,
        T_Obj[ keyof T_Obj ],
    ] ) => T_NewValue | Promise<T_NewValue>,
): Promise<{ [ K in keyof T_Obj ]: T_NewValue; }> {

    return Promise.resolve( objPromise ).then(
        async ( obj ) => {

            // returns
            if ( typeof obj !== 'object' || !obj ) {
                return obj;
            }

            const entries = Object.entries( obj ) as [ keyof T_Obj, T_Obj[ keyof T_Obj ] ][];

            return Promise.all(
                entries.map(
                    async ( [ key, value ] ): Promise<[
                        keyof T_Obj,
                        T_NewValue,
                    ]> => [ key, await callback( [ key, value ] ) ]
                )
            ).then(
                mappedEntries => Object.fromEntries( mappedEntries ) as { [ K in keyof T_Obj ]: T_NewValue; }
            );
        }
    );
}