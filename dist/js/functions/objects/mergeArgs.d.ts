/**
 * @since 0.9.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.9.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.9.0-draft
 * @license MIT
 */
import type { AnyClass } from '../../types/functions/index.js';
import type { RecursivePartial } from '../../types/objects/index.js';
/**
 * Used only for {@link mergeArgs | mergeArgs()}.
 *
 * @namespace
 */
export declare namespace mergeArgs {
    /**
     * Default allowed values for argument objects.
     *
     * @source
     */
    type ArgsSingleValue = AnyClass | boolean | number | null | string;
    /**
     * Default allowed values for {@link Obj | mergeArgs.Obj} properties.
     *
     * @source
     */
    type ObjProp<Value extends any = null> = ArgsSingleValue | Value | ((...p: any[]) => (ArgsSingleValue | Value));
    /**
     * Argument objects compatible with {@link mergeArgs | mergeArgs()}.
     *
     * @source
     */
    type Obj<Values extends any = any, Keys extends string = string> = {
        [K in Keys]: ObjProp<ArgsSingleValue | Values> | ObjProp<ArgsSingleValue | Values>[] | Obj<ArgsSingleValue | Values>;
    };
    /**
     * Interface defining the overloads for {@link mergeArgs | mergeArgs()}.
     */
    interface Function {
        /**
         * Passing `recursive` as false means that the input type must be a
         * `Partial`.
         */
        <V extends any, D extends Obj<V>, I extends Partial<D>>(defaults: D, inputs?: I | undefined, recursive?: false | undefined): D & I;
        /**
         * Passing `recursive` as true means that the input type must actually be a
         * {@link RecursivePartial}.
         */
        <V extends any, D extends Obj<V>, I extends RecursivePartial<D>>(defaults: D, inputs?: I | undefined, recursive?: true): D & I;
        /**
         * Catch-all.
         */
        <V extends any, D extends Obj<V>, I extends RecursivePartial<D>>(defaults: D, inputs?: I | undefined, recursive?: boolean | undefined): D & I;
    }
}
/**
 * Returns an updated version of `defaults` merged with the contents of
 * `inputs`.
 *
 * Useful for parsing objects passed to functions with extra, optional options.
 * Preserves all input properties.
 *
 * Overloaded for better typing dependent on recursion.
 *
 * @category Arg Objects
 *
 * @function
 *
 * @typeParam V  Args object values.
 * @typeParam D  Default object type.
 * @typeParam I  Input object type.
 *
 * @param defaults   Default values (if not specified in inputs).
 * @param inputs     Overriding values (changes to make).
 * @param recursive  Optional. Whether to merge the object recursively.
 *                   Default false.
 *
 * @return  Resulting object with all the `defaults` and `inputs` keys with
 *          either default values or input values, as appropriate.
 */
export declare const mergeArgs: mergeArgs.Function;
//# sourceMappingURL=mergeArgs.d.ts.map