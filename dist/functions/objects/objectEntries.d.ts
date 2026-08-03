/**
 * @since 2.0.0-beta.5.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
import type { ToEntriesArrayReadonly, TypeDump } from '../../types/index.js';
/**
 * Uses {@link ToEntriesArrayReadonly} to provide better typing for
 * {@link !Object.entries | Object.entries}.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.5.draft
 */
export declare function objectEntries<O extends object>(obj: O): TypeDump<ToEntriesArrayReadonly<O>>;
