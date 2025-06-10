/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
/**
 * Returns the keys that are optional in the give object type.
 *
 * @param T_Object  Type with keys.
 *
 * @since 2.0.0-alpha
 */
export type KeysOptional<T_Object> = Exclude<keyof T_Object, KeysRequired<T_Object>>;
/**
 * Returns the keys that are required by the given object type.
 *
 * @param T_Object  Type with keys.
 *
 * @since 2.0.0-alpha
 */
export type KeysRequired<T_Object> = {
    [_Key in keyof T_Object]-?: {} extends Pick<T_Object, _Key> ? never : _Key;
}[keyof T_Object];
//# sourceMappingURL=keys.d.ts.map