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
 * A utility to map the values of an object using a callback function.
 *
 * @param obj     The object to map.
 * @param mapper  The callback function used to define new values.
 *
 * @since 2.0.0-beta.2.draft
 */
export declare function objectMap<T_Obj extends object, T_NewValue extends unknown>(obj: T_Obj, callback: (entry: [keyof T_Obj, T_Obj[keyof T_Obj]]) => T_NewValue): {
    [K in keyof T_Obj]: T_NewValue;
};
//# sourceMappingURL=objectMap.d.ts.map