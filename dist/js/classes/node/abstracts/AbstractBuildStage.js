/**
 * @since 0.4.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.4.0-draft
 * @license MIT
 */
// import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../../abstracts/AbstractConfigurableClass.js';
import { mergeArgs, } from '../../../functions/index.js';
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
export class AbstractBuildStage extends AbstractConfigurableClass {
    /* STATIC
     * ====================================================================== */
    /**
     * Default arguments for new objects.
     *
     * @category Args
     */
    static abstractArgs(args) {
        var _a;
        const ARGS_DEFAULT = {
            debug: false,
            'log-base-level': 0,
            notice: true,
            progress: true,
            verbose: false,
            argsRecursive: false,
        };
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(ARGS_DEFAULT, args, (_a = args === null || args === void 0 ? void 0 : args.argsRecursive) !== null && _a !== void 0 ? _a : ARGS_DEFAULT.argsRecursive);
    }
    /* Args ===================================== */
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = AbstractBuildStage.abstractArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs(mergedDefault, args !== null && args !== void 0 ? args : {}, this.ARGS_DEFAULT.argsRecursive);
        return merged;
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}, clr = 'black') {
        super(args);
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
    msgArgs(level = 0, msgArgs = {}, timeArgs = {}) {
        var _a, _b, _c, _d, _e, _f;
        const depth = level + Number((_a = this.args['log-base-level']) !== null && _a !== void 0 ? _a : 0);
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
            msg.linesIn = (_b = msgArgs.linesIn) !== null && _b !== void 0 ? _b : 2;
        }
        if (level > 0) {
            msg.linesIn = (_c = msgArgs.linesIn) !== null && _c !== void 0 ? _c : 1;
        }
        // if ( level > 1 ) {
        // }
        if (level > 2) {
            msg.italic = (_d = msgArgs.italic) !== null && _d !== void 0 ? _d : true;
            msg.linesIn = (_e = msgArgs.linesIn) !== null && _e !== void 0 ? _e : 0;
        }
        if (level > 3) {
            msg.clr = (_f = msgArgs.clr) !== null && _f !== void 0 ? _f : 'grey';
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
        this.fns.nc.timestampLog(msg, args.msg, args.time);
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
    async run(args = {}) {
        args = {
            ...this.args,
            ...args,
        };
        /* start */
        await this.startEndNotice('start');
        /* loop through the steps in order */
        for (const method of this.stages) {
            const include = Boolean(!args.only
                || args.only == method
                || args.only.includes(method));
            const exclude = Boolean(args.without
                && (args.without == method || args.without.includes(method)));
            if (include && !exclude && this[method]) {
                await this.runStage(method);
            }
        }
        /* end */
        await this.startEndNotice('end');
    }
}
//# sourceMappingURL=AbstractBuildStage.js.map