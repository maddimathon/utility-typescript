/**
 * @since 0.4.2
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type { RecursivePartial } from '../../../types/index.js';

import { MessageMaker } from '../../../classes/MessageMaker.js';
import { mergeArgs } from '../../../functions/objects/mergeArgs.js';

import { NodeConsole } from '../NodeConsole.js';
import { NodeFiles } from '../NodeFiles.js';


/**
 * A configurable class for a single stage of a build system run via npm.
 *
 * To run a build stage, an instance of the class should be constructed.  Then,
 * call the async {@link AbstractBuildStage.run | `run` method}.  The
 * {@link AbstractBuildStage.run | `run` method} iterates through the
 * {@link AbstractBuildStage.subStages | `subStages` property} and calls each
 * substage as a method of this class (via the
 * {@link AbstractBuildStage.runSubStage | abstract `runSubStage` method}).
 *
 * @typeParam T_SubStage  String literal of substage names to be run during this
 *                      stage.
 * @typeParam T_Args      Argument object type for the build stage.
 *
 * @since 0.4.2
 */
export abstract class AbstractBuildStage<
    T_SubStage extends string | never,
    T_Args extends AbstractBuildStage.Args<T_SubStage>,
> {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * A completed args object.
     * 
     * @category Args
     */
    public readonly args: T_Args;

    /**
     * A default completed args object.
     * 
     * @category Args
     */
    public abstract get ARGS_DEFAULT(): T_Args;

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: RecursivePartial<T_Args> ): T_Args {
        return mergeArgs( this.ARGS_DEFAULT as T_Args, args, true );
    }

    /**
     * Colour used for colour-coding this class.
     * 
     * @category Args
     */
    public readonly clr: MessageMaker.Colour;

    /**
     * The instance of {@link NodeFiles} used within this class.
     * 
     * @category Classes
     */
    public readonly fs: NodeFiles;

    /**
     * The instance of {@link NodeConsole} used within this class.
     * 
     * @category Classes
     */
    public readonly nc: NodeConsole;

    /**
     * The substages for this class' build. There must be methods for each
     * stage.
     */
    public readonly abstract subStages: readonly T_SubStage[];



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor (
        args: RecursivePartial<T_Args> = {},

        clr: MessageMaker.Colour = 'black',
        utils: {
            fs?: NodeFiles;
            nc?: NodeConsole;
        } = {},
    ) {
        this.args = this.buildArgs( args );

        this.clr = clr;

        this.nc = utils.nc ?? new NodeConsole();
        this.fs = utils.fs ?? new NodeFiles( {}, { nc: this.nc } );
    }



    /* METHODS
     * ====================================================================== */

    /**
     * Whether the given substage should be run according to the values of
     * `{@link AbstractBuildStage.T_Args}.only` and
     * `{@link AbstractBuildStage.T_Args}.without`.
     * 
     * @param subStage  Substage to check.
     * 
     * @return  Whether to run this stage.
     */
    public isSubStageIncluded( subStage: T_SubStage ): boolean {

        const include: boolean = Boolean(
            !this.args.only
            || this.args.only == subStage
            || this.args.only.includes( subStage )
        );

        const exclude: boolean = Boolean(
            this.args.without
            && (
                this.args.without == subStage
                || this.args.without.includes( subStage )
            )
        );

        return Boolean(
            include
            && !exclude
            && this[ subStage as keyof typeof this ]
        );
    }


    /* MESSAGES ===================================== */

    /**
     * Creates an argument object used to print messages to the terminal, adding
     * styling defaults by depth level.
     * 
     * @category Messagers
     * 
     * @see {@link AbstractBuildStage.clr}  Default colour for the message.
     * 
     * @param level     Depth level for this message.
     * @param msgArgs   Optional. Argument overrides for the message.
     * 
     * @return  An object with arguments separated by message (`msg`) and time.
     */
    protected msgArgs(
        level: number = 0,
        {
            time: timeArgs = {},
            ...msgArgs
        }: Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 1 ] = {},
    ): NonNullable<Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 1 ]> {

        type MsgArgs = Omit<NonNullable<Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 1 ]>, 'time'>;
        type TimeArgs = NonNullable<Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 1 ]>[ 'time' ];

        const depth = level + Number( this.args.logBaseLevel );

        const msg: MsgArgs = {
            bold: depth == 0 || level <= 1,
            clr: this.clr,

            depth,

            linesIn: 0,
            linesOut: 0,

            ...msgArgs,
        };

        const time: TimeArgs = timeArgs;

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

        return { ...msg, time };
    }

    /**
     * Prints a timestamped log message to the console. Only if 
     * `{@link AbstractBuildStage.T_Args}.notice` is truthy.
     * 
     * @category Messagers
     * 
     * @see {@link AbstractBuildStage['msgArgs']}  Generates default arguments.
     * 
     * @param msg       The message(s) to print to the console.
     * @param level     Depth level for this message (above the value of 
     *                  {@link AbstractBuildStage.T_Args.logBaseLevel|`this.args.logBaseLevel`}).
     * @param msgArgs   Optional. Argument overrides for the message.
     */
    public progressLog(
        msg: Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 0 ],
        level: number,
        msgArgs: Parameters<NodeConsole[ 'timestamp' ][ 'log' ]>[ 1 ] = {},
    ): void {
        if ( this.args[ 'progress' ] === false ) { return; }

        const args = this.msgArgs( level, msgArgs );

        this.nc.timestamp.log( msg, args );
    }

    /**
     * Prints a message to the console signalling the start or end of this build
     * stage.
     * 
     * @param which  Whether we are starting or ending.
     */
    public abstract startEndNotice( which: "start" | "end" ): Promise<void>;

    /**
     * Method for printing a log message to the console. Only if 
     * `{@link AbstractBuildStage.T_Args}.verbose` is truthy.
     * 
     * Alias for {@link AbstractBuildStage.progressLog}.
     * 
     * @category Messagers
     * 
     * @param msg       The message(s) to print to the console.
     * @param level     Depth level for this message (above the value of 
     *                  {@link AbstractBuildStage.T_Args.logBaseLevel|`this.args.logBaseLevel`}).
     * @param msgArgs   Optional. Argument overrides for the message.
     */
    public verboseLog(
        msg: Parameters<AbstractBuildStage<T_SubStage, T_Args>[ 'progressLog' ]>[ 0 ],
        level: Parameters<AbstractBuildStage<T_SubStage, T_Args>[ 'progressLog' ]>[ 1 ],
        msgArgs?: Parameters<AbstractBuildStage<T_SubStage, T_Args>[ 'progressLog' ]>[ 2 ],
    ): void {
        if ( !this.args[ 'verbose' ] ) { return; }
        this.progressLog( msg, level, msgArgs );
    }


    /* RUNNING ===================================== */

    /**
     * This method should probably not be overwritten.
     *
     * Cycles through each substage and runs
     * {@link AbstractBuildStage['runSubStage']} if the stage is not excluded or
     * all sub-stages are included.
     */
    public async run(): Promise<void> {

        /* start */
        await this.startEndNotice( 'start' );

        /* loop through the steps in order */
        for ( const method of this.subStages ) {

            if ( this.isSubStageIncluded( method ) ) {
                await this.runSubStage( method );
            }
        }

        /* end */
        await this.startEndNotice( 'end' );
    }

    /**
     * Used to run a single stage within this class; used by `run()`.
     */
    protected abstract runSubStage( stage: T_SubStage ): Promise<void>;
}

/**
 * Used only for {@link AbstractBuildStage}.
 * 
 * @since 0.4.2
 */
export namespace AbstractBuildStage {

    /**
     * Optional configuration for {@link AbstractBuildStage}.
     * 
     * @since 0.4.2
     */
    export interface Args<T_SubStage extends string | never> {

        /**
         * Only run this stage(s), else runs them all.
         */
        only?: T_SubStage | T_SubStage[];

        /**
         * Exclude this stage(s), else runs them all.
         */
        without?: T_SubStage | T_SubStage[];


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
         * 
         * @since ___PKG_VERSION___ — Renamed from 'log-base-level' to logBaseLevel.
         */
        logBaseLevel: number;

        /**
         * Display notice when starting/ending.
         * 
         * @default true
         */
        notice: boolean;

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