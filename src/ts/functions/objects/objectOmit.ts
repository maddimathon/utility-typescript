/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */


/**
 * Takes and object and removes some of its keys, with better typing (if you use
 * it right). Do rely on this typing if your omitKeys is not a string literal or
 * array of string literals.
 * 
 * Creates a COPY of the object via spread.
 * 
 * @since ___PKG_VERSION___
 */
export function objectOmit<
    T_Obj extends Record<any, any>,
    T_OmitKeys extends keyof T_Obj,
>(
    object: T_Obj,
    omitKeys: [ ...T_OmitKeys[] ],
): Omit<T_Obj, T_OmitKeys> {

    const newObj = {
        ...object,
    };

    for ( const key of omitKeys ) {
        delete newObj[ key ];
    }

    return newObj;
}