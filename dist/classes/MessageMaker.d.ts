/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.draft
 * @license MIT
 */
import type { RecursivePartial } from '../types/objects/index.js';
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { timestamp } from '../functions/index.js';
/**
 * A configurable class for formatting message strings for various outputs.
 *
 * @since 0.1.1 — Experimental
 *
 * @experimental
 */
export declare class MessageMaker extends AbstractConfigurableClass<MessageMaker.Args> {
    /**
     * Returns the default painter callback function for the given format.
     *
     * `'html'` and `'markdown'` default painters currently do not apply any
     * colours.
     *
     * Used only by {@link MessageMaker.buildArgs}.
     *
     * @category Static
     *
     * @param classArgs  A complete arguments object.  Requires complete to
     *                   avoid building complete arguments multiple times.
     */
    protected static defaultPainter(classArgs: MessageMaker.Args): MessageMaker.Args['painter'];
    get ARGS_DEFAULT(): {
        readonly ansiColours: {
            readonly 4: {
                readonly fg: {
                    readonly black: "30";
                    readonly grey: "30";
                    readonly 'light-grey': "37";
                    readonly white: "37";
                    readonly red: "31";
                    readonly orange: "33";
                    readonly yellow: "33";
                    readonly green: "32";
                    readonly turquoise: "36";
                    readonly blue: "34";
                    readonly purple: "35";
                    readonly pink: "35";
                };
                readonly bg: {
                    readonly black: "40";
                    readonly grey: "40";
                    readonly 'light-grey': "47";
                    readonly white: "47";
                    readonly red: "41";
                    readonly orange: "43";
                    readonly yellow: "43";
                    readonly green: "42";
                    readonly turquoise: "46";
                    readonly blue: "44";
                    readonly purple: "45";
                    readonly pink: "45";
                };
            };
            readonly 8: {
                readonly black: "5;232";
                readonly grey: "5;241";
                readonly 'light-grey': "5;247";
                readonly white: "5;255";
                readonly red: "5;124";
                readonly orange: "5;166";
                readonly yellow: "5;208";
                readonly green: "5;28";
                readonly turquoise: "5;30";
                readonly blue: "5;20";
                readonly purple: "5;55";
                readonly pink: "5;162";
            };
            readonly 24: {
                readonly black: "2;26;26;26";
                readonly grey: "2;108;108;108";
                readonly 'light-grey': "2;208;208;208";
                readonly white: "2;248;248;248";
                readonly red: "2;168;36;36";
                readonly orange: "2;174;84;4";
                readonly yellow: "2;204;182;0";
                readonly green: "2;24;118;10";
                readonly turquoise: "2;0;128;98";
                readonly blue: "2;60;84;157";
                readonly purple: "2;129;75;155";
                readonly pink: "2;179;77;145";
            };
        };
        readonly argsRecursive: true;
        readonly msg: {
            readonly bold: false;
            readonly clr: null;
            readonly depth: 0;
            readonly flag: false;
            readonly fullWidth: false;
            readonly hangingIndent: "";
            readonly indent: "";
            readonly italic: false;
            readonly linesIn: 0;
            readonly linesOut: 1;
            readonly minWidth: 20;
            readonly maxWidth: null;
            readonly tab: "    ";
        };
        readonly painter: null;
        readonly paintFormat: null;
        readonly paintIfEmpty: false;
    };
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args?: RecursivePartial<MessageMaker.Args>): MessageMaker.Args;
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    msgArgs<InputArgs extends Partial<MessageMaker.MsgArgs>>(args?: InputArgs): MessageMaker.MsgArgs & InputArgs;
    constructor(args?: RecursivePartial<MessageMaker.Args>);
    /**
     * Joins string arrays with a single new line and adds an indent to the
     * beginning of every line, and adds next level of indent for child arrays.
     *
     * @category  Formatters
     *
     * @param lines   String to implode. Arrays are joined with `'\n'`.
     * @param indent  Optional. Default `this.args.msg.tab`.
     *
     * @return  The same text, but with an indent added after every new line.
     */
    implodeWithIndent(lines: (string | string[])[], indent?: string): string;
    /**
     * Used to map each line of a message in {@link MessageMaker.msg}.
     *
     * Does not wrap or split it (assumes this has already been done).  Applies
     * {@link MessageMaker.painter} and {@link MessageMaker.Args.depth} indent.
     *
     * @category  Messagers
     *
     * @param line    String to map. Already wrapped to line width, if applicable.
     * @param args    Message arguments that apply to this line. Also passed to {@link MessageMaker.painter}.
     * @param prefix  Optional. Unpainted string added before the line. Helpful for hanging indents. Default ''.
     */
    protected lineMapper(line: string, args: MessageMaker.MsgArgs, prefix?: string): string;
    /**
     * Formats the given message according to options.
     *
     * @category  Messagers
     *
     * @param msg    Message to display.  If it's an array, the strings are joined with `'\n'`.
     * @param _args  Optional.  Overrides for default arguments in {@link MessageMaker.args}.
     */
    msg(msg: string | string[], _args?: Partial<MessageMaker.MsgArgs>): string;
    /**
     * Formats given messages individually and then joins them on return.
     *
     * @category  Messagers
     *
     * @param messages       Messages to display, each with their own personal override arguments.  Joined with `universalArgs.joiner` (default `'\n\n'`) before return.
     * @param universalArgs  Optional.  Overrides for default arguments in {@link MessageMaker.args} for all messages.
     */
    msgs(messages: MessageMaker.BulkMsgs, universalArgs?: Partial<MessageMaker.BulkMsgArgs>): string;
    /**
     * Applies colour and font styles to an message for output.
     *
     * @category  Stylers
     */
    painter(msg: string, args?: Partial<MessageMaker.PainterArgs>): string;
    /**
     * Formats the given message according to options.
     *
     * @category  Messagers
     *
     * @param msg       Message to display. If it's an array, the strings are joined with `'\n'`.
     * @param msgArgs   Optional. Overrides for default arguments in {@link MessageMaker['msgArgs']}. Used for the whole message.
     * @param timeArgs  Optional. Overrides for default arguments in {@link MessageMaker['msgArgs']}. Used only for the timestamp.
     */
    timestampMsg(msg: string | string[] | MessageMaker.BulkMsgs, msgArgs?: RecursivePartial<MessageMaker.BulkMsgArgs>, timeArgs?: Partial<MessageMaker.MsgArgs> & Partial<{
        date: Date;
        stamp: timestamp.Args_Input;
    }>): string;
}
/**
 * Used only for {@link MessageMaker}.
 *
 * @since 0.1.1
 */
export declare namespace MessageMaker {
    /**
     * Ansi colour codes for the default node `{@link MessageMaker.Args}.painter`
     * function.
     *
     * @since 0.1.1
     */
    interface AnsiColours {
        /**
         * 4-bit colours to be used.
         *
         * e.g., `4.fg.white = '37'`
         */
        4: {
            /** Codes used for foreground colours. */
            fg: {
                [C in Colour | "light-grey" | "white"]: string;
            };
            /** Codes used for background colours. */
            bg: {
                [C in Colour | "light-grey" | "white"]: string;
            };
        };
        /**
         * 8-bit colours to be used for foreground or background.
         *
         * e.g., `8.white = '5;7'`
         */
        8: {
            [C in Colour | "light-grey" | "white"]: string;
        };
        /**
         * 24-bit colours to be used for foreground or background.
         *
         * e.g., `24.white = '2;245;245;245'`
         */
        24: {
            [C in Colour | "light-grey" | "white"]: string;
        };
    }
    /**
     * Optional configuration for {@link MessageMaker}.
     *
     * @since 0.1.1
     */
    interface Args extends AbstractConfigurableClass.Args {
        /**
         * Ansi colour codes for the default node `{@link MessageMaker.Args}.painter` function.
         *
         * @see {@link MessageMaker.ARGS_DEFAULT}  For default values.
         * @see {@link MessageMaker.buildArgs}  For default node `{@link MessageMaker.Args}.painter`.
         */
        ansiColours: AnsiColours;
        /**
         * Default arguments for {@link MessageMaker.msg}. Merged with the
         * default value recursively.
         *
         * @see {@link MessageMaker.buildArgs}  For default value.
         */
        msg: MsgArgs;
        argsRecursive: true;
        /**
         * Function used to apply formatting to the messages.
         *
         * @see {@link MessageMaker.buildArgs}  For default values.
         */
        painter: null | ((line: string, args?: Partial<PainterArgs>) => string);
        /**
         * Defines the default `{@link MessageMaker.Args}.painter` value.
         *
         * @default null
         */
        paintFormat: null | "html" | "markdown" | "node";
        /**
         * Whether even empty strings (or strings with only spaces) should be
         * painted with {@link MessageMaker.painter}.
         *
         * @default false
         */
        paintIfEmpty: boolean;
    }
    /**
     * Input value for multiple individually-formatted messages.  Used by
     * {@link MessageMaker.msg}.
     *
     * `{@link MessageMaker.MsgArgs}.linesIn` and
     * `{@link MessageMaker.MsgArgs}.linesOut` are omitted from args because in
     * bulk messages, they should just be a string in the `messages` param
     * array.
     *
     * @since 0.1.1
     */
    type BulkMsgs = ([string | string[], RecursivePartial<Omit<MessageMaker.MsgArgs, "linesIn" | "linesOut">> | undefined] | [string | string[]])[];
    /**
     * Colour slugs that can be used for formatting.
     *
     * @since 0.1.1
     */
    type Colour = "red" | "orange" | "yellow" | "green" | "turquoise" | "blue" | "purple" | "pink" | "grey" | "black";
    /**
     * Optional configuration for {@link MessageMaker.msg}.
     *
     * @since 0.1.1
     */
    interface MsgArgs extends PainterArgs {
        /**
         * If defined, an indent is added to every line.  This is best for
         * creating visual hierarchies.  Indents count towards the
         * `{@link MessageMaker.MsgArgs}.maxWidth`.
         *
         * Starts at zero (no indent).
         *
         * @default 0
         */
        depth: number;
        /**
         * Pads each line to be at least equal to
         * `{@link MessageMaker.MsgArgs}.maxWidth`.
         *
         * Useful for flags that you want to take up a certain width.
         *
         * @default false
         */
        fullWidth: boolean;
        /**
         * String to be used as a hanging indent. Not painted.
         *
         * @default ''
         */
        hangingIndent: string;
        /**
         * String to be used as an indent (every line). Not painted.
         *
         * @default ''
         */
        indent: string;
        /**
         * Number of blank lines after the message, if any.
         *
         * @default 0
         */
        linesIn: number;
        /**
         * Number of blank lines after the message, if any.
         *
         * @default 1
         */
        linesOut: number;
        /**
         * Max width of messages (in characters), if any.
         *
         * @default null
         */
        maxWidth: null | number;
        /**
         * Minimum width of messages (in characters).
         *
         * Minimum value is 10.
         *
         * @default 20
         */
        minWidth: number;
        /**
         * String used to represent a tab (e.g., with
         * `{@link MessageMaker.MsgArgs}.depth`).
         *
         * @default '    '
         */
        tab: string;
    }
    /**
     * Optional configuration for {@link MessageMaker.msgs}.
     *
     * @since 0.1.1
     */
    interface BulkMsgArgs extends MsgArgs {
        /**
         * Used to join bulk strings together.
         *
         * @default '\n\n'
         */
        joiner: string;
    }
    /**
     * Optional configuration for {@link MessageMaker.painter}.
     *
     * @since 0.1.1
     */
    interface PainterArgs {
        /**
         * If true, applies bold font styles.
         *
         * @default false
         */
        bold: boolean;
        /**
         * Applies the given colour to the text.
         *
         * Default painter function for `{@link MessageMaker.Args}.paintFormat`
         * options `"html"` and `"markdown"` do not currently support colours.
         * To use colour with those outputs formats, you must provide your own
         * `{@link MessageMaker.Args}.painter` argument.
         *
         * @default null
         */
        clr: null | Colour;
        /**
         * Colours the message in the inverse -- clr is the background. If ``,
         * the flag background should be solid black and the foreground is the
         * chosen colour.
         *
         * @default false
         */
        flag: boolean | "reverse";
        /**
         * If true, applies italic font styles.
         *
         * @default false
         */
        italic: boolean;
    }
}
//# sourceMappingURL=MessageMaker.d.ts.map