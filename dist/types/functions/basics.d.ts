/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.draft
 * @license MIT
 */
/**
 * Refines the function type to only apply to classes.
 *
 * @param T_Object           Optionally restrict the type of object for the
 *                           class instances.
 * @param T_ConstructParams  Optionally restrict the constructor params.
 *
 * @since 0.1.0
 * @since 2.0.0-alpha.draft — Is now global rather than being the only member
 *                            of the Functions namespace.
 */
export type AnyClass<T_Object extends any = any, T_ConstructParams extends (any | never)[] = (any | never)[]> = new (...args: T_ConstructParams) => T_Object;
//# sourceMappingURL=basics.d.ts.map