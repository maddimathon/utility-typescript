/**
 * Utility types for unit testing TypeScript types.
 *
 * Types derived from and inspired by
 * {@link https://github.com/MichiganTypeScript/type-testing | MichiganTypeScript/type-testing}
 * (GitHub) and
 * {@link https://frontendmasters.com/blog/testing-types-in-typescript/#getting-serious | *Testing Types in TypeScript*}
 * by Adam Rackis.
 *
 * @module Test
 *
 * @since 0.1.0
 *
 * @example
 * ```ts
 * import { Test } from '@maddimathon/utility-typescript/types';
 * ```
 *
 * Your type tests should probably be in the same place as your Javascript tests
 * (and not where those objects are defined).  (So replace this with your
 * imported item(s) to test.)
 * {@includeCode ./test.example.docs.ts#FunctionToTest}
 *
 * These values should also be tested by Jest/etc. for their values, but this
 * example is just looking at type testing.
 * {@includeCode ./test.example.docs.ts#ReturnsToTest}
 *
 * If any of these tests fail, the {@link Expect} type will cause an error.
 * {@includeCode ./test.example.docs.ts#TypeTests}
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1.draft
 * @license MIT
 */
/**
 * Tests if the provided arguments resolve to equivalent TypeScript values.
 *
 * **Does not catch all optional properties mismatches.**  You should use
 * {@link Exactly} instead.
 *
 * {@include ./test.docs.md#HowToUseTest}
 *
 * @param A  Type to compare.
 * @param B  Type to compare.
 *
 * @since 0.1.0
 *
 * @internal
 * @private
 */
export type Equivalent<A, B> = [
    A
] extends [B] ? [B] extends [A] ? true : false : false;
/**
 * Tests if two types are exactly the same shape.
 *
 * {@include ./test.docs.md#HowToUseTest}
 *
 * @param A  Type to compare.
 * @param B  Type to compare.
 *
 * @since 0.1.0
 */
export type Exactly<A, B> = Equivalent<A, B> extends true ? Equivalent<Required<A>, Required<B>> extends true ? Equivalent<keyof Required<A>, keyof Required<B>> extends true ? true : false : false : false;
/**
 * Demands the parameter evaluate to true.
 *
 * To be used with other {@link Test} types.
 *
 * Evaluates to true on pass and false on fail. Non-true inputs will error,
 * except `never`.
 *
 * @param T_Test  The type test to evaluate. (e.g., {@link Exactly},
 *                {@link IsArray}, {@link Satisfies}).
 *
 * @since 0.1.0
 */
export type Expect<T_Test extends true> = Exactly<T_Test, true>;
/**
 * Demands the parameter evaluate to false.  Inverse of {@link Expect}.
 *
 * To be used with other {@link Test} types.
 *
 * Evaluates to true on pass and false on fail. Non-false inputs will error,
 * except `never`.
 *
 * @param T_Test  The type test to evaluate (for failure). (e.g.,
 *                {@link Exactly}, {@link IsArray}, {@link Satisfies}).
 *
 * @since 0.1.0
 */
export type ExpectNot<T_Test extends false> = Exactly<T_Test, false>;
/**
 * Tests if a type is a valid array.
 *
 * {@include ./test.docs.md#HowToUseTest}
 *
 * @param T_Type  Type to test.
 *
 * @since 0.1.0
 */
export type IsArray<T_Type> = T_Type extends (infer _Item)[] ? true : false;
/**
 * Tests if a given type would satisfy a given supertype.
 *
 * e.g., `Satisfies<"hello", string>` should evaluate to true.
 *
 * @param T_Type       Type to compare.
 * @param T_SuperType  Type that should be extended by `Type`.
 *
 * @since 0.1.0
 */
export type Satisfies<T_Type, T_SuperType> = [
    T_Type
] extends [T_SuperType] ? true : false;
//# sourceMappingURL=test.d.ts.map