/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
/**
 * Maps a single-level object's properties to new values based on a callback
 * function.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare function objectMapAsync<T_Obj extends object, T_NewValue extends unknown>(objPromise: T_Obj | Promise<T_Obj>, callback: (entry: [
    keyof T_Obj,
    T_Obj[keyof T_Obj]
]) => T_NewValue | Promise<T_NewValue>): Promise<{
    [K in keyof T_Obj]: T_NewValue;
}>;
//# sourceMappingURL=objectMapAsync.d.ts.map