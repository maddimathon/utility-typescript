/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
import { mergeArgs, } from '../../functions/index.js';
/**
 * Classes with configurable options set in the constructor.
 *
 * @since 0.1.0
 *
 * @example
 * {@includeCode ./AbstractConfigurableClass.example.docs.ts#Example}
 */
export class AbstractConfigurableClass {
    /**
     * A completed args object.
     *
     * @category Args
     */
    args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = this.ARGS_DEFAULT;
        // using this.mergeArgs here can cause issues because 
        // this method is sometimes called from the prototype
        return mergeArgs(mergedDefault, args, this.ARGS_DEFAULT.argsRecursive);
    }
    /* PROPERTIES
     * ====================================================================== */
    /**
     * @param args  Optional configuration.
     *
     * @expandType Args
     */
    constructor(args = {}) {
        this.args = this.buildArgs(args);
    }
    /* METHODS
     * ====================================================================== */
    /**
     * An alias for this package's {@link mergeArgs | mergeArgs()}.
     *
     * @category Aliases
     *
     * @function
     */
    mergeArgs = mergeArgs;
    /* DEFAULT METHODS
     * ====================================================================== */
    /**
     * Overrides the default function to return a string representation of this
     * object.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
     */
    toString() { return JSON.stringify(this, null, 4); }
}
/**
 * Used only for {@link AbstractConfigurableClass}.
 *
 * @since 0.1.0
 */
(function (AbstractConfigurableClass) {
    ;
})(AbstractConfigurableClass || (AbstractConfigurableClass = {}));
//# sourceMappingURL=AbstractConfigurableClass.js.map