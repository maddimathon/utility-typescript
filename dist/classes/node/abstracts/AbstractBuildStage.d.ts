/**
 * @since 0.4.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1
 * @license MIT
 */
import { AbstractConfigurableClass } from '../../abstracts/AbstractConfigurableClass.js';
import { MessageMaker } from '../../MessageMaker.js';
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
 * @typeParam SubStage  String literal of substage names to be run during this
 *                      stage.
 * @typeParam Args      Argument object type for the build stage.
 *
 * @since 0.4.2
 */
export declare abstract class AbstractBuildStage<SubStage extends string | never, Args extends AbstractBuildStage.Args<SubStage>> extends AbstractConfigurableClass<Args> {
    /**
     * Colour used for colour-coding this class.
     */
    readonly clr: MessageMaker.Colour;
    /**
     * The instance of {@link NodeFiles} used within this class.
     *
     * @category Classes
     */
    readonly fs: NodeFiles;
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    readonly nc: NodeConsole;
    /**
     * The substages for this class' build. There must be methods for each
     * stage.
     */
    abstract readonly subStages: readonly SubStage[];
    constructor(args?: Partial<Args>, clr?: MessageMaker.Colour, utils?: {
        fs?: NodeFiles;
        nc?: NodeConsole;
    });
    /**
     * Whether the given substage should be run according to the values of
     * `{@link AbstractBuildStage.Args}.only` and
     * `{@link AbstractBuildStage.Args}.without`.
     *
     * @param subStage  Substage to check.
     *
     * @return  Whether to run this stage.
     */
    isSubStageIncluded(subStage: SubStage): boolean;
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
     * @param timeArgs  Optional. Argument overrides for the message's timestamp.
     *
     * @return  An object with arguments separated by message (`msg`) and time.
     */
    protected msgArgs(level?: number, msgArgs?: Parameters<NodeConsole['timestampLog']>[1], timeArgs?: Parameters<NodeConsole['timestampLog']>[2]): {
        msg: Parameters<NodeConsole['timestampLog']>[1];
        time: Parameters<NodeConsole['timestampLog']>[2];
    };
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
    progressLog(msg: Parameters<NodeConsole['timestampLog']>[0], level: number, msgArgs?: Parameters<NodeConsole['timestampLog']>[1], timeArgs?: Parameters<NodeConsole['timestampLog']>[2]): void;
    /**
     * Prints a message to the console signalling the start or end of this build
     * stage.
     *
     * @param which  Whether we are starting or ending.
     */
    abstract startEndNotice(which: "start" | "end"): Promise<void>;
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
    verboseLog(msg: Parameters<AbstractBuildStage<SubStage, Args>['progressLog']>[0], level: Parameters<AbstractBuildStage<SubStage, Args>['progressLog']>[1], msgArgs?: Parameters<AbstractBuildStage<SubStage, Args>['progressLog']>[2], timeArgs?: Parameters<AbstractBuildStage<SubStage, Args>['progressLog']>[3]): void;
    /**
     * This method should probably not be overwritten.
     *
     * Cycles through each substage and runs
     * {@link AbstractBuildStage['runSubStage']} if the stage is not excluded or
     * all sub-stages are included.
     */
    run(): Promise<void>;
    /**
     * Used to run a single stage within this class; used by `run()`.
     */
    protected abstract runSubStage(stage: SubStage): Promise<void>;
}
/**
 * Used only for {@link AbstractBuildStage}.
 *
 * @since 0.4.2
 */
export declare namespace AbstractBuildStage {
    /**
     * Optional configuration for {@link AbstractBuildStage}.
     *
     * @since 0.4.2
     */
    interface Args<SubStage extends string | never> extends AbstractConfigurableClass.Args {
        argsRecursive: false;
        /**
         * Only run this stage(s), else runs them all.
         */
        only?: SubStage | SubStage[];
        /**
         * Exclude this stage(s), else runs them all.
         */
        without?: SubStage | SubStage[];
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
    }
}
//# sourceMappingURL=AbstractBuildStage.d.ts.map