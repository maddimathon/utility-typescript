/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2.draft
 * @license MIT
 */
import type { Test } from '../../types/index.js';
/**
 * Tests if the given object has an iterator function.
 *
 * With overloads for better typing!
 *
 * @since 2.0.0-beta.2.draft
 */
export declare function hasIterator<T_Obj extends any>(obj: T_Obj): obj is Extract<T_Obj, Iterable<any>>;
/**
 * Utilities for the {@link hasIterator} function.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare namespace hasIterator {
    /**
     * Returns true or false representing if all types that apply to T_Obj are
     * iterators.
     *
     * @since 2.0.0-beta.2.draft
     */
    type AllTypeHasIterator<T_Obj extends any> = Test.Exactly<Extract<T_Obj, Iterable<any>>, T_Obj>;
    /**
     * The function's return type.
     *
     * @since 2.0.0-beta.2.draft
     */
    type ReturnType<T_Obj extends any> = AllTypeHasIterator<T_Obj> extends true ? T_Obj : (false | Extract<T_Obj, Iterable<any>>);
}
//# sourceMappingURL=hasIterator.d.ts.map