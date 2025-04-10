/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */


/**
 * Refines the function type to only apply to classes.
 * 
 * @param O  Optionally restrict the type of object for the class instances.
 */
export type AnyClass<O extends Object = Object> = new ( ...args: any[] ) => O;