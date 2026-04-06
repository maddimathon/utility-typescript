/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2.draft
 * @license MIT
 */
import { RecursiveRecord } from '../../types/objects/records.js';
/**
 * Returns a single-level object record with kebab/snake/etc. case keys based on
 * nested object keys.
 *
 * @param obj     Object to flatten.
 * @param prefix  Optional. String used to prefix the flattened keys.
 * @param suffix  Optional. String used to suffix the flattened keys.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare function objectFlatten<T_Keys extends keyof any, T_Values extends any, T_Obj extends RecursiveRecord<T_Keys, T_Values> = RecursiveRecord<T_Keys, T_Values>>(obj: T_Obj, args?: Partial<objectFlatten.Args>): {
    [key: string]: T_Values;
};
/**
 * Utilities for the {@link objectFlatten} function.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare namespace objectFlatten {
    /**
     * Optional params for the {@link objectFlatten} function.
     *
     * @since 2.0.0-beta.2.draft
     */
    type Args = {
        prefix?: string;
        separator?: string;
        suffix?: string;
    };
    function parseArgs(args?: Partial<objectFlatten.Args>): {
        readonly prefix: string | undefined;
        readonly separator: string;
        readonly suffix: string | undefined;
        readonly key_addSuffix: (key: number | string) => string;
        readonly key_validate_addPrefix: (key: number | string) => string;
    };
}
//# sourceMappingURL=objectFlatten.d.ts.map