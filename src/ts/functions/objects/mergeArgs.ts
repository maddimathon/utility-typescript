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

import { AnyClass } from '../../types/functions/index.js';

/**
 * Used only for the {@link mergeArgs | `mergeArgs` function}.
 * 
 * @alpha
 */
export namespace mergeArgs {

    /**
     * Default allowed values for argument objects.
     */
    type ArgsSingleValue = AnyClass | boolean | number | null | string;

    /**
     * Default allowed values for {@link Obj | mergeArgs.Obj} properties.
     */
    export type ArgsValue<Value extends any = null> =
        | ArgsSingleValue
        | Value
        | ( ( ...p: any[] ) => ( ArgsSingleValue | Value ) );

    /**
     * Argument objects compatible with {@link mergeArgs | `mergeArgs` function}.
     * @interface
     * @expand
     */
    export type Obj<
        Values extends any = null,
        Keys extends string = string,
    > = {
            [ K in Keys ]:
            | ArgsValue<ArgsSingleValue | Values>
            | ArgsValue<ArgsSingleValue | Values>[]
            | Obj<ArgsSingleValue | Values>;
        };
}


/**
 * Returns an updated version of `defaults` merged with the contents of
 * `inputs`.
 *
 * Useful for parsing objects passed to functions with extra, optional options.
 * Preserves all input keys.
 * 
 * Not yet tested.
 * @alpha
 * 
 * @template D  Default object type.
 * @template I  Input object type. Should be equivalent to `Partial<D>`.
 *
 * @param defaults   Default values (if notspecified in inputs).
 * @param inputs     Overriding values (changes to make).
 * @param recursive  Optional. Whether to merge the object recursively. Default
 *                   false.
 *
 * @return  Resulting object with all the `defaults` and `inputs` keys with
 *          either default values or input values, as appropriate.
 */
export function mergeArgs<
    D extends mergeArgs.Obj,
    I extends Partial<D>,
>(
    defaults: D,
    inputs?: I,
    recursive: boolean = false,
): D & I {
    if ( typeof inputs === 'undefined' || typeof defaults !== 'object' || !defaults ) { defaults = {} as D; }
    if ( typeof inputs !== 'object' || !inputs ) { return { ...defaults } as D & I; }

    const result: D & I = {
        ...defaults,
        ...inputs,
    };

    if ( !recursive ) { return result; }

    const defaultKeys: ( keyof D )[] = Object.keys( defaults ) as ( keyof D )[];

    for ( const key of defaultKeys ) {

        if ( typeof inputs[ key ] === 'undefined' || inputs[ key ] === undefined ) {
            continue;
        }

        const defaultValue: D[ keyof D ] = defaults[ key ];
        const inputValue: I[ keyof I ] = inputs[ key ];

        if (
            !recursive
            || typeof defaultValue !== 'object'
            || typeof inputValue !== 'object'
        ) {
            continue;
        }

        if (
            // @ts-expect-error
            typeof defaultValue.prototype !== 'undefined'
            // @ts-expect-error
            || typeof inputValue.prototype !== 'undefined'
        ) {
            continue;
        }

        if (
            defaultValue === null
            || inputValue === null
            || Array.isArray( defaultValue )
            || Array.isArray( inputValue )
        ) {
            continue;
        }

        // get deep
        result[ key ] = mergeArgs(
            { ...defaultValue },
            { ...inputValue },
            recursive,
        ) as ( D & I )[ keyof D ];
    }
    return result;
}