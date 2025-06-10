/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta
 * @license MIT
 */
import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../abstracts/index.js';
import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';
import { NodeConsole_Prompt } from './NodeConsole/index.js';
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
export declare class NodeConsole extends AbstractConfigurableClass<NodeConsole.Args> {
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
     * @category  Utilities
     */
    readonly msg: MessageMaker;
    /**
     * Public alias for internal prompting methods.
     *
     * @category Interactive
     */
    readonly prompt: NodeConsole_Prompt;
    /**
     * @category Args
     */
    get ARGS_DEFAULT(): {
        readonly argsRecursive: true;
        readonly msgMaker: {
            readonly msg: {
                readonly maxWidth: 100;
                readonly tab: "        ";
            };
            readonly paintFormat: "node";
        };
        readonly prompt: {
            readonly throwError: "auto";
            readonly timeout: 300000;
        };
        readonly separator: null;
        readonly styleClrs: {
            readonly disabled: "grey";
            readonly error: "red";
            readonly help: "grey";
            readonly highlight: "purple";
        };
        readonly varInspect: {};
    };
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
     * Outputs the given message to the console.
     *
     * @category  Outputters
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    log(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs the given message to the console.
     *
     * @category  Outputters
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    logs(msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>): void;
    /**
     * Outputs the given message to the console prefixed with a timestamp.
     *
     * @category  Outputters
     *
     * @see {@link MessageMaker.timestampMsg}  Used to format the message.
     *
     * @param msg       Message to display. If it's an array, the strings are joined with `'\n'`.
     * @param args      Optional. Overrides for default message arguments. Used for the whole message.
     * @param timeArgs  Optional. Overrides for default message arguments. Used only for the timestamp.
     */
    timestampLog(msg: Parameters<MessageMaker['timestampMsg']>[0], args?: RecursivePartial<NodeConsole.MsgArgs> & Parameters<MessageMaker['timestampMsg']>[1], timeArgs?: RecursivePartial<NodeConsole.MsgArgs> & Parameters<MessageMaker['timestampMsg']>[2]): void;
    /**
     * Outputs the given message to the console prefixed with a timestamp.
     *
     * @category  Outputters
     *
     * @see {@link NodeConsole.timestampLog}  Used to print the inspection.
     *
     * @see {@link VariableInspector}  Used to inspect the variable.
     * @see {@link VariableInspector.stringify}  Used to inspect the variable.
     */
    timestampVarDump(variable: ConstructorParameters<typeof VariableInspector>[0], args?: Parameters<NodeConsole['timestampLog']>[1], timeArgs?: Parameters<NodeConsole['timestampLog']>[2]): void;
    /**
     * Outputs an inspection of the given variable to the console.
     *
     * @category  Outputters
     *
     * @see {@link NodeConsole.log}  Used to print the inspection.
     *
     * @see {@link VariableInspector}  Used to inspect the variable.
     * @see {@link VariableInspector.stringify}  Used to inspect the variable.
     */
    varDump(variable: ConstructorParameters<typeof VariableInspector>[0], args?: Parameters<NodeConsole['log']>[1]): void;
    /**
     * Outputs a heading string to the console.
     *
     * @category  Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    heading(heading: string, level: number, _args?: RecursivePartial<Omit<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs, "linesIn" | "linesOut">>): void;
    /**
     * Outputs a separator string to the console.
     *
     * @category  Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    separator(args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.log} with `via: "debug"` argument.
     *
     * @category  Aliases
     */
    debug(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.logs} with `via: "debug"` argument.
     *
     * @category  Aliases
     */
    debugs(msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>): void;
    /**
     * Outputs a level-one heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h1(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs a level-two heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h2(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Outputs a level-three heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h3(heading: string, args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.separator}.
     *
     * @category  Aliases
     */
    sep(...params: Parameters<NodeConsole['separator']>): void;
    /**
     * Alias for {@link NodeConsole.log} with `via: "warn"` argument.
     *
     * @category  Aliases
     */
    warn(msg: string | string[], args?: RecursivePartial<NodeConsole.MsgArgs>): void;
    /**
     * Alias for {@link NodeConsole.logs} with `via: "warn"` argument.
     *
     * @category  Aliases
     */
    warns(msgs: MessageMaker.BulkMsgs, args?: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs>): void;
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
    type Args = AbstractConfigurableClass.Args & {
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
        via: "log" | "warn" | "debug";
    };
}
//# sourceMappingURL=NodeConsole.d.ts.map