/**
 * @since tmpl-0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.9.0-draft
 */
/*!
 * @maddimathon/utility-typescript@0.9.0-draft
 * @license MIT
 */
import type { RecursivePartial } from '../../types/objects/index.js';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';
/**
 * Used only for {@link NodeConsole}.
 */
export declare namespace NodeConsole {
    /**
     * Optional configuration for {@link NodeConsole}.
     *
     * @interface
     */
    type Args = AbstractConfigurableClass.Args & {
        /**
         * Optional overrides used when initializing {@link MessageMaker}.
         */
        msgMaker: RecursivePartial<MessageMaker.Args>;
        /**
         * An override for the output of this
         */
        separator: null | [string | string[]] | [string | string[], undefined | Partial<MsgArgs>];
        /**
         * Optional overrides used when initializing {@link VariableInspector}.
         */
        varInspect: Partial<VariableInspector.Args>;
    };
    /**
     * Optional configuration for {@link NodeConsole.log}.
     *
     * @interface
     */
    type MsgArgs = Partial<MessageMaker.MsgArgs> & {
        /**
         * Console method to use for outputting to the console.
         */
        via: "log" | "warn" | "debug";
    };
}
/**
 * A configurable class for outputting to console within Node.
 *
 * Includes formatting and interactive utilities.
 *
 * Not currently tested, marked beta.
 *
 * @see {@link MessageMaker}  Used to format strings for output.  Initialized in the constructor.
 *
 * @beta
 */
export declare class NodeConsole extends AbstractConfigurableClass<NodeConsole.Args> {
    /**
     * Prints sample output to the console via NodeConsole.log().
     *
     * @category Static
     *
     * @returns  An example, constructed instance used for the sample.
     */
    static sample(args?: Partial<NodeConsole.Args & {
        debug: boolean;
    }>): NodeConsole;
    /**
     * A local instance of {@link MessageMaker} initialized using
     * {@link NodeConsole.Args.msgMaker}.
     *
     * @category  Utilities
     */
    readonly msg: MessageMaker;
    /**
     * @category Args
     */
    get ARGS_DEFAULT(): NodeConsole.Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: Partial<NodeConsole.Args>): NodeConsole.Args;
    /**
     * Gets the `maxWidth` from {@link NodeConsole.args}, or default (`120`) if
     * none is set.
     *
     * @category Args
     */
    get maxWidth(): number;
    constructor(args?: Partial<NodeConsole.Args>);
    protected msgArgs<A extends MessageMaker.MsgArgs>(args: RecursivePartial<A>): RecursivePartial<A>;
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
//# sourceMappingURL=NodeConsole.d.ts.map