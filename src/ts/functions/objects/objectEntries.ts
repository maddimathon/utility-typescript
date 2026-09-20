/**
 * @since 2.0.0-beta.6
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { ToEntriesArray, ToEntriesArrayReadonly, TypeDump } from '../../types/index.js';

/**
 * Uses {@link ToEntriesArrayReadonly} to provide better typing for
 * {@link !Object.entries | Object.entries}.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.6
 */
export function objectEntries<O extends object>( obj: O ): TypeDump<ToEntriesArrayReadonly<O>> {
    return Object.entries( obj ) as ToEntriesArray<O>;
}