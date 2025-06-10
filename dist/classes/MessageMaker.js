/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-alpha.1
 * @license MIT
 */
import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';
import { mergeArgs, softWrapText, timestamp, typeOf, } from '../functions/index.js';
/**
 * A configurable class for formatting message strings for various outputs.
 *
 * @since 0.1.1 — Experimental
 *
 * @experimental
 */
export class MessageMaker extends AbstractConfigurableClass {
    /* STATIC
     * ====================================================================== */
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
    static defaultPainter(classArgs) {
        // returns on match
        switch (classArgs.paintFormat) {
            case 'html':
                return (line, args = {}) => {
                    // returns
                    if (!args.bold && !args.clr && !args.flag && !args.italic) {
                        return line;
                    }
                    if (args.italic) {
                        line = '<em>' + line + '</em>';
                    }
                    if (args.bold) {
                        line = '<strong>' + line + '</strong>';
                    }
                    return line;
                };
            case 'markdown':
                return (line, args = {}) => {
                    // returns
                    if (!args.bold && !args.clr && !args.flag && !args.italic) {
                        return line;
                    }
                    if (args.italic) {
                        line = '_' + line + '_';
                    }
                    if (args.bold) {
                        line = '**' + line + '**';
                    }
                    return line;
                };
            case 'node':
                return (line, args = {}) => {
                    // returns
                    // if no styling is to be applied, then we can return early
                    if (!args.bold && !args.clr && !args.flag && !args.italic) {
                        return line;
                    }
                    /** The complete ansi escape string, joined by `;`. */
                    const ansi = [];
                    // paint colour
                    if (args.clr || args.flag) {
                        /** Colour depth available in this console. */
                        const clrDepth = typeof process.stdout.getColorDepth === 'function'
                            ? process.stdout.getColorDepth()
                            : 1;
                        // start by assuming it's the foreground
                        /** Background colour slug for this text. */
                        let bg = null;
                        /** Foreground colour slug for this text. */
                        let fg = args.clr ?? 'black';
                        if (args.flag) {
                            if (args.flag == 'reverse' && clrDepth > 4) {
                                switch (fg) {
                                    case 'grey':
                                        bg = 'light-grey';
                                        fg = 'black';
                                        break;
                                    default:
                                        bg = 'light-grey';
                                        break;
                                }
                                if (clrDepth === 8) {
                                    switch (fg) {
                                        case 'orange':
                                        case 'pink':
                                            bg = 'grey';
                                            break;
                                    }
                                }
                            }
                            else {
                                bg = args.clr ?? 'black';
                                fg = clrDepth > 4 ? 'white' : null;
                            }
                        }
                        switch (clrDepth) {
                            case 4:
                                // setting the foreground to black (without a
                                // background) can make text invisible in dark
                                // modes
                                if (bg || fg !== 'black') {
                                    ansi.push([
                                        fg ? classArgs.ansiColours[4].fg[fg] : '',
                                        bg ? classArgs.ansiColours[4].bg[bg] : '',
                                    ].filter(s => s).join(';'));
                                }
                                break;
                            case 8:
                            case 24:
                                if (bg && args.flag !== 'reverse') {
                                    if (clrDepth == 8) {
                                        switch (bg) {
                                            case 'light-grey':
                                            case 'orange':
                                            case 'yellow':
                                                fg = 'black';
                                                break;
                                            default:
                                                fg = 'white';
                                                break;
                                        }
                                    }
                                    else {
                                        switch (bg) {
                                            case 'grey':
                                            case 'yellow':
                                                fg = 'black';
                                                break;
                                            default:
                                                fg = 'white';
                                                break;
                                        }
                                    }
                                }
                                // setting the foreground to black (without a
                                // background) can make text invisible in dark
                                // modes
                                if (bg || fg !== 'black') {
                                    if (fg) {
                                        ansi.push(`38;${classArgs.ansiColours[clrDepth][fg]}`);
                                    }
                                    if (bg) {
                                        ansi.push(`48;${classArgs.ansiColours[clrDepth][bg]}`);
                                    }
                                }
                                break;
                        }
                    }
                    // paint style
                    if (args.bold) {
                        ansi.push('1');
                    }
                    if (args.italic) {
                        ansi.push('3');
                    }
                    return '\x1b[' + ansi.join(';') + 'm' + line + '\x1b[0m';
                };
        }
        return null;
    }
    /* LOCAL PROPERTIES
     * ====================================================================== */
    get ARGS_DEFAULT() {
        return {
            ansiColours: {
                4: {
                    fg: {
                        black: '30',
                        grey: '30',
                        'light-grey': '37',
                        white: '37',
                        red: '31',
                        orange: '33',
                        yellow: '33',
                        green: '32',
                        turquoise: '36',
                        blue: '34',
                        purple: '35',
                        pink: '35',
                    },
                    bg: {
                        black: '40',
                        grey: '40',
                        'light-grey': '47',
                        white: '47',
                        red: '41',
                        orange: '43',
                        yellow: '43',
                        green: '42',
                        turquoise: '46',
                        blue: '44',
                        purple: '45',
                        pink: '45',
                    },
                },
                8: {
                    black: '5;232',
                    grey: '5;241',
                    'light-grey': '5;247',
                    white: '5;255',
                    red: '5;124',
                    orange: '5;166',
                    yellow: '5;208',
                    green: '5;28',
                    turquoise: '5;30',
                    blue: '5;20',
                    purple: '5;55',
                    pink: '5;162',
                },
                24: {
                    black: '2;26;26;26',
                    grey: '2;108;108;108',
                    'light-grey': '2;208;208;208',
                    white: '2;248;248;248',
                    red: '2;168;36;36',
                    orange: '2;174;84;4',
                    yellow: '2;204;182;0',
                    green: '2;24;118;10',
                    turquoise: '2;0;128;98',
                    blue: '2;60;84;157',
                    purple: '2;129;75;155',
                    pink: '2;179;77;145',
                },
            },
            argsRecursive: true,
            msg: {
                bold: false,
                clr: null,
                depth: 0,
                flag: false,
                fullWidth: false,
                hangingIndent: '',
                indent: '',
                italic: false,
                linesIn: 0,
                linesOut: 1,
                minWidth: 20,
                maxWidth: null,
                tab: '    ',
            },
            painter: null,
            paintFormat: null,
            paintIfEmpty: false,
        };
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = this.ARGS_DEFAULT;
        // using this.mergeArgs here can cause issues because 
        // this method is sometimes called from the prototype
        const built = mergeArgs(mergedDefault, args, this.ARGS_DEFAULT.argsRecursive);
        if (args?.msg && typeof args.msg !== 'function') {
            // be should merge these defaults better
            if (typeof mergedDefault.msg !== 'function') {
                built.msg = mergeArgs(mergedDefault.msg, args.msg, true);
            }
            if (args.msg.minWidth) {
                // we know this type will match the args type, even if we change
                // the type assigned to args
                built.msg.minWidth = Math.max(10, args.msg.minWidth);
            }
        }
        // We should add a default painter
        if (!built.painter && built.paintFormat) {
            built.painter = MessageMaker.defaultPainter(built);
        }
        return built;
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    msgArgs(args) {
        const merged = mergeArgs(this.args.msg, args, false);
        if (merged.maxWidth !== null) {
            const indentWidth = merged.maxWidth - ((args?.tab?.length ?? 0) * (args?.depth ?? 0));
            merged.maxWidth = Math.max(10, merged.minWidth, indentWidth);
            if (merged.flag) {
                merged.maxWidth = merged.maxWidth - 2;
            }
        }
        return merged;
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}) {
        super(args);
    }
    /* METHODS
     * ====================================================================== */
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
    implodeWithIndent(lines, indent = this.args.msg.tab) {
        return lines.map((line) => {
            switch (typeOf(line)) {
                case 'array':
                    return this.implodeWithIndent(line, indent + this.args.msg.tab);
                case 'string':
                    return indent + line;
                default:
                    return indent + String(line);
            }
        }).flat().join('\n');
    }
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
    lineMapper(line, args, prefix = '') {
        if (args.maxWidth && args.fullWidth) {
            if (line.length < args.maxWidth) {
                line = line + ' '.repeat(args.maxWidth - line.length);
            }
        }
        if (args.flag
            && this.args.paintFormat === 'node'
            && line.match(/^[\s\n]*$/gi) === null) {
            line = ' ' + line + ' ';
        }
        return args.tab.repeat(args.depth) + args.indent + prefix + this.painter(line, args);
    }
    /**
     * Formats the given message according to options.
     *
     * @category  Messagers
     *
     * @param msg    Message to display.  If it's an array, the strings are joined with `'\n'`.
     * @param _args  Optional.  Overrides for default arguments in {@link MessageMaker.args}.
     */
    msg(msg, _args = {}) {
        // VariableInspector.dump( { 'MessageMaker.msg() _args': _args } );
        const args = this.msgArgs(_args);
        // if it's an array, we want to join them and then split them again
        if (Array.isArray(msg)) {
            msg = msg.join('\n');
        }
        if (args.maxWidth) {
            msg = softWrapText(msg, args.maxWidth);
        }
        const lines = msg.split(/\n/g);
        return ('\n'.repeat(args.linesIn ?? 0)
            + lines.map((line, index) => {
                return this.lineMapper(line, args, index > 0 ? args.hangingIndent : '');
            }).join('\n')
            + '\n'.repeat(args.linesOut ?? 0));
    }
    /**
     * Formats given messages individually and then joins them on return.
     *
     * @category  Messagers
     *
     * @param messages       Messages to display, each with their own personal override arguments.  Joined with `universalArgs.joiner` (default `'\n\n'`) before return.
     * @param universalArgs  Optional.  Overrides for default arguments in {@link MessageMaker.args} for all messages.
     */
    msgs(messages, universalArgs = {}) {
        // VariableInspector.dump( { 'MessageMaker.msgs() _auniversalArgsrgs': universalArgs } );
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        // We will add the lines a better way.
        const defaultUniversalArgs = {
            ...universalArgs,
            linesIn: 0,
            linesOut: 0,
        };
        const ret = [];
        messages.forEach(([_msg, _args], index) => {
            _args = this.mergeArgs(defaultUniversalArgs, _args ?? {}, true);
            if (index > 0
                && universalArgs.hangingIndent
                && defaultUniversalArgs.joiner?.match(/\n/g)) {
                _args = {
                    ..._args,
                    hangingIndent: '',
                    indent: universalArgs.hangingIndent ?? this.ARGS_DEFAULT.msg.hangingIndent,
                };
            }
            ret.push(this.msg(_msg, _args));
        });
        return ('\n'.repeat(universalArgs.linesIn ?? 0)
            + ret.join(universalArgs.joiner ?? '\n\n')
            + '\n'.repeat(universalArgs.linesOut ?? 0));
    }
    /**
     * Applies colour and font styles to an message for output.
     *
     * @category  Stylers
     */
    painter(msg, args = {}) {
        // returns if empty
        if (!this.args.paintIfEmpty) {
            // returns
            if (!msg.replace(/[\n\s\r]+/gs, '').length) {
                return msg;
            }
        }
        if (this.args.painter) {
            msg = this.args.painter(msg, args);
        }
        return msg;
    }
    /**
     * Formats the given message according to options.
     *
     * @category  Messagers
     *
     * @param msg       Message to display. If it's an array, the strings are joined with `'\n'`.
     * @param msgArgs   Optional. Overrides for default arguments in {@link MessageMaker['msgArgs']}. Used for the whole message.
     * @param timeArgs  Optional. Overrides for default arguments in {@link MessageMaker['msgArgs']}. Used only for the timestamp.
     */
    timestampMsg(msg, msgArgs = {}, timeArgs = {}) {
        /** A complete version of the base message arguments. */
        const args_full = this.msgArgs({
            joiner: '\n\n',
            ...msgArgs,
        });
        // we want to accept a variety of inputs, but we need to normalize it to
        // be MessageMaker.BulkMsgs
        if (typeof msg === 'string') {
            msg = msg ? [[msg]] : [];
            args_full.joiner = args_full.joiner ?? '\n';
        }
        else {
            // = is an array
            msg = msg.map((m) => {
                if (typeof m === 'string') {
                    args_full.joiner = args_full.joiner ?? '\n';
                    m = [m];
                }
                const m_arr = m;
                return m_arr;
            });
        }
        // the actual values to be used for the whole message, but ignore when
        // formatting the message parts
        const { depth, linesIn, linesOut, } = args_full;
        /** This is the unpainted string used for the timestamp. */
        const timePrefix = `[${timestamp(timeArgs.date ?? null, {
            date: false,
            time: true,
            ...timeArgs.stamp,
        })}]`;
        /** Base arguments to use for each individual message part. */
        const args_parts = {
            ...args_full,
            depth: 0,
            linesIn: 0,
            linesOut: 0,
            hangingIndent: (args_full.hangingIndent
                + ' '.repeat(timePrefix.length + 1)
                + args_full.tab.repeat(depth)),
        };
        /** Properly formatted as bulk messages. */
        const messages = msg;
        /** Compiled strings for each message part. */
        const compiledMessages = {
            message: (messages.length ? ((args_parts.flag ? this.msg(' ', args_parts) : ' ')
                + this.msgs(messages, args_parts)) : ''),
            timestamp: this.msg(timePrefix, this.mergeArgs(args_parts, {
                flag: false,
                italic: false,
                ...timeArgs,
                depth,
                linesIn: 0,
                linesOut: 0,
            }, false)),
        };
        return ('\n'.repeat(linesIn ?? 0)
            + compiledMessages.timestamp
            + compiledMessages.message
            + '\n'.repeat(linesOut ?? 0));
    }
}
/**
 * Used only for {@link MessageMaker}.
 *
 * @since 0.1.1
 */
(function (MessageMaker) {
    ;
    ;
    ;
    ;
    ;
})(MessageMaker || (MessageMaker = {}));
//# sourceMappingURL=MessageMaker.js.map