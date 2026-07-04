/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3
 * @license MIT
 */
/**
 * Uses {@link Array.filter} to create a unique array.
 *
 * Filters out any item that is not the first instance of that item in the
 * array.
 *
 * @category Functions – Array
 *
 * @source
 *
 * @typeParam T_ArrayItem  Array item type.
 *
 * @param arr  To simplify.
 *
 * @return  Unique array.
 *
 * @since 0.1.0
 * @since 2.0.0-beta.3 — Added optional args param.
 */
export declare function arrayUnique<T_ArrayItem>(arr: T_ArrayItem[], args?: Partial<arrayUnique.Args>): T_ArrayItem[];
/**
 * Utilities for the {@link arrayUnique} function.
 *
 * @since 2.0.0-beta.3
 */
export declare namespace arrayUnique {
    /**
     * @since 2.0.0-beta.3
     */
    type Args = {
        /**
         * Whether to check for uniqueness by comparing JSON strings.
         *
         * @experimental
         */
        compareViaJson?: boolean;
    };
}
