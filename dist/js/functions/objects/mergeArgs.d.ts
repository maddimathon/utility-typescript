/**
 * @since 1.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@1.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@1.0.0-draft
 * @license MIT
 */
import { AnyClass } from '../../types/functions/index.js';
/**
 * Used only for the {@link mergeArgs | `mergeArgs` function}.
 *
 * @alpha
 */
export declare namespace mergeArgs {
    /**
     * Default allowed values for argument objects.
     */
    type ArgsSingleValue = AnyClass | boolean | number | null | string;
    /**
     * Default allowed values for {@link Obj | mergeArgs.Obj} properties.
     */
    export type ArgsValue<Value extends any = null> = ArgsSingleValue | Value | ((...p: any[]) => (ArgsSingleValue | Value));
    /**
     * Argument objects compatible with {@link mergeArgs | `mergeArgs` function}.
     * @interface
     * @expand
     */
    export type Obj<Values extends any = null, Keys extends string = string> = {
        [K in Keys]: ArgsValue<ArgsSingleValue | Values> | ArgsValue<ArgsSingleValue | Values>[] | Obj<ArgsSingleValue | Values>;
    };
    export {};
}
/**
 * Returns an updated version of `defaults` merged with the contents of
 * `inputs`.
 *
 * Useful for parsing objects passed to functions with extra, optional options.
 * Preserves all input keys.
 *
 * Not yet tested.
 * @alpha
 *
 * @template D  Default object type.
 * @template I  Input object type. Should be equivalent to `Partial<D>`.
 *
 * @param defaults   Default values (if notspecified in inputs).
 * @param inputs     Overriding values (changes to make).
 * @param recursive  Optional. Whether to merge the object recursively. Default
 *                   false.
 *
 * @return  Resulting object with all the `defaults` and `inputs` keys with
 *          either default values or input values, as appropriate.
 */
export declare function mergeArgs<D extends mergeArgs.Obj, I extends Partial<D>>(defaults: D, inputs?: I, recursive?: boolean): D & I;
//# sourceMappingURL=mergeArgs.d.ts.map