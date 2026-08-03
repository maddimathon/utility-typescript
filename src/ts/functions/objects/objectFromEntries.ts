/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { FromEntries, ToEntriesArray, ToEntriesArrayReadonly } from '../../types/index.js';


/**
 * Uses {@link ToEntriesArrayReadonly} to provide better typing for
 * {@link Object.fromEntries}.
 *
 * @category Functions – Object
 *
 * @since ___PKG_VERSION___
 */
export function objectFromEntries<T_Entries extends ToEntriesArray | ToEntriesArrayReadonly>( entries: T_Entries ): {
    [ K in keyof FromEntries<T_Entries> ]: FromEntries<T_Entries>[ K ]
} {
    return Object.fromEntries( entries ) as FromEntries<T_Entries>;
}
