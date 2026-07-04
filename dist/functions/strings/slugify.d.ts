/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
/**
 * Turns the given slug into a string with only a-z, 0-9, and hyphens.
 *
 * @category Functions – String
 *
 * @param input  String to convert.
 *
 * @return  Slug version of the input string.
 *
 * @since 0.1.0
 * @since 2.0.0-beta.3 — Added optional args param.
 *
 * @source
 */
export declare function slugify(input: string, args?: Partial<slugify.Args>): string;
/**
 * Utilities for the {@link slugify} function.
 *
 * @since 2.0.0-beta.3
 */
export declare namespace slugify {
    /**
     * @since 2.0.0-beta.3
     */
    interface Args {
        /**
         * Whether to allow repeated dashes in the output.
         *
         * @default false
         */
        allowRepeatDashes: boolean;
        /**
         * Whether to allow repeated underscores in the output.
         *
         * @default {@link slugify.Args.allowRepeatDashes}
         */
        allowRepeatUnderscores: boolean;
        /**
         * Whether to allow underscores in the output.
         *
         * @default false
         */
        allowUnderscores: boolean;
    }
}
