/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2.draft
 * @license MIT
 */
// export function hasIterator<T_Obj extends any>( obj: T_Obj ): hasIterator.ReturnType<T_Obj>;
// export function hasIterator<T_Obj extends any>( obj: T_Obj ): false | hasIterator.ReturnType<T_Obj>;
// export function hasIterator<T_Obj extends Iterable<T_Item>, T_Item extends any>( obj: T_Obj ): obj is T_Obj &Iterable<T_Item>;
// export function hasIterator<T_Obj extends any>( obj: T_Obj ): obj is Extract<T_Obj, Iterable<any>>;
/**
 * Tests if the given object has an iterator function.
 *
 * With overloads for better typing!
 *
 * @since 2.0.0-beta.2.draft
 */
export function hasIterator(obj) {
    // returns
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    // returns
    if (typeof obj[Symbol.iterator] === 'function') {
        const result = obj[Symbol.iterator]();
        // returns
        if (typeof result === 'object' && typeof result.next === 'function') {
            return true;
        }
        return false;
    }
    return false;
}
//# sourceMappingURL=hasIterator.js.map