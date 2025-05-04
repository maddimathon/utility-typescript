/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.2
 */
/*!
 * @maddimathon/utility-typescript@0.4.2
 * @license MIT
 */
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { escRegExp, escRegExpReplace, mergeArgs, slugify, timestamp, toTitleCase, typeOf, } from '../functions/index.js';
/**
 * A configurable class of utility functions.
 *
 * Can be extended, but probably best as a (static) property instead.
 */
export class Functions extends AbstractConfigurableClass {
    /* PROPERTIES
     * ====================================================================== */
    get ARGS_DEFAULT() {
        return {
            argsRecursive: false,
        };
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = AbstractConfigurableClass.abstractArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(mergedDefault, args !== null && args !== void 0 ? args : {}, this.ARGS_DEFAULT.argsRecursive);
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}) {
        super(args);
        /* METHODS
         * ====================================================================== */
        /**
         * An alias for this package's {@link typeOf | typeOf()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.typeOf = (...params) => typeOf(...params);
        /* ARRAYS ===================================== */
        /* HTML ===================================== */
        /* OBJECTS ===================================== */
        /* REGEX ===================================== */
        /**
         * An alias for this package's {@link escRegExp | escRegExp()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.escRegExp = (...params) => escRegExp(...params);
        /**
         * An alias for this package's {@link escRegExpReplace | escRegExpReplace()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.escRegExpReplace = (...params) => escRegExpReplace(...params);
        /* STRINGS ===================================== */
        /**
         * An alias for this package's {@link slugify | slugify()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.slugify = (...params) => slugify(...params);
        /**
         * An alias for this package's {@link timestamp | timestamp()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.timestamp = (...params) => timestamp(...params);
        /**
         * An alias for this package's {@link toTitleCase | toTitleCase()}.
         *
         * @category Aliases
         *
         * @function
         */
        this.toTitleCase = (...params) => toTitleCase(...params);
    }
}
//# sourceMappingURL=Functions.js.map