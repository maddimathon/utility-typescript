/**
 * @since 2.0.0-beta.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

/**
 * Checks whether an object is empty (by checking for keys and constructor).
 * 
 * Non-object types are evaluated in other ways depending on type.
 * 
 * @since 2.0.0-beta.1
 */
export function isObjectEmpty( obj: unknown ) {

    // returns if non-object
    switch ( typeof obj ) {

        case 'object':
            // returns - checks length if array for
            if ( Array.isArray( obj ) ) {
                return !( obj.length );
            }
            break;

        // always false
        case 'boolean':
        case 'bigint':
        case 'function':
        case 'number':
        case 'symbol':
            return false;

        // always true
        case 'undefined':
            return true;

        // have to check
        case 'string':
            return !( obj.length );

        // fallback checks for falsey-ness
        default:
            return !obj;
    }

    // returns true
    if ( obj === null ) {
        return true;
    }

    return (
        Object.keys( obj ).length === 0
        && obj.constructor === Object
    );
}