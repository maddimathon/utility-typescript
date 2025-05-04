/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.0
 */
/*!
 * @maddimathon/utility-typescript@0.4.0
 * @license MIT
 */
import { mergeArgs } from '../../functions/index.js';
/**
 * Classes with configurable options set in the constructor.
 *
 * @example
 * class ExampleClass extends AbstractConfigurableClass<ExampleClassArgs> {
 *
 *
 *     /* PROPERTIES
 *      * ====================================================================== *\/
 *
 *     public get ARGS_DEFAULT() {
 *
 *         return {
 *             argsRecursive: false,
 *         } as const satisfies ExampleClassArgs;
 *     }
 *
 *     /**
 *      * Build a complete args object.
 *      *\/
 *     public buildArgs( args?: Partial<ExampleClassArgs> ): ExampleClassArgs {
 *
 *          const mergedDefault = AbstractConfigurableClass.abstractArgs(
 *              this.ARGS_DEFAULT
 *          ) as ExampleClassArgs;
 *
 *          // using this.mergeArgs here can cause issues because this method is
 *          // sometimes called from the prototype
 *          return mergeArgs(
 *              mergedDefault,
 *              args ?? {},
 *              this.ARGS_DEFAULT.argsRecursive
 *          );
 *     }
 *
 *
 *
 *     /* CONSTRUCTOR
 *      * ====================================================================== *\/
 *
 *     public constructor ( args: Partial<ExampleClassArgs> = {} ) {
 *         super( args );
 *     }
 * }
 */
export class AbstractConfigurableClass {
    /* STATIC
     * ====================================================================== */
    /**
     * Default arguments for new objects.
     *
     * @category Args
     */
    static abstractArgs(args = {}) {
        var _a;
        const ARGS_DEFAULT = {
            argsRecursive: false,
        };
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(ARGS_DEFAULT, args, (_a = args.argsRecursive) !== null && _a !== void 0 ? _a : ARGS_DEFAULT.argsRecursive);
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
    mergeArgs(defaults, inputs, recursive = false) {
        return mergeArgs(defaults, inputs, recursive);
    }
    /* DEFAULT METHODS
     * ====================================================================== */
    /**
     * The object shape used when converting to JSON.
     *
     * @category Exporters
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
     */
    toJSON() { return this; }
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
//# sourceMappingURL=AbstractConfigurableClass.js.map