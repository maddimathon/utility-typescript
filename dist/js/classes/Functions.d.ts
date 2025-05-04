/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.3.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.3.0-draft
 * @license MIT
 */
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { escRegExp, escRegExpReplace, slugify, timestamp, toTitleCase, typeOf } from '../functions/index.js';
/**
 * A configurable class of utility functions.
 *
 * Can be extended, but probably best as a (static) property instead.
 */
export declare class Functions extends AbstractConfigurableClass<Functions.Args> {
    get ARGS_DEFAULT(): Functions.Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<Functions.Args>): Functions.Args;
    constructor(args?: Partial<Functions.Args>);
    /**
     * An alias for this package's {@link typeOf | typeOf()}.
     *
     * @category Aliases
     *
     * @function
     */
    typeOf: (...params: Parameters<typeof typeOf>) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "class" | "NaN";
    /**
     * An alias for this package's {@link escRegExp | escRegExp()}.
     *
     * @category Aliases
     *
     * @function
     */
    escRegExp: (...params: Parameters<typeof escRegExp>) => string;
    /**
     * An alias for this package's {@link escRegExpReplace | escRegExpReplace()}.
     *
     * @category Aliases
     *
     * @function
     */
    escRegExpReplace: (...params: Parameters<typeof escRegExpReplace>) => string;
    /**
     * An alias for this package's {@link slugify | slugify()}.
     *
     * @category Aliases
     *
     * @function
     */
    slugify: (...params: Parameters<typeof slugify>) => string;
    /**
     * An alias for this package's {@link timestamp | timestamp()}.
     *
     * @category Aliases
     *
     * @function
     */
    timestamp: (...params: Parameters<typeof timestamp>) => string;
    /**
     * An alias for this package's {@link toTitleCase | toTitleCase()}.
     *
     * @category Aliases
     *
     * @function
     */
    toTitleCase: (...params: Parameters<typeof toTitleCase>) => string;
}
/**
 * Used only for {@link Functions}.
 */
export declare namespace Functions {
    /**
     * Optional configuration for {@link Functions}.
     *
     * @interface
     */
    type Args = AbstractConfigurableClass.Args & {};
}
//# sourceMappingURL=Functions.d.ts.map