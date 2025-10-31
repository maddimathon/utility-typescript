/**
 * @since 2.0.0-beta.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '../../types/objects/index.js';
import { arrayUnique } from '../arrays/arrayUnique.js';


/**
 * Inputs can be undefined, and if so, the default is returned.
 * 
 * @typeParam V  Args object values.
 * @typeParam D  Default object type.
 * @typeParam I  Input object type.
 *
 * @param defaults   Default values (if not specified in inputs).
 * @param inputs     Overriding values (changes to make).
 * @param recursive  Optional. Whether to merge the object recursively. 
 *                   Default false.
 *
 * @return  Resulting object with all the `defaults` and `inputs` keys with 
 *          either default values or input values, as appropriate.
 */
export async function mergeArgsAsync<
    D extends object,
>(
    defaults: D,
    inputs?: undefined,
    recursive?: boolean | undefined,
    mergeArrays?: boolean | undefined,
): Promise<D>;

/**
 * Passing `recursive` as false means that the input type must be a `Partial`
 * (not {@link RecursivePartial}).
 */
export async function mergeArgsAsync<
    D extends object,
    I extends Partial<D>,
>(
    defaults: D,
    inputs: I,
    recursive?: false | undefined,
    mergeArrays?: boolean | undefined,
): Promise<D & I>;

/**
 * Passing `recursive` as true means that the input type may actually be a 
 * {@link RecursivePartial}.
 */
export async function mergeArgsAsync<
    D extends object,
    I extends Partial<D> | RecursivePartial<D>,
>(
    defaults: D,
    inputs: I,
    recursive: true,
    mergeArrays?: boolean | undefined,
): Promise<D & I>;

/**
 * Universal overload.
 */
export async function mergeArgsAsync<
    D extends object,
    I extends Partial<D> | RecursivePartial<D>,
>(
    defaults: D,
    inputs?: I | undefined,
    recursive?: boolean | undefined,
    mergeArrays?: boolean | undefined,
): Promise<D | D & I>;


/**
 * Returns an updated version of `defaults` merged with the contents of
 * `inputs`.
 *
 * Useful for parsing objects passed to functions with extra, optional options.
 * Preserves all input properties.
 * 
 * Overloaded for better typing dependent on recursion.
 * 
 * @category Arg Objects
 * 
 * @since 0.1.0
 */
export async function mergeArgsAsync<
    D extends object,
    I extends RecursivePartial<D>,
>(
    defaults: D,
    inputs?: I | undefined,
    recursive: boolean = false,
    mergeArrays: boolean = false,
): Promise<D | D & I> {
    // returns
    // invalid default object just returns the input (or empty object)
    if ( typeof defaults !== 'object' || !defaults ) {
        return { ...inputs ?? {} } as D & I;
    }

    // returns
    // invalid or non-existant input means we can just return a copy of the defaults
    if ( typeof inputs === 'undefined' || typeof inputs !== 'object' || !inputs ) {
        return { ...defaults };
    }

    // merged, but not recursively
    const simpleMerge: D & I = {
        ...defaults,
        ...inputs,
    };

    // returns
    // no need to get deeper
    if ( !recursive ) {
        return simpleMerge;
    }

    const entries = Array.from(
        Object.entries( simpleMerge ) as Iterable<[
            keyof typeof simpleMerge,
            ( typeof simpleMerge )[ keyof typeof simpleMerge ]
        ]>,
        async ( [ key, inputValue ] ) => {
            // returns
            // this is not in the defaults
            if ( !( key in defaults ) ) {
                return [ key, inputValue ];
            }

            const defaultValue: D[ keyof D ] = defaults[ key as keyof D ];

            // returns
            // this is not a property that needs recursion
            if (
                defaultValue === null
                || inputValue === null
                || typeof defaultValue === 'undefined'
                || typeof defaultValue !== 'object'
                || typeof inputValue === 'undefined'
                || typeof inputValue !== 'object'
            ) {
                return [ key, inputValue ];
            }

            // continues
            // not a simple args object and shouldn't have its props overwritten
            if (
                Array.isArray( defaultValue )
                || Array.isArray( inputValue )
            ) {
                if (
                    mergeArrays
                    && Array.isArray( defaultValue )
                    && Array.isArray( inputValue )
                ) {
                    return [ key, arrayUnique( defaultValue.concat( inputValue ) ) ];
                }

                return [ key, inputValue ];
            }

            // continues
            // not a simple args object and shouldn't have its props overwritten
            if (
                typeof ( defaultValue as { prototype?: Function; } ).prototype !== 'undefined'
                || typeof ( inputValue as { prototype?: Function; } ).prototype !== 'undefined'
            ) {
                return [ key, inputValue ];
            }

            return (
                mergeArgsAsync(
                    defaultValue,
                    inputValue,
                    recursive,
                    mergeArrays,
                ) as Promise<( D & I )[ keyof D ]>
            ).then( ( value ) => [ key, value ] );
        }
    );

    return Promise.all( entries ).then( Object.fromEntries );
}