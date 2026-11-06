/**
 * @since 2.0.0-beta.7
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.7
 * @license MIT
 */
import { hasIterator } from './hasIterator.js';
/**
 * Flattens any iterator(s) recursively. Uses {@link hasIterator} to determine
 * if an item is an iterator.
 *
 * @since 2.0.0-beta.7
 */
export declare function iterableFlatten<T_Items extends any>(iterator: Iterable<T_Items | Iterable<Exclude<T_Items, Iterable<any>>>>, { isIterable, }?: Partial<{
    isIterable: typeof hasIterator;
}>): Exclude<T_Items, Iterable<any>>[];
