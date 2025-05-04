/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.3.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.3.0-draft
 * @license MIT
 */
import { AnyClass } from '../types/functions/index.js';
/**
 * An alias for the typeof keyword that returns additional options.
 *
 * @category  Debuggers
 *
 * @see {@link typeOf.Args}
 * @see {@link typeOf.TestType}
 * @see {@link typeOf.Return}
 *
 * @typeParam T  Type of the variable being checked.
 *
 * @param variable  To test for value type.
 * @param _args     Optional configuration. See {@link typeOf.Args}.
 *
 * @return Expanded type string.
 */
export declare function typeOf<T extends typeOf.TestType>(variable: T, _args?: Partial<typeOf.Args>): string & typeOf.Return<T>;
/**
 * Used only for {@link typeOf | typeOf()}.
 */
export declare namespace typeOf {
    /**
     * Optional configuation for {@link typeOf | typeOf()}.
     * @interface
     * @expand
     */
    export interface Args {
        /**
         * If true, arrays will return `'array'` instead of `'object'`.
         *
         * @default true
         */
        distinguishArrays: boolean;
    }
    type ObjectReturn<Type extends TestType> = Type extends ((() => any) | any[] | AnyClass | BigInt | boolean | Function | null | number | string | symbol | Symbol | undefined) ? never : "object";
    /**
     * Return options for the {@link typeOf | typeOf()}.
     *
     * @param Type  Type of variable being testing.
     *
     * @expand
     */
    export type Return<Type extends TestType> = (Type extends any[] ? "array" : never) | (Type extends BigInt ? "bigint" : never) | (Type extends boolean ? "boolean" : never) | (Type extends AnyClass ? "class" : never) | (Type extends ((() => any) | Function) ? (Type extends AnyClass ? never : "function") : never) | (Type extends null ? "null" : never) | (Type extends number ? ("number" | "NaN") : never) | (Type extends (object | Object) ? ObjectReturn<Type> : never) | (Type extends string ? "string" : never) | (Type extends (symbol | Symbol) ? "symbol" : never) | (Type extends undefined ? "undefined" : never);
    /**
     * Input variable types for the {@link typeOf | typeOf()}.
     */
    export type TestType = (() => any) | any[] | AnyClass | BigInt | boolean | Function | null | number | object | Object | string | symbol | Symbol | undefined;
    export {};
}
//# sourceMappingURL=typeOf.d.ts.map