/**
 * @since 0.4.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.1.draft
 * @license MIT
 */
// import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../../abstracts/AbstractConfigurableClass.js';
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
export class AbstractBuildStage extends AbstractConfigurableClass {
    /* LOCAL PROPERTIES
     * ====================================================================== */
    /**
     * Colour used for colour-coding this class.
     */
    clr;
    /**
     * The instance of {@link NodeFiles} used within this class.
     *
     * @category Classes
     */
    fs;
    /**
     * The instance of {@link NodeConsole} used within this class.
     *
     * @category Classes
     */
    nc;
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}, clr = 'black', utils = {}) {
        super(args);
        this.clr = clr;
        this.nc = utils.nc ?? new NodeConsole();
        this.fs = utils.fs ?? new NodeFiles({}, { nc: this.nc });
    }
    /* METHODS
     * ====================================================================== */
    /**
     * Whether the given substage should be run according to the values of
     * `{@link AbstractBuildStage.Args}.only` and
     * `{@link AbstractBuildStage.Args}.without`.
     *
     * @param subStage  Substage to check.
     *
     * @return  Whether to run this stage.
     */
    isSubStageIncluded(subStage) {
        const include = Boolean(!this.args.only
            || this.args.only == subStage
            || this.args.only.includes(subStage));
        const exclude = Boolean(this.args.without
            && (this.args.without == subStage
                || this.args.without.includes(subStage)));
        return Boolean(include
            && !exclude
            && this[subStage]);
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
     * @param timeArgs  Optional. Argument overrides for the message's timestamp.
     *
     * @return  An object with arguments separated by message (`msg`) and time.
     */
    msgArgs(level = 0, msgArgs = {}, timeArgs = {}) {
        const depth = level + Number(this.args['log-base-level'] ?? 0);
        const msg = {
            bold: depth == 0 || level <= 1,
            clr: this.clr,
            depth,
            linesIn: 0,
            linesOut: 0,
            ...msgArgs,
        };
        const time = {
            ...timeArgs,
        };
        if (level <= 0) {
            msg.linesIn = msgArgs.linesIn ?? 2;
        }
        if (level > 0) {
            msg.linesIn = msgArgs.linesIn ?? 1;
        }
        // if ( level > 1 ) {
        // }
        if (level > 2) {
            msg.italic = msgArgs.italic ?? true;
            msg.linesIn = msgArgs.linesIn ?? 0;
        }
        if (level > 3) {
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
    progressLog(msg, level, msgArgs = {}, timeArgs = {}) {
        if (this.args['progress'] === false) {
            return;
        }
        const args = this.msgArgs(level, msgArgs, timeArgs);
        this.nc.timestampLog(msg, args.msg, args.time);
    }
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
    verboseLog(msg, level, msgArgs, timeArgs) {
        if (!this.args['verbose']) {
            return;
        }
        this.progressLog(msg, level, msgArgs, timeArgs);
    }
    /* RUNNING ===================================== */
    /**
     * This method should probably not be overwritten.
     *
     * Cycles through each substage and runs
     * {@link AbstractBuildStage['runSubStage']} if the stage is not excluded or
     * all sub-stages are included.
     */
    async run() {
        /* start */
        await this.startEndNotice('start');
        /* loop through the steps in order */
        for (const method of this.subStages) {
            if (this.isSubStageIncluded(method)) {
                await this.runSubStage(method);
            }
        }
        /* end */
        await this.startEndNotice('end');
    }
}
/**
 * Used only for {@link AbstractBuildStage}.
 *
 * @since 0.4.2
 */
(function (AbstractBuildStage) {
    ;
})(AbstractBuildStage || (AbstractBuildStage = {}));
//# sourceMappingURL=AbstractBuildStage.js.map