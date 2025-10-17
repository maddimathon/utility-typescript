/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
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
 * @since 2.0.0-alpha — Is now global rather than being the only member of the Functions namespace.
 * @since ___PKG_VERSION___ — Moved to new architechture.
 */
export type AnyClass<
    T_Object extends any = any,
    T_ConstructParams extends ( any | never )[] = ( any | never )[]
> = new ( ...args: T_ConstructParams ) => T_Object;