/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1.draft
 * @license MIT
 */
import type { AnyClass } from '../types/functions/index.js';
/**
 * An alias for the typeof keyword that returns additional options.
 *
 * @category  Debuggers
 *
 * @typeParam T_Type  The possible types for the variable being tested. (This
 *                    helps restrict the results as applicable.)
 *
 * @param variable  To test for type.
 *
 * @return  Expanded type options.
 *
 * @since 0.1.0
 */
export declare function typeOf<T_Type extends typeOf.TestType>(variable: T_Type): typeOf.Return<T_Type>;
/**
 * Used only for {@link typeOf | typeOf()}.
 *
 * @since 0.1.0
 */
export declare namespace typeOf {
    /**
     * Return options for the {@link typeOf | typeOf()}.
     *
     * The complete options for return are: `array`, `bigint`, `boolean`,
     * `class`, `function`, `NaN`, `null`, `number`, `object`, `string`,
     * `symbol`, `undefined`.
     *
     * @param T_Type  Type of variable being tested.
     *
     * @since 0.1.0
     */
    type Return<T_Type extends TestType> = (T_Type extends any[] ? "array" : never) | (T_Type extends BigInt ? "bigint" : never) | (T_Type extends boolean ? "boolean" : never) | (T_Type extends AnyClass ? "class" : never) | (T_Type extends ((() => any) | Function) ? (T_Type extends AnyClass ? never : "function") : never) | (T_Type extends null ? "null" : never) | (T_Type extends number ? ("number" | "NaN") : never) | (T_Type extends (object | Object) ? (Exclude<T_Type & object, Return_NotObject> extends never ? never : "object") : never) | (T_Type extends string ? "string" : never) | (T_Type extends (symbol | Symbol) ? "symbol" : never) | (T_Type extends undefined ? "undefined" : never);
    /**
     * Types that _are_ objects, but are not actually evaluated as such in the
     * {@link typeOf | typeOf()} function.
     *
     * @since 0.1.0
     */
    type Return_NotObject = (() => any | void) | [] | any[] | AnyClass | BigInt | boolean | Function | null | number | string | symbol | Symbol | undefined;
    /**
     * Input variable types for the {@link typeOf | typeOf()}.
     *
     * @since 0.1.0
     */
    type TestType = undefined | (() => any | void) | any[] | AnyClass | BigInt | boolean | Function | null | number | object | Object | string | symbol | Symbol;
}
//# sourceMappingURL=typeOf.d.ts.map