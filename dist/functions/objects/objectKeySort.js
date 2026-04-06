/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2.draft
 * @license MIT
 */
/**
 * Sorts a record object according to its keys and returns a sorted copy.
 *
 * Optionally provide a function to create the strings used to sort each object.
 *
 * @since 2.0.0-beta.2.draft
 */
export function objectKeySort(obj, recursive = false, 
/**
 * Takes an object key and returns the value to use when sorting it.
 *
 * Use this to e.g., add padding to numbers before sorting as strings or to
 * sort 'primary', 'secondary', etc. as their numerical values.
 */
sortMaker) {
    let entries = Object.entries(obj);
    if (recursive) {
        entries = entries.map(([key, value]) => {
            // returns
            if (typeof value !== 'object' || value === null) {
                return [key, value];
            }
            // returns
            if (Array.isArray(value)) {
                return [key, value];
            }
            return [key, objectKeySort(value, recursive, sortMaker)];
        });
    }
    let sortFn = sortMaker
        ? (a, b) => {
            const sort_a = sortMaker(a[0]);
            const sort_b = sortMaker(b[0]);
            if (sort_a > sort_b) {
                return 1;
            }
            if (sort_a < sort_b) {
                return -1;
            }
            return 0;
        }
        : (a, b) => {
            if (a[0] > b[0]) {
                return 1;
            }
            if (a[0] < b[0]) {
                return -1;
            }
            return 0;
        };
    return Object.fromEntries(entries.sort(sortFn));
}
//# sourceMappingURL=objectKeySort.js.map