/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
// UPGRADE - maybe this will work one day
// /**
//  * Overloaded for optional better callback & result typing.
//  */
// export function objectMap<
//     T_InputObj extends object,
//     T_ResultsObject extends { [ K in keyof T_InputObj ]: unknown; },
// >(
//     obj: T_InputObj,
//     callback: <T_Entry extends ToEntry<T_InputObj>>( entry: T_Entry ) => T_ResultsObject[ T_Entry[ 0 ] ],
// ): T_ResultsObject;
// /**
//  * Backup overload for non-specific callback function types.
//  */
// export function objectMap<
//     T_InputObj extends object,
//     T_ResultsObject extends { [ K in keyof T_InputObj ]: unknown; },
// >(
//     obj: T_InputObj,
//     callback: ( entry: ToEntry<T_InputObj> ) => T_ResultsObject[ keyof T_InputObj ],
// ): T_ResultsObject;
/**
 * A utility to map the values of an object using a callback function.
 *
 * @param obj       The object to map.
 * @param callback  The callback function used to define new values.
 *
 * @category Functions – Object
 *
 * @since 2.0.0-beta.2
 * @since 2.0.0-beta.5.draft — Improved typing with {@link ToEntry} and callback overloading.
 *
 * @preventExpand ToEntry
 */
export function objectMap(obj, callback) {
    // returns
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    const entries = Object.entries(obj);
    const mappedEntries = entries.map(([key, value]) => [
        key,
        callback([key, value]),
    ]);
    return Object.fromEntries(mappedEntries);
}
