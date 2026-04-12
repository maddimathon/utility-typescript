/**
 * @since 2.0.0-beta.3.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import type { RecursiveMap } from '../../types/objects/records.js';
/**
 * Returns a single-level map with kebab/snake/etc. case keys based on
 * nested map keys.
 *
 * @category Functions – Map
 *
 * @since 2.0.0-beta.3.draft
 */
export declare function mapFlatten<T_Keys extends number | string, T_Values extends any, T_Map extends RecursiveMap<T_Keys, T_Values> = RecursiveMap<T_Keys, T_Values>>(map: T_Map, args?: Partial<mapFlatten.Args>): Map<string, T_Values>;
/**
 * Utilities for the {@link mapFlatten} function.
 *
 * @category Functions – Map
 *
 * @since 2.0.0-beta.3.draft
 */
export declare namespace mapFlatten {
    /**
     * Optional params for the {@link mapFlatten} function.
     *
     * @since 2.0.0-beta.3.draft
     */
    type Args = {
        prefix?: undefined | string;
        separator?: undefined | string;
        suffix?: undefined | string;
    };
    function parseArgs(args?: Partial<mapFlatten.Args>): Required<mapFlatten.Args> & {
        key_addSuffix: (key: number | string) => string;
        key_validate_addPrefix: (key: number | string) => string;
    };
}
