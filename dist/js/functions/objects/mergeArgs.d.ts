/**
 * @since 0.1.0
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
import type { AnyClass } from '../../types/functions/index.js';
import type { RecursivePartial } from '../../types/objects/index.js';
/**
 * Passing `recursive` as false means that the input type must be a
 * `Partial` (not {@link RecursivePartial}).
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
export declare function mergeArgs<D extends mergeArgs.Obj, I extends Partial<D>>(defaults: D, inputs: I, recursive?: false | undefined): D & I;
/**
 * Passing `recursive` as true means that the input type must actually be a
 * {@link RecursivePartial}.
 */
export declare function mergeArgs<D extends mergeArgs.Obj, I extends RecursivePartial<D>>(defaults: D, inputs: I, recursive: true): D & I;
/**
 * If inputs is undefined, then the return is just the defaults.
 */
export declare function mergeArgs<D extends mergeArgs.Obj>(defaults: D, inputs?: undefined, recursive?: boolean | undefined): D;
/**
 * Universal overload.
 */
export declare function mergeArgs<D extends mergeArgs.Obj, I extends Partial<D> | RecursivePartial<D>>(defaults: D, inputs: I, recursive?: boolean | undefined): D & I;
/**
 * Used only for {@link mergeArgs | mergeArgs()}.
 */
export declare namespace mergeArgs {
    /**
     * Single allowed values for argument objects (i.e., no objects, functions,
     * or arrays).
     */
    type ArgsSingleValue = AnyClass | boolean | number | null | string | undefined;
    /**
     * All allowed values for argument objects.
     */
    type ArgsValue = ArgsSingleValue | ((...p: any[]) => void | any | Promise<void | any>) | ArgsSingleValue[];
    /**
     * Argument objects compatible with {@link mergeArgs | mergeArgs()}.
     */
    type Obj<Keys extends number | string = number | string, ExtraValues extends any = never> = {
        [K in Keys]: ArgsValue | Obj | Partial<Obj> | ExtraValues | (ArgsValue | Obj | Partial<Obj> | ExtraValues)[];
    };
}
//# sourceMappingURL=mergeArgs.d.ts.map