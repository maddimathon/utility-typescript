/**
 * Utility types for unit testing TypeScript types.
 *
 * Types derived from and inspired by {@link https://github.com/MichiganTypeScript/type-testing | MichiganTypeScript/type-testing}
 * and {@link https://frontendmasters.com/blog/testing-types-in-typescript/#getting-serious | *Testing Types in TypeScript* by Adam Rackis}.
 *
 * @module Test
 *
 * @since 0.1.0
 *
 * @example
 * ```ts
 * import { Test } from '@maddimathon/utility-typescript/types';
 * import { ... } from '@maddimathon/utility-typescript/types/test';
 * ```
 */
/**
 * @package @maddimathon/utility-typescript@1.0.0
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage https://maddimathon.github.io/utility-typescript
 *
 * @license MIT
 */
/*!
 * @maddimathon/utility-typescript@1.0.0
 * @license MIT
 */
/**
 * Tests if the provided arguments resolve to equivalent TypeScript values.
 *
 * Does not catch all optional properties mismatches.
 */
export type Equivalent<A, B> = [
    A
] extends [B] ? [B] extends [A] ? true : false : false;
/**
 * Tests if two types are exactly the same shape.
 *
 * @see {@link Equivalent}
 *
 * @param A  Type to compare.
 * @param B  Type to compare.
 */
export type Exactly<A, B> = Equivalent<A, B> extends true ? Equivalent<keyof Required<A>, keyof Required<B>> extends true ? true : false : false;
/**
 * Demands the parameter evaluate to true.
 *
 * To be used with other Test types.
 *
 * Evaluates to true on pass and false on fail. Non-true inputs will error,
 * except `never`.
 *
 * @see {@link Equivalent}
 *
 * @param T  The type test to check.
 */
export type Expect<T extends true> = Equivalent<T, true>;
/**
 * Demands the parameter evaluate to false.  Inverse of {@link Expect}.
 *
 * To be used with other Test types.
 *
 * Evaluates to true on pass and false on fail. Non-false inputs will error,
 * except `never`.
 *
 * @see {@link Equivalent}
 * @see {@link Expect}
 *
 * @param T  The type test to check.
 */
export type ExpectNot<T extends false> = Equivalent<T, false>;
/**
 * Tests if a type is a valid array.
 */
export type IsArray<T> = T extends Array<any> ? true : false;
/**
 * Tests if a given type would satisfy a given supertype.
 *
 * e.g., `Satisfies<Object, object>` should evaluate to true
 *
 * @param Type  Type to compare.
 * @param SuperType  Type that should be extended by `Type`.
 */
export type Satisfies<Type, SuperType> = [Type] extends [SuperType] ? true : false;
//# sourceMappingURL=test.d.ts.map