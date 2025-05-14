/**
 * @since 0.1.1
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

import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';

import {
    escRegExp,
    escRegExpReplace,
    mergeArgs,
    slugify,
    timestamp,
    toTitleCase,
    typeOf,
} from '../functions/index.js';


/**
 * A configurable class of utility functions.
 * 
 * Can be extended, but probably best as a (static) property instead.
 * 
 * @experimental
 */
export class Functions extends AbstractConfigurableClass<Functions.Args> {


    /* PROPERTIES
     * ====================================================================== */

    public get ARGS_DEFAULT() {

        return {
            argsRecursive: false,
        } as const satisfies Functions.Args;
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: Partial<Functions.Args> ): Functions.Args {

        const mergedDefault = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as Functions.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            mergedDefault,
            args ?? {},
            this.ARGS_DEFAULT.argsRecursive
        );
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor ( args: Partial<Functions.Args> = {} ) {
        super( args );
    }



    /* METHODS
     * ====================================================================== */

    /** 
     * An alias for this package's {@link typeOf | typeOf()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public typeOf = ( ...params: Parameters<typeof typeOf> ) => typeOf( ...params );


    /* ARRAYS ===================================== */


    /* HTML ===================================== */


    /* OBJECTS ===================================== */


    /* REGEX ===================================== */

    /** 
     * An alias for this package's {@link escRegExp | escRegExp()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public escRegExp = ( ...params: Parameters<typeof escRegExp> ) => escRegExp( ...params );

    /** 
     * An alias for this package's {@link escRegExpReplace | escRegExpReplace()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public escRegExpReplace = ( ...params: Parameters<typeof escRegExpReplace> ) => escRegExpReplace( ...params );


    /* STRINGS ===================================== */

    /** 
     * An alias for this package's {@link slugify | slugify()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public slugify = ( ...params: Parameters<typeof slugify> ) => slugify( ...params );

    /** 
     * An alias for this package's {@link timestamp | timestamp()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public timestamp = ( ...params: Parameters<typeof timestamp> ) => timestamp( ...params );

    /** 
     * An alias for this package's {@link toTitleCase | toTitleCase()}.
     * 
     * @category Aliases
     * 
     * @function 
     */
    public toTitleCase = ( ...params: Parameters<typeof toTitleCase> ) => toTitleCase( ...params );
}

/**
 * Used only for {@link Functions}.
 */
export namespace Functions {

    /**
     * Optional configuration for {@link Functions}.
     */
    export type Args = AbstractConfigurableClass.Args & {
    };
}