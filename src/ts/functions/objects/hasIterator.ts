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
 * Tests if the given object has an iterator function.
 * 
 * @since ___PKG_VERSION___
 */
export function hasIterator<T_Obj extends any>( obj: T_Obj ): obj is Extract<T_Obj, Iterable<any>> {
    // returns
    if ( typeof obj !== 'object' || obj === null ) {
        return false;
    }

    // returns
    if ( typeof ( obj as any )[ Symbol.iterator ] === 'function' ) {

        const result = ( obj as any )[ Symbol.iterator ]();

        // returns
        if ( typeof result === 'object' && typeof result.next === 'function' ) {
            return true;
        }

        return false;
    }

    return false;
}