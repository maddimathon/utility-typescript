/**
 * @since 0.1.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.1.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.1.0-draft
 * @license MIT
 */
import type { AnyClass } from '../../types/functions/index.js';
import type { RecursivePartial } from '../../types/objects/index.js';
/**
 * Universal overload.
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
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends Partial<D> | RecursivePartial<D>>(defaults: D, inputs?: I | undefined, recursive?: boolean | undefined): D & I;
/**
 * Passing `recursive` as false means that the input type must be a
 * `Partial` (not {@link RecursivePartial}).
 */
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends Partial<D>>(defaults: D, inputs: I, recursive?: false | undefined): D & I;
/**
 * Passing `recursive` as true means that the input type must actually be a
 * {@link RecursivePartial}.
 */
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends RecursivePartial<D>>(defaults: D, inputs: I, recursive: true): D & I;
/**
 * If inputs is undefined, then the return is just the defaults.
 */
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>>(defaults: D, inputs?: undefined, recursive?: boolean | undefined): D;
/**
 * Used only for {@link mergeArgs | mergeArgs()}.
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
}
//# sourceMappingURL=mergeArgs.d.ts.map