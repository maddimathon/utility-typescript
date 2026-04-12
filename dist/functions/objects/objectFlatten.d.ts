/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import type { RecursiveRecord } from '../../types/objects/records.js';
/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 */
export declare function objectFlatten<T_Keys extends keyof any, T_Values extends any, T_Obj extends RecursiveRecord<T_Keys, T_Values> = RecursiveRecord<T_Keys, T_Values>>(obj: T_Obj, args?: Partial<objectFlatten.Args>): {
    [key: string]: T_Values;
};
/**
 * Utilities for the {@link objectFlatten} function.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 */
export declare namespace objectFlatten {
    /**
     * Optional params for the {@link objectFlatten} function.
     *
     * @since 2.0.0-beta.2
     */
    type Args = {
        prefix?: undefined | string;
        separator?: undefined | string;
        suffix?: undefined | string;
    };
    function parseArgs(args?: Partial<objectFlatten.Args>): Required<objectFlatten.Args> & {
        key_addSuffix: (key: number | string) => string;
        key_validate_addPrefix: (key: number | string) => string;
    };
}
