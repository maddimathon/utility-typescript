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
 * A utility to map the values of an object using a callback function.
 * 
 * @param obj     The object to map.
 * @param mapper  The callback function used to define new values.
 * 
 * @since 2.0.0-beta.2
 */
export function objectMap<
    T_Obj extends object,
    T_NewValue extends unknown,
>(
    obj: T_Obj,
    callback: ( entry: [ keyof T_Obj, T_Obj[ keyof T_Obj ] ] ) => T_NewValue
): { [ K in keyof T_Obj ]: T_NewValue; } {
    // returns
    if ( typeof obj !== 'object' || !obj ) {
        return obj;
    }

    const entries = Object.entries( obj ) as [
        keyof T_Obj,
        T_Obj[ keyof T_Obj ],
    ][];

    const mappedEntries = entries.map(
        ( [ key, value ] ): [ keyof T_Obj, T_NewValue ] => [
            key,
            callback( [ key, value ] ),
        ]
    );

    return Object.fromEntries( mappedEntries ) as {
        [ K in keyof T_Obj ]: T_NewValue;
    };
}
