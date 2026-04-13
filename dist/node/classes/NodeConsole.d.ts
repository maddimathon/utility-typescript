/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import type { RecursivePartial } from '../../types/index.js';
import { MessageMaker } from '../../classes/MessageMaker.js';
import { VariableInspector } from '../../classes/VariableInspector.js';
import { NodeConsole_Prompt } from './NodeConsole/NodeConsole_Prompt.js';
export * from './NodeConsole/NodeConsole_Error.js';
export * from './NodeConsole/NodeConsole_Prompt.js';
/**
 * A configurable class for outputting to console within node.
 *
 * Includes formatting and interactive utilities.
 *
 * @see {@link MessageMaker}  Used to format strings for output.  Initialized in the constructor.
 *
 * @since 0.1.1
 * @since 2.0.0-alpha — Prompters moved to a {@link NodeConsole_Prompt} property instead.
 *
 * @experimental
 */
export declare class NodeConsole {
    #private;
    /**
     * Prints sample output to the console via NodeConsole.log().
     *
     * @category Static
     *
     * @returns  An example, constructed instance used for the sample.
     */
    static sample(args?: RecursivePartial<NodeConsole.Args & {
        debug: boolean;
    }>): Promise<NodeConsole>;
    /**
     * Samples the interactive methods.
     *
     * @category Static
     */
    static sampleInteractivity(nc?: NodeConsole, args?: RecursivePartial<NodeConsole.Args & {
        debug: boolean;
    }>): Promise<NodeConsole>;
    /**
     * A local instance of {@link MessageMaker} initialized using
     * `{@link NodeConsole.Args}.msgMaker`.
     *
     * @category Utilities
     */
    readonly msg: MessageMaker;
    /**
     * Public alias for internal prompting methods.
     *
     * @category Interactive
     */
    readonly prompt: NodeConsole_Prompt;
    /**
     * A completed args object.
     *
     * @category Args
     */
    readonly args: NodeConsole.Args;
    /**
     * @category Args
     *
     * @source
     */
    get ARGS_DEFAULT(): NodeConsole.Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: RecursivePartial<NodeConsole.Args>): NodeConsole.Args;
    /**
     * Gets the `maxWidth` from {@link NodeConsole.args}, or default (`120`) if
     * none is set.
     *
     * @category Args
     */
    get maxWidth(): number;
    constructor(args?: RecursivePartial<NodeConsole.Args>);
    /**
     * Runs given string as a terminal command, optional with arguments.
     *
     * @category Terminal
     *
     * @param cmd           Command to run in the terminal.
     * @param args          Optional. Passed to {@link NodeConsole.cmdArgs}. Default `{}`.
     * @param literalFalse  Optional. Passed to {@link NodeConsole.cmdArgs}. Default `undefined`.
     * @param equals        Optional. Passed to {@link NodeConsole.cmdArgs}. Default `undefined`.
     */
    cmd(cmd: string, args?: Parameters<NodeConsole['cmdArgs']>[0], literalFalse?: Parameters<NodeConsole['cmdArgs']>[1], equals?: Parameters<NodeConsole['cmdArgs']>[2]): void;
    /**
     * Formats an arguments object into a command-line string of arguments.
     *
     * @category Terminal
     *
     * @param obj           Arguments to translate.
     * @param literalFalse  Optional. If true, false arguments are converted to
     *                      `--key=false`. Otherwise false args are `--no-key`.
     *                      Default false.
     * @param equals        Optional. Whether argument keys should include an
     *                      equals character (e.g., `--key=false`). Default true.
     */
    cmdArgs(obj: {
        [key: string]: boolean | number | string | null;
    }, literalFalse?: boolean, equals?: boolean): string;
    /**
     * Output longer messages with per-section formatting.
     *
     * @category Outputters
     *
     * @since 2.0.0-beta.3.draft
     */
    get bulk(): {
        /**
         * Alias for {@link NodeConsole.bulk.log} with `via: "debug"` argument.
         *
         * @see {@link MessageMaker.bulk}  Used to format the message.
         *
         * @param msgs  The messages to be output. Processed by {@link MessageMaker.bulk}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.debugs to NodeConsole.bulk.debug
         */
        debug: (msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>) => void;
        /**
         * Outputs the given message to the console.
         *
         * @see {@link MessageMaker.bulk}  Used to format the message.
         *
         * @param msgs  The messages to be output. Processed by {@link MessageMaker.bulk}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.logs to NodeConsole.bulk.log
         */
        log: (msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>) => void;
        /**
         * Alias for {@link NodeConsole.bulk.log} with `via: "warn"` argument.
         *
         * @see {@link MessageMaker.bulk}  Used to format the message.
         *
         * @param msgs  The messages to be output. Processed by {@link MessageMaker.bulk}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.warns to NodeConsole.bulk.warn
         */
        warn: (msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>) => void;
    };
    /**
     * Output messages (long or short) prepended with a timestamp.
     *
     * @category Outputters
     *
     * @since 2.0.0-beta.3.draft
     */
    get timestamp(): {
        /**
         * Alias for {@link NodeConsole.timestamp.log} with `via: "debug"` argument.
         *
         * @see {@link MessageMaker.timestamped}  Used to format the message.
         *
         * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft
         */
        debug: (msg: Parameters<MessageMaker['timestamped']>[0], args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs>) => void;
        /**
         * Outputs the given message to the console prefixed with a timestamp.
         *
         * @see {@link MessageMaker.timestamped}  Used to format the message.
         *
         * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.timestampLog to NodeConsole.timestamp.log
         */
        log: (msg: Parameters<MessageMaker['timestamped']>[0], args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs>) => void;
        /**
         * Alias for {@link NodeConsole.timestamp.log} with `via: "warn"` argument.
         *
         * @see {@link MessageMaker.timestamped}  Used to format the message.
         *
         * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
         * @param args  Optional. Configuration for the output and message, if any.
         *
         * @since 2.0.0-beta.3.draft
         */
        warn: (msg: Parameters<MessageMaker['timestamped']>[0], args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs>) => void;
    };
    /**
     * Output an inspection of the given variable to the console, with a timestamp if desired.
     *
     * @category Outputters
     *
     * @since 2.0.0-beta.3.draft
     */
    get vi(): {
        /**
         * Output an inspection of the given variable to the console as debug info.
         *
         * @see {@link NodeConsole.debug}  Used to print the inspection.
         *
         * @see {@link VariableInspector.stringify}  Used to inspect the variable.
         *
         * @param variable  The variable to be inspected.
         * @param args      Optional. Configuration for the variable inspection and message, if any.
         */
        debug: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
            msg?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>;
        }) => void;
        /**
         * Output an inspection of the given variable to the console.
         *
         * @see {@link NodeConsole.log}  Used to print the inspection.
         *
         * @see {@link VariableInspector.stringify}  Used to inspect the variable.
         *
         * @param variable  The variable to be inspected.
         * @param args      Optional. Configuration for the variable inspection and message, if any.
         *
         * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.varDump to NodeConsole.vi.log and updated params.
         */
        log: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
            msg?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>;
        }) => void;
        /**
         * Output an inspection of the given variable to the console as a warning.
         *
         * @see {@link NodeConsole.warn}  Used to print the inspection.
         *
         * @see {@link VariableInspector.stringify}  Used to inspect the variable.
         *
         * @param variable  The variable to be inspected.
         * @param args      Optional. Configuration for the variable inspection and message, if any.
         */
        warn: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
            msg?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>;
        }) => void;
        /**
         * For outputting var dumps prepended with a timestamp.
         */
        timestamp: {
            /**
             * Alias for {@link NodeConsole.bulk.log} with `via: "debug"` argument.
             *
             * @see {@link NodeConsole.debug}  Used to print the inspection.
             *
             * @see {@link VariableInspector.stringify}  Used to inspect the variable.
             *
             * @param variable  The variable to be inspected.
             * @param args      Optional. Configuration for the variable inspection and message, if any.
             *
             * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.debugs to NodeConsole.vi.debug and updated params.
             */
            debug: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
                msg?: RecursivePartial<NodeConsole.MsgArgs & Omit<MessageMaker.TimestampedArgs, 'time'>>;
                time?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs['time']>;
            }) => void;
            /**
             * Output an inspection of the given variable to the console.
             *
             * @see {@link NodeConsole.log}  Used to print the inspection.
             *
             * @see {@link VariableInspector.stringify}  Used to inspect the variable.
             *
             * @param variable  The variable to be inspected.
             * @param args      Optional. Configuration for the variable inspection and message, if any.
             *
             * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.logs to NodeConsole.vi.log and updated params.
             */
            log: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
                msg?: RecursivePartial<NodeConsole.MsgArgs & Omit<MessageMaker.TimestampedArgs, 'time'>>;
                time?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs['time']>;
            }) => void;
            /**
             * Alias for {@link NodeConsole.bulk.log} with `via: "warn"` argument.
             *
             * @see {@link NodeConsole.warn}  Used to print the inspection.
             *
             * @see {@link VariableInspector.stringify}  Used to inspect the variable.
             *
             * @param variable  The variable to be inspected.
             * @param args      Optional. Configuration for the variable inspection and message, if any.
             *
             * @since 2.0.0-beta.3.draft — Renamed from NodeConsole.warns to NodeConsole.vi.warn and updated params.
             */
            warn: (variable: ConstructorParameters<typeof VariableInspector>[0], args?: ConstructorParameters<typeof VariableInspector>[1] & {
                msg?: RecursivePartial<NodeConsole.MsgArgs & Omit<MessageMaker.TimestampedArgs, 'time'>>;
                time?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.TimestampedArgs['time']>;
            }) => void;
        };
    };
    /**
     * Outputs the given message to the console.
     *
     * @category Outputters
     *
     * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
     * @param args  Optional. Configuration for the output and message, if any.
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    log(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs the given message to the console.
     *
     * @category Outputters
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.bulk.log} instead.
     */
    logs(...args: Parameters<NodeConsole['bulk']['log']>): void;
    /**
     * Outputs the given message to the console prefixed with a timestamp.
     *
     * @category Outputters
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.timestamp.log} instead.
     */
    timestampLog(...args: Parameters<NodeConsole['timestamp']['log']>): void;
    /**
     * Outputs the given message to the console prefixed with a timestamp.
     *
     * @category Outputters
     *
     * @see {@link NodeConsole.timestamp.log}  Used to print the inspection.
     *
     * @see {@link VariableInspector}  Used to inspect the variable.
     * @see {@link VariableInspector.stringify}  Used to inspect the variable.
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.vi.timestamp.log} instead.
     */
    timestampVarDump(...args: Parameters<NodeConsole['vi']['timestamp']['log']>): void;
    /**
     * Outputs an inspection of the given variable to the console.
     *
     * @category Outputters
     *
     * @see {@link NodeConsole.log}  Used to print the inspection.
     *
     * @see {@link VariableInspector}  Used to inspect the variable.
     * @see {@link VariableInspector.stringify}  Used to inspect the variable.
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.vi.log} instead.
     */
    varDump(...args: Parameters<NodeConsole['vi']['log']>): void;
    /**
     * Outputs a heading string to the console.
     *
     * @category Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    heading(heading: string, level: number, _args?: RecursivePartial<Omit<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs, "linesIn" | "linesOut">>): void;
    /**
     * Outputs a separator string to the console.
     *
     * @category Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    separator(args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.log} with `via: "debug"` argument.
     *
     * @category Aliases
     *
     * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
     * @param args  Configuration for the output and message, if any.
     */
    debug(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.logs} with `via: "debug"` argument.
     *
     * @category Aliases
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.bulk.debug} instead.
     */
    debugs(...args: Parameters<NodeConsole['bulk']['debug']>): void;
    /**
     * Outputs a level-one heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category Outputters (Pre-formatted)
     */
    h1(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs a level-two heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category Outputters (Pre-formatted)
     */
    h2(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs a level-three heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category Outputters (Pre-formatted)
     */
    h3(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.separator}.
     *
     * @category Aliases
     */
    sep(...params: Parameters<NodeConsole['separator']>): void;
    /**
     * Alias for {@link NodeConsole.log} with `via: "warn"` argument.
     *
     * @category Aliases
     *
     * @param msg   The message to be output. Processed by {@link MessageMaker.msg}.
     * @param args  Configuration for the output and message, if any.
     */
    warn(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.logs} with `via: "warn"` argument.
     *
     * @category Aliases
     *
     * @deprecated 2.0.0-beta.3.draft — Use {@link NodeConsole.bulk.warn} instead.
     */
    warns(...args: Parameters<NodeConsole['bulk']['warn']>): void;
}
/**
 * Used only for {@link NodeConsole}.
 *
 * @since 0.1.1
 * @since 2.0.0-alpha — Removed CmdErrorHandler type.
 */
export declare namespace NodeConsole {
    /**
     * Optional configuration for {@link NodeConsole}.
     *
     * @since 0.1.1
     */
    type Args = {
        argsRecursive: true;
        /**
         * Optional overrides used when initializing {@link MessageMaker}.
         */
        msgMaker: RecursivePartial<MessageMaker.Args>;
        prompt: NodeConsole_Prompt.Args;
        /**
         * An override for the output of this
         */
        separator: null | [string | string[]] | [string | string[], undefined | Partial<MsgArgs>];
        /**
         * Default colour slugs for formatting prompts.
         */
        styleClrs: {
            [K in "disabled" | "error" | "help" | "highlight"]: MessageMaker.Colour;
        };
        /**
         * Optional overrides used when initializing {@link VariableInspector}.
         */
        varInspect: Partial<VariableInspector.Args>;
    };
    /**
     * Error thrown from the terminal in {@link NodeConsole.cmd}.
     *
     * @since 0.1.1
     */
    type CmdError = {
        status: number;
        signal: number | null;
        output?: string[];
        pid: number;
        stdout?: string;
        stderr?: string;
    };
    /**
     * Optional configuration for {@link NodeConsole.log}.
     *
     * @since 0.1.1
     */
    type MsgArgs = Partial<MessageMaker.MsgArgs> & {
        /**
         * Console method to use for outputting to the console.
         */
        via: "error" | "info" | "log" | "warn" | "debug";
    };
}
