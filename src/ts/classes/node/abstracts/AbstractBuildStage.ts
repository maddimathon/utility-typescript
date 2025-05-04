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

// import type { RecursivePartial } from '../../types/objects/index.js';

import { AbstractConfigurableClass } from '../../abstracts/AbstractConfigurableClass.js';

import {
    mergeArgs,
} from '../../../functions/index.js';

import { MessageMaker } from '../../MessageMaker.js';
import { NodeConsole } from '../NodeConsole.js';
import { NodeFunctions } from '../NodeFunctions.js';


/**
 * A configurable class for a single stage of a build system run via npm.
 *
 * To run a build stage, an instance of the class should be constructed.  Then,
 * call the async {@link AbstractBuildStage['run'] | `run` method}.  The
 * {@link AbstractBuildStage['run'] | `run` method} iterates through the
 * {@link AbstractBuildStage['stages'] | `stages` property} and calls each
 * substage as a method of this class (via the
 * {@link AbstractBuildStage['runStage'] | abstract `runStage` method}).
 *
 * @typeParam Stages  String literal of substage names to be run during this
 * stage.
 * @typeParam Args    
 *
 * @example
 * ```ts
 * ```
 */
export abstract class AbstractBuildStage<
    Stages extends string | never,
    Args extends AbstractBuildStage.Args<Stages>,
> extends AbstractConfigurableClass<Args> {



    /* STATIC
     * ====================================================================== */

    /**
     * Default arguments for new objects.
     * 
     * @category Args
     */
    public static override abstractArgs<I extends Partial<AbstractBuildStage.Args<string>>>(
        args: I,
    ): AbstractBuildStage.Args<string> & I {

        const ARGS_DEFAULT: AbstractBuildStage.Args<string> = {

            debug: false,
            'log-base-level': 0,
            notice: true,
            progress: true,
            verbose: false,

            argsRecursive: false,
        };

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            ARGS_DEFAULT,
            args,
            args?.argsRecursive ?? ARGS_DEFAULT.argsRecursive
        ) as AbstractBuildStage.Args<string> & I;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * Colour used for colour-coding this class.
     */
    public readonly clr: MessageMaker.Colour;

    /**
     * The instance of {@link NodeFunctions} used within this class.
     * 
     * @category Classes
     */
    public readonly fns: NodeFunctions;

    /**
     * The substages for this class' build. There must be methods for each
     * stage.
     */
    public readonly abstract stages: readonly Stages[];


    /* Args ===================================== */

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: Partial<Args> ): Args {

        const mergedDefault: Args = AbstractBuildStage.abstractArgs(
            this.ARGS_DEFAULT
        );

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs(
            mergedDefault,
            args ?? {},
            this.ARGS_DEFAULT.argsRecursive
        ) as Args;

        return merged;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (
        args: Partial<Args> = {},
        clr: MessageMaker.Colour = 'black',
    ) {
        super( args );

        this.clr = clr;
        this.fns = new NodeFunctions();
    }



    /* METHODS
     * ====================================================================== */


    /* MESSAGES ===================================== */

    /**
     * Creates an argument object used to print messages to the terminal, adding
     * styling defaults by depth level.
     * 
     * @category Messagers
     * 
     * @see {@link AbstractBuildStage.clr}  Default colour for the message.
     * 
     * @param level     Depth level for this message (above the value of 
     *                  {@link AbstractBuildStage.Args['log-base-level']|`this.args[ 'log-base-level' ]`}).
     * @param msgArgs   Optional. Argument overrides for the message.
     * @param timeArgs  Optional. Argument overrides for the message's timestamp.
     * 
     * @return  An object with arguments separated by message (`msg`) and time.
     */
    protected msgArgs(
        level: number = 0,
        msgArgs: Parameters<NodeConsole[ 'timestampLog' ]>[ 1 ] = {},
        timeArgs: Parameters<NodeConsole[ 'timestampLog' ]>[ 2 ] = {},
    ): {
        msg: Parameters<NodeConsole[ 'timestampLog' ]>[ 1 ];
        time: Parameters<NodeConsole[ 'timestampLog' ]>[ 2 ];
    } {
        const depth = level + Number( this.args[ 'log-base-level' ] ?? 0 );

        const msg: typeof msgArgs = {

            bold: depth == 0 || level <= 1,
            clr: this.clr,

            depth,

            linesIn: 0,
            linesOut: 0,

            ...msgArgs,
        };

        const time: typeof timeArgs = {
            ...timeArgs,
        };

        if ( level <= 0 ) {
            msg.linesIn = msgArgs.linesIn ?? 2;
        }

        if ( level > 0 ) {
            msg.linesIn = msgArgs.linesIn ?? 1;
        }

        // if ( level > 1 ) {
        // }

        if ( level > 2 ) {
            msg.italic = msgArgs.italic ?? true;
            msg.linesIn = msgArgs.linesIn ?? 0;
        }

        if ( level > 3 ) {
            msg.clr = msgArgs.clr ?? 'grey';
        }

        return { msg, time };
    }

    /**
     * Prints a timestamped log message to the console. Only if 
     * `{@link AbstractBuildStage.Args}.notice` is truthy.
     * 
     * @category Messagers
     * 
     * @see {@link AbstractBuildStage['msgArgs']}  Generates default arguments.
     * 
     * @param msg       The message(s) to print to the console.
     * @param level     Depth level for this message (above the value of 
     *                  {@link AbstractBuildStage.Args['log-base-level']|`this.args[ 'log-base-level' ]`}).
     * @param msgArgs   Optional. Argument overrides for the message.
     * @param timeArgs  Optional. Argument overrides for the message's timestamp.
     */
    public progressLog(
        msg: Parameters<NodeConsole[ 'timestampLog' ]>[ 0 ],
        level: number,
        msgArgs: Parameters<NodeConsole[ 'timestampLog' ]>[ 1 ] = {},
        timeArgs: Parameters<NodeConsole[ 'timestampLog' ]>[ 2 ] = {},
    ): void {
        if ( this.args[ 'progress' ] === false ) { return; }

        const args = this.msgArgs( level, msgArgs, timeArgs );

        this.fns.nc.timestampLog( msg, args.msg, args.time );
    }

    public abstract startEndNotice( which: "start" | "end" ): Promise<void>;

    /**
     * Method for printing a log message to the console. Only if 
     * `{@link AbstractBuildStage.Args}.verbose` is truthy.
     * 
     * Alias for {@link AbstractBuildStage.progressLog}.
     * 
     * @category Messagers
     * 
     * @param msg       The message(s) to print to the console.
     * @param level     Depth level for this message (above the value of 
     *                  {@link AbstractBuildStage.Args['log-base-level']|`this.args[ 'log-base-level' ]`}).
     * @param msgArgs   Optional. Argument overrides for the message.
     * @param timeArgs  Optional. Argument overrides for the message's timestamp.
     */
    public verboseLog(
        msg: Parameters<AbstractBuildStage<Stages, Args>[ 'progressLog' ]>[ 0 ],
        level: Parameters<AbstractBuildStage<Stages, Args>[ 'progressLog' ]>[ 1 ],
        msgArgs?: Parameters<AbstractBuildStage<Stages, Args>[ 'progressLog' ]>[ 2 ],
        timeArgs?: Parameters<AbstractBuildStage<Stages, Args>[ 'progressLog' ]>[ 3 ],
    ): void {
        if ( !this.args[ 'verbose' ] ) { return; }
        this.progressLog( msg, level, msgArgs, timeArgs );
    }


    /* RUNNING ===================================== */

    public async run( args: Partial<Args> = {} ) {
        args = {
            ...this.args,
            ...args,
        };

        /* start */
        await this.startEndNotice( 'start' );

        /* loop through the steps in order */
        for ( const method of this.stages ) {

            const include: boolean = Boolean(
                !args.only
                || args.only == method
                || args.only.includes( method )
            );

            const exclude: boolean = Boolean(
                args.without
                && ( args.without == method || args.without.includes( method ) )
            );

            if ( include && !exclude && this[ method as keyof typeof this ] ) {
                await this.runStage( method );
            }
        }

        /* end */
        await this.startEndNotice( 'end' );
    }

    /**
     * Used to run a single stage within this class; used by `run()`.
     */
    protected abstract runStage( stage: Stages ): Promise<void>;
}

/**
 * Used only for {@link AbstractBuildStage}.
 */
export namespace AbstractBuildStage {

    /**
     * Optional configuration for {@link AbstractBuildStage}.
     */
    export type Args<Stages extends string | never> = AbstractConfigurableClass.Args & {

        /**
         * Only run this stage(s), else runs them all.
         */
        only?: Stages | Stages[];

        /**
         * Exclude this stage(s), else runs them all.
         */
        without?: Stages | Stages[];


        /* ## LOG MESSAGES ===================================== */

        /**
         * Display extra information that could be helpful for debugging scripts.
         * 
         * @default false
         */
        debug: boolean;

        /**
         * The minimum log level to output.
         * 
         * @default 0
         */
        'log-base-level': number;

        /**
         * Display notice when starting/ending.
         * 
         * @default true
         */
        notice: boolean;

        argsRecursive: false;

        /**
         * Display progress update messages after initial notice.
         * 
         * @default true
         */
        progress: boolean;

        /**
         * Display extra status updates.
         * 
         * @default false
         */
        verbose: boolean;


        /* ## STAGE FLAGS ===================================== */
        /* these are values used to indicate that another build script is being run */

        /**
         * Indicates that this is being done as part of the building script.
         */
        building?: boolean;

        /**
         * Indicates a package/release dry-run - i.e., make no irreversable changes.
         */
        dryrun?: boolean;

        /**
         * Indicates that this is being done as part of the packaging script - i.e.,
         * go full out.
         */
        packaging?: boolean;

        /**
         * Indicates that this is being done as part of the releasing script - i.e.,
         * go full out and update all placeholders.
         */
        releasing?: boolean;

        /**
         * Indicates that this is being done as just before the start or watch scripts.
         */
        starting?: boolean;


        /* ### Watching-Related ------------------ */

        /**
         * Event name that triggered a watch event.
         */
        watchedEvent?: string;

        /**
         * File that triggered a watch event.
         */
        watchedFilename?: string;

        /**
         * Watcher script that triggered a watch event.
         */
        watchedWatcher?: string;
    };
}