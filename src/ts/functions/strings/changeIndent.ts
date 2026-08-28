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
 * Changes the indent of a file with structured space-based indents at the start
 * of lines (like css or json).
 * 
 * @since ___PKG_VERSION___
 */
export function changeIndent( str: string, from: number, to: number ): string {
    return str.replace(
        new RegExp( '^(' + ' '.repeat( from ) + ')+', 'gm' ),
        ( substring ) => {
            const replaceSpaces = Math.floor( substring.length / from );
            return ' '.repeat( ( substring.length - ( replaceSpaces * from ) ) + ( replaceSpaces * to ) );
        },
    );
}