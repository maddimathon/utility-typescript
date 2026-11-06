/**
 * @since 2.0.0-beta.7
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { hasIterator } from './hasIterator.js';

/**
 * Flattens any iterator(s) recursively. Uses {@link hasIterator} to determine
 * if an item is an iterator.
 *
 * @since 2.0.0-beta.7
 */
export function iterableFlatten<T_Items extends any>(
    iterator: Iterable<T_Items | Iterable<Exclude<T_Items, Iterable<any>>>>,
    {
        isIterable = hasIterator,
    }: Partial<{
        isIterable: typeof hasIterator;
    }> = {},
): Exclude<T_Items, Iterable<any>>[] {

    const asFlatArray = Array.isArray( iterator )
        ? iterator.flat() as ( T_Items | Iterable<T_Items> )[]
        : iterator;

    const flattened: Exclude<T_Items, Iterable<any>>[] = [];

    for ( const item of asFlatArray ) {
        if ( isIterable( item ) ) {
            flattened.push( ...iterableFlatten( item ) );
        } else {
            flattened.push( item as Exclude<T_Items, Iterable<any>> );
        }
    }

    return flattened;
}