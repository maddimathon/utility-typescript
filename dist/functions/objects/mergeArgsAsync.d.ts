/**
 * @since 2.0.0-beta.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1
 * @license MIT
 */
import type { RecursivePartial } from '../../types/objects/index.js';
/**
 * Inputs can be undefined, and if so, the default is returned.
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
export declare function mergeArgsAsync<D extends object>(defaults: D, inputs?: undefined, recursive?: boolean | undefined, mergeArrays?: boolean | undefined): Promise<D>;
/**
 * Passing `recursive` as false means that the input type must be a `Partial`
 * (not {@link RecursivePartial}).
 */
export declare function mergeArgsAsync<D extends object, I extends Partial<D>>(defaults: D, inputs: I, recursive?: false | undefined, mergeArrays?: boolean | undefined): Promise<D & I>;
/**
 * Passing `recursive` as true means that the input type may actually be a
 * {@link RecursivePartial}.
 */
export declare function mergeArgsAsync<D extends object, I extends Partial<D> | RecursivePartial<D>>(defaults: D, inputs: I, recursive: true, mergeArrays?: boolean | undefined): Promise<D & I>;
/**
 * Universal overload.
 */
export declare function mergeArgsAsync<D extends object, I extends Partial<D> | RecursivePartial<D>>(defaults: D, inputs?: I | undefined, recursive?: boolean | undefined, mergeArrays?: boolean | undefined): Promise<D | D & I>;
//# sourceMappingURL=mergeArgsAsync.d.ts.map