import { mergeArgs } from '../../functions/objects/index.js';
import { AbstractConfigurableClass } from './AbstractConfigurableClass.js';


// #region Example
export class ExampleClass extends AbstractConfigurableClass<ExampleClass.Args> {


    /* PROPERTIES
     * ====================================================================== */

    public get ARGS_DEFAULT() {

        return {
            argsRecursive: false,
            exampleProp: true,
        } as const satisfies ExampleClass.Args;
    }

    /**
     * Build a complete args object.
     */
    public override buildArgs(
        args?: Partial<ExampleClass.Args>,
    ): ExampleClass.Args {

        const mergedDefault = this.ARGS_DEFAULT as ExampleClass.Args;

        // using this.mergeArgs here can cause issues because 
        // this method is sometimes called from the prototype
        return mergeArgs( mergedDefault, args, this.ARGS_DEFAULT.argsRecursive );
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor ( args: Partial<ExampleClass.Args> = {} ) {
        super( args );
    }
}

export namespace ExampleClass {

    export interface Args extends AbstractConfigurableClass.Args {
        argsRecursive: false;
        exampleProp: boolean;
    };
};
// #endregion Example
