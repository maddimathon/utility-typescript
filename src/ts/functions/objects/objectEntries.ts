/**
 * @since ___PKG_VERSION___
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
 * @since ___PKG_VERSION___
 */
export function objectEntries<O extends object>( obj: O ): TypeDump<ToEntriesArrayReadonly<O>> {
    return Object.entries( obj ) as ToEntriesArray<O>;
}