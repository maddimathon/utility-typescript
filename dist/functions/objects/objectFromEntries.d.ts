/**
 * @since 2.0.0-beta.5.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
import type { FromEntries, ToEntriesArray, ToEntriesArrayReadonly } from '../../types/index.js';
/**
 * Uses {@link ToEntriesArrayReadonly} to provide better typing for
 * {@link Object.fromEntries}.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.5.draft
 */
export declare function objectFromEntries<T_Entries extends ToEntriesArray | ToEntriesArrayReadonly>(entries: T_Entries): {
    [K in keyof FromEntries<T_Entries>]: FromEntries<T_Entries>[K];
};
