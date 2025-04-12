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
import type { AnyClass } from '../../types/functions/index.js';
import type { RecursivePartial } from '../../types/objects/index.js';
/**
 * Used only for the {@link mergeArgs | mergeArgs()}.
 */
export declare namespace mergeArgs {
    /**
     * Default allowed values for argument objects.
     */
    type ArgsSingleValue = AnyClass | boolean | number | null | string;
    /**
     * Default allowed values for {@link Obj | mergeArgs.Obj} properties.
     */
    export type ObjProp<Value extends any = null> = ArgsSingleValue | Value | ((...p: any[]) => (ArgsSingleValue | Value));
    /**
     * Argument objects compatible with {@link mergeArgs | mergeArgs()}.
     * @interface
     * @expand
     */
    export type Obj<Values extends any = unknown, Keys extends string = string> = {
        [K in Keys]: ObjProp<ArgsSingleValue | Values> | ObjProp<ArgsSingleValue | Values>[] | Obj<ArgsSingleValue | Values>;
    };
    export {};
}
/**
 * Passing `recursive` as false means that the input type must be a `Partial`.
 *
 * @overload
 */
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends Partial<D>>(defaults: D, inputs?: I | undefined, recursive?: false | undefined): D & I;
/**
 * Passing `recursive` as true means that the input type must actually be a
 * {@link RecursivePartial}.
 *
 * @overload
 */
export declare function mergeArgs<V extends unknown, D extends mergeArgs.Obj<V>, I extends RecursivePartial<D>>(defaults: D, inputs: I | undefined, recursive: true): D & I;
//# sourceMappingURL=mergeArgs.d.ts.map