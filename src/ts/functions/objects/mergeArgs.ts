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

import type { AnyClass } from '../../types/functions/index.js';
import type { RecursivePartial } from '../../types/objects/index.js';


/**
 * Used only for {@link mergeArgs | mergeArgs()}.
 * 
 * @namespace
 */
export namespace mergeArgs {

    /**
     * Default allowed values for argument objects.
     * 
     * @source
     */
    export type ArgsSingleValue = AnyClass | boolean | number | null | string;

    /**
     * Default allowed values for {@link Obj | mergeArgs.Obj} properties.
     * 
     * @source
     */
    export type ObjProp<Value extends any = null> =
        | ArgsSingleValue
        | Value
        | ( ( ...p: any[] ) => ( ArgsSingleValue | Value ) );

    /**
     * Argument objects compatible with {@link mergeArgs | mergeArgs()}.
     * 
     * @source
     */
    export type Obj<
        Values extends any = any,
        Keys extends string = string,
    > = {
            [ K in Keys ]:
            | ObjProp<ArgsSingleValue | Values>
            | ObjProp<ArgsSingleValue | Values>[]
            | Obj<ArgsSingleValue | Values>;
        };

    /**
     * Interface defining the overloads for {@link mergeArgs | mergeArgs()}.
     */
    export interface Function {

        /**
         * Passing `recursive` as false means that the input type must be a
         * `Partial`.
         */
        <
            V extends any,
            D extends Obj<V>,
            I extends Partial<D>,
        >(
            defaults: D,
            inputs?: I | undefined,
            recursive?: false | undefined,
        ): D & I;

        /**
         * Passing `recursive` as true means that the input type must actually be a 
         * {@link RecursivePartial}.
         */
        <
            V extends any,
            D extends Obj<V>,
            I extends RecursivePartial<D>,
        >(
            defaults: D,
            inputs?: I | undefined,
            recursive?: true,
        ): D & I;

        /**
         * Catch-all.
         */
        <
            V extends any,
            D extends Obj<V>,
            I extends RecursivePartial<D>,
        >(
            defaults: D,
            inputs?: I | undefined,
            recursive?: boolean | undefined,
        ): D & I;
    }
}


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
 * @function
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
export const mergeArgs: mergeArgs.Function = <
    V extends any,
    D extends mergeArgs.Obj<V>,
    I extends RecursivePartial<D>,
>(
    defaults: D,
    inputs?: I | undefined,
    recursive: boolean = false,
): D & I => {
    // invalid default object becomes an empty object
    if ( typeof defaults !== 'object' || !defaults ) { defaults = {} as D; }

    // returns
    // invalid or non-existant input means we can just return a copy of the defaults
    if ( typeof inputs === 'undefined' || typeof inputs !== 'object' || !inputs ) {
        return { ...defaults } as D & I;
    }

    const result: D & I = {
        ...defaults,
        ...inputs,
    };

    // returns
    // no need to get any deeper than that
    if ( !recursive ) { return result; }

    const defaultKeys: ( keyof D )[] = Object.keys( defaults );

    for ( const key of defaultKeys ) {
        // continues
        // no override value for this key was input
        if ( !( key in inputs ) || inputs[ key as keyof I ] === undefined ) {
            continue;
        }

        const defaultValue: D[ keyof D ] = defaults[ key ];
        const inputValue: I[ keyof D & keyof I ] = inputs[ key as keyof D & keyof I ];

        // continues
        // this is not a property that needs recursion
        if (
            defaultValue === null
            || typeof defaultValue === 'undefined'
            || typeof defaultValue !== 'object'
            || typeof inputValue !== 'object'
        ) {
            continue;
        }

        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (
            typeof ( defaultValue as { prototype?: Function; } ).prototype !== 'undefined'
            || typeof ( inputValue as { prototype?: Function; } ).prototype !== 'undefined'
        ) {
            continue;
        }

        // continues
        // not a simple args object and shouldn't have its props overwritten
        if (
            defaultValue === null
            || inputValue === null
            || Array.isArray( defaultValue )
            || Array.isArray( inputValue )
        ) {
            continue;
        }

        // get deep
        // I am fairly certain that I have accounted for all possibilities and
        // that this typing issue might be unavoidable -- or at least requires
        // typing skills I don't yet have
        // @ts-expect-error
        result[ key ]
            = mergeArgs(
                defaultValue as mergeArgs.Obj<V>,
                inputValue,
                recursive,
            );
    }
    return result;
};