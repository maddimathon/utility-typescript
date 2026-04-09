/**
 * @since 2.0.0-beta.3.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import { Test } from '../../types/index.js';
/**
 * Deletes the properties of the given object whose types are undefined.
 *
 * @since 2.0.0-beta.3.draft
 */
export declare function deleteUndefinedProps<T_Obj extends object>(obj: T_Obj): deleteUndefinedProps.OmitUndefined<T_Obj>;
/**
 * Utilities for the {@link deleteUndefinedProps} function.
 *
 * @since 2.0.0-beta.3.draft
 */
export declare namespace deleteUndefinedProps {
    /**
     * Utility for {@link OmitUndefined} type.
     *
     * @since 2.0.0-beta.3.draft
     * @internal
     */
    type KeysToKeep<T_Obj extends object> = ({
        [K in keyof T_Obj]: undefined extends T_Obj[K] ? never : K;
    } & {
        [key: number | string | symbol]: never;
    })[keyof T_Obj];
    /**
     * Utility for {@link OmitUndefined} type.
     *
     * @since 2.0.0-beta.3.draft
     * @internal
     */
    type KeysToPartialize<T_Obj extends object> = ({
        [K in keyof T_Obj]: Test.Exactly<T_Obj[K], undefined> extends true ? never : undefined extends T_Obj[K] ? K : never;
    } & {
        [key: number | string | symbol]: never;
    })[keyof T_Obj];
    type OmitUndefined<T_Obj extends object> = {
        [K in KeysToKeep<T_Obj>]: T_Obj[K];
    } & {
        [K in KeysToPartialize<T_Obj>]?: Exclude<T_Obj[K], undefined>;
    };
}
//# sourceMappingURL=deleteUndefinedProps.d.ts.map