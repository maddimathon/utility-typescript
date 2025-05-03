/**
 * @since 0.1.1
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

import type { RecursivePartial } from '../types/objects/index.js';

import { AbstractConfigurableClass } from './abstracts/AbstractConfigurableClass.js';

import {
    mergeArgs,
    softWrapText,
    timestamp,
} from '../functions/index.js';


/**
 * A configurable class for formatting message strings for various outputs.
 *
 * Not currently tested, marked beta.
 * 
 * @beta
 */
export class MessageMaker extends AbstractConfigurableClass<MessageMaker.Args> {



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
    protected static defaultPainter( classArgs: MessageMaker.Args ): MessageMaker.Args[ 'painter' ] {

        // returns on match
        switch ( classArgs.paintFormat ) {

            case 'html':
                return (
                    line: string,
                    args: Partial<MessageMaker.PainterArgs> = {},
                ) => {
                    // returns
                    if ( !args.bold && !args.clr && !args.flag && !args.italic ) {
                        return line;
                    }

                    if ( args.italic ) {
                        line = '<em>' + line + '</em>';
                    }

                    if ( args.bold ) {
                        line = '<strong>' + line + '</strong>';
                    }

                    return line;
                };

            case 'markdown':
                return (
                    line: string,
                    args: Partial<MessageMaker.PainterArgs> = {},
                ) => {
                    // returns
                    if ( !args.bold && !args.clr && !args.flag && !args.italic ) {
                        return line;
                    }

                    if ( args.italic ) {
                        line = '_' + line + '_';
                    }

                    if ( args.bold ) {
                        line = '**' + line + '**';
                    }

                    return line;
                };

            case 'node':
                return (
                    line: string,
                    args: Partial<MessageMaker.PainterArgs> = {},
                ) => {
                    // returns
                    // if no styling is to be applied, then we can return early
                    if ( !args.bold && !args.clr && !args.flag && !args.italic ) {
                        return line;
                    }

                    /** The complete ansi escape string, joined by `;`. */
                    const ansi: string[] = [];

                    // paint colour
                    if ( args.clr || args.flag ) {

                        /** Colour depth available in this console. */
                        const clrDepth = process.stdout.getColorDepth() as 1 | 4 | 8 | 24;

                        // start by assuming it's the foreground

                        /** Background colour slug for this text. */
                        let bg: null | MessageMaker.Colour | "light-grey" | "white" = null;

                        /** Foreground colour slug for this text. */
                        let fg: null | MessageMaker.Colour | "light-grey" | "white" = args.clr ?? 'black';

                        if ( args.flag ) {

                            if ( args.flag == 'reverse' && clrDepth > 4 ) {

                                switch ( fg ) {

                                    case 'grey':
                                        bg = 'light-grey';
                                        fg = 'black';
                                        break;

                                    default:
                                        bg = 'light-grey';
                                        break;
                                }

                                if ( clrDepth === 8 ) {

                                    switch ( fg ) {

                                        case 'orange':
                                        case 'pink':
                                            bg = 'grey';
                                            break;
                                    }
                                }
                            } else {
                                bg = args.clr ?? 'black';
                                fg = clrDepth > 4 ? 'white' : null;
                            }
                        }

                        switch ( clrDepth ) {

                            case 4:
                                // setting the foreground to black (without a
                                // background) can make text invisible in dark
                                // modes
                                if ( bg || fg !== 'black' ) {

                                    ansi.push( [
                                        fg ? classArgs.ansiColours[ 4 ].fg[ fg ] : '',
                                        bg ? classArgs.ansiColours[ 4 ].bg[ bg ] : '',
                                    ].filter( s => s ).join( ';' ) );
                                }
                                break;

                            case 8:
                            case 24:
                                if ( bg && args.flag !== 'reverse' ) {

                                    if ( clrDepth == 8 ) {

                                        switch ( bg ) {

                                            case 'light-grey':
                                            case 'orange':
                                            case 'yellow':
                                                fg = 'black';
                                                break;

                                            default:
                                                fg = 'white';
                                                break;
                                        }
                                    } else {

                                        switch ( bg ) {

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
                                if ( bg || fg !== 'black' ) {

                                    if ( fg ) {
                                        ansi.push( `38;${ classArgs.ansiColours[ clrDepth ][ fg ] }` );
                                    }

                                    if ( bg ) {
                                        ansi.push( `48;${ classArgs.ansiColours[ clrDepth ][ bg ] }` );
                                    }
                                }
                                break;
                        }
                    }

                    // paint style
                    if ( args.bold ) {
                        ansi.push( '1' );
                    }
                    if ( args.italic ) {
                        ansi.push( '3' );
                    }

                    return '\x1b[' + ansi.join( ';' ) + 'm' + line + '\x1b[0m';
                };
        }

        return null;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    public get ARGS_DEFAULT(): MessageMaker.Args & {
        ansiColours: MessageMaker.Args[ 'ansiColours' ];
        msg: MessageMaker.MsgArgs;
    } {

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

            optsRecursive: true,

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
    public buildArgs( args?: RecursivePartial<MessageMaker.Args> ): MessageMaker.Args {

        const mergedDefault = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as MessageMaker.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const built = mergeArgs(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );

        if ( args?.msg && typeof args.msg !== 'function' ) {

            // be should merge these defaults better
            if ( typeof mergedDefault.msg !== 'function' ) {
                built.msg = mergeArgs( mergedDefault.msg, args.msg, true );
            }

            if ( args.msg.minWidth ) {
                // we know this type will match the args type, even if we change
                // the type assigned to args
                ( built.msg as typeof args.msg ).minWidth = Math.max( 10, args.msg.minWidth );
            }
        }

        // We should add a default painter
        if ( !built.painter && built.paintFormat ) {
            built.painter = MessageMaker.defaultPainter( built );
        }

        return built;
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public msgArgs( args?: RecursivePartial<MessageMaker.MsgArgs> ): MessageMaker.MsgArgs {

        const built: MessageMaker.MsgArgs = mergeArgs( this.args.msg, args, true );

        if ( built.maxWidth !== null ) {

            const indentWidth = built.maxWidth - (
                ( args?.tab?.length ?? 0 ) * ( args?.depth ?? 0 )
            );

            built.maxWidth = Math.max(
                10,
                built.minWidth,
                indentWidth,
            );

            if ( built.flag ) {
                built.maxWidth = built.maxWidth - 2;
            }
        }

        return built;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor ( args: RecursivePartial<MessageMaker.Args> = {} ) {
        super( args );
    }



    /* METHODS
     * ====================================================================== */

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
    protected lineMapper(
        line: string,
        args: MessageMaker.MsgArgs,
        prefix: string = '',
    ): string {

        if ( args.maxWidth && args.fullWidth ) {

            if ( line.length < args.maxWidth ) {
                line = line + ' '.repeat( args.maxWidth - line.length );
            }
        }

        if ( args.flag && this.args.paintFormat === 'node' ) {
            line = ' ' + line + ' ';
        }

        return args.tab.repeat( args.depth ) + args.indent + prefix + this.painter( line, args );
    }

    /**
     * Formats the given message according to options.
     * 
     * @category  Messagers
     * 
     * @param msg    Message to display.  If it's an array, the strings are joined with `'\n'`.
     * @param _args  Optional.  Overrides for default arguments in {@link MessageMaker.args}.
     */
    public msg(
        msg: string | string[],
        _args: RecursivePartial<MessageMaker.MsgArgs> = {},
    ): string {
        // VariableInspector.dump( { 'MessageMaker.msg() _args': _args } );
        const args: MessageMaker.MsgArgs = this.msgArgs( _args );

        // if it's an array, we want to join them and then split them again
        if ( Array.isArray( msg ) ) {
            msg = msg.join( '\n' );
        }

        if ( args.maxWidth ) {
            msg = softWrapText( msg, args.maxWidth );
        }

        const lines: string[] = msg.split( /\n/g );

        return (
            '\n'.repeat( args.linesIn ?? 0 )

            + lines.map(
                ( line, index ) => {

                    return this.lineMapper(
                        line,
                        args,
                        index > 0 ? args.hangingIndent : ''
                    );
                }
            ).join( '\n' )

            + '\n'.repeat( args.linesOut ?? 0 )
        );
    }

    /**
     * Formats given messages individually and then joins them on return.
     * 
     * @category  Messagers
     * 
     * @param messages       Messages to display, each with their own personal override arguments.  Joined with `universalArgs.joiner` (default `'\n\n'`) before return.
     * @param universalArgs  Optional.  Overrides for default arguments in {@link MessageMaker.args} for all messages.
     */
    public msgs(
        messages: MessageMaker.BulkMsgs,
        universalArgs: Partial<MessageMaker.BulkMsgArgs> = {},
    ): string {
        // VariableInspector.dump( { 'MessageMaker.msgs() _auniversalArgsrgs': universalArgs } );
        if ( !Array.isArray( messages ) ) {
            messages = [ messages ];
        }

        // We will add the lines a better way.
        const defaultUniversalArgs = {
            ...universalArgs,

            linesIn: 0,
            linesOut: 0,
        };

        const ret: string[] = [];

        messages.forEach( ( [ msg, args ], index ) => {

            args = this.mergeArgs( defaultUniversalArgs, args, true );

            if ( index > 0 && universalArgs.hangingIndent && defaultUniversalArgs.joiner?.match( /\n/g ) ) {

                const indent = universalArgs.hangingIndent ?? this.ARGS_DEFAULT.msg.hangingIndent;

                args = {
                    ...args,

                    hangingIndent: '',
                    indent,
                };
            }

            ret.push( this.msg( msg, args ) );
        } );

        return (
            '\n'.repeat( universalArgs.linesIn ?? 0 )
            + ret.join( universalArgs.joiner ?? '\n\n' )
            + '\n'.repeat( universalArgs.linesOut ?? 0 )
        );
    }

    /**
     * Applies colour and font styles to an message for output.
     * 
     * @category  Stylers
     */
    public painter(
        msg: string,
        args: Partial<MessageMaker.PainterArgs> = {}
    ): string {
        // returns if empty
        if ( !this.args.paintIfEmpty ) {

            // returns
            if ( !msg.replace( /[\n\s\r]+/gs, '' ).length ) {
                return msg;
            }
        }

        if ( this.args.painter ) {
            msg = this.args.painter( msg, args );
        }

        return msg;
    }

    /**
     * Formats the given message according to options.
     * 
     * @category  Messagers
     * 
     * @param msg       Message to display. If it's an array, the strings are joined with `'\n'`.
     * @param _args     Optional. Overrides for default arguments in {@link MessageMaker.args}. Used for the whole message.
     * @param timeArgs  Optional. Overrides for default arguments in {@link MessageMaker.args}. Used only for the timestamp.
     */
    public timestampMsg(
        msg: string | string[] | MessageMaker.BulkMsgs,

        _args: RecursivePartial<MessageMaker.BulkMsgArgs> = {},

        timeArgs: RecursivePartial<MessageMaker.MsgArgs> & Partial<{
            date: Date;
            stamp: timestamp.Args_Input;
        }> = {},
    ): string {
        // VariableInspector.dump( { 'MessageMaker.timestampMsg() _args': _args } );
        // VariableInspector.dump( { 'MessageMaker.timestampMsg() timeArgs': timeArgs } );

        let args = this.msgArgs( {
            joiner: '\n\n',
            ..._args,
        } ) as MessageMaker.BulkMsgArgs;

        if ( typeof msg === 'string' ) {
            msg = msg ? [ [ msg ] ] : [];
            args.joiner = args.joiner ?? '\n';
        } else {

            msg = msg.map( ( m ) => {
                // returns
                if ( typeof m === 'string' ) {
                    args.joiner = args.joiner ?? '\n';
                    return [ m ];
                }

                return m;
            } ) as MessageMaker.BulkMsgs;
        }

        const messages: MessageMaker.BulkMsgs = msg;

        const time = timestamp(
            timeArgs.date ?? null,
            {
                date: false,
                time: true,

                ...timeArgs.stamp,
            }
        );

        const depth = args.depth;

        const linesIn = args.linesIn;
        const linesOut = args.linesOut;

        const timePrefix = `[${ time }]`;

        args = {
            ...args,

            depth: 0,
            linesIn: 0,
            linesOut: 0,

            hangingIndent: args.hangingIndent + ' '.repeat( timePrefix.length + 1 ) + args.tab.repeat( depth ),
        };

        return (
            '\n'.repeat( linesIn ?? 0 )
            + this.msg(
                timePrefix,
                this.mergeArgs( args, {
                    flag: false,
                    italic: false,

                    ...timeArgs,

                    depth,
                    linesIn: 0,
                    linesOut: 0,
                }, true )
            )
            + ( messages.length ? (
                ( args.flag ? this.msg( ' ', args ) : ' ' )
                + this.msgs( messages, args )
            ) : '' )
            + '\n'.repeat( linesOut ?? 0 )
        );
    }
}

/**
 * Used only for {@link MessageMaker}.
 */
export namespace MessageMaker {

    /**
     * Ansi colour codes for the default node {@link MessageMaker.Args.painter} function.
     * 
     * @interface
     */
    export type AnsiColours = {

        /** 
         * 4-bit colours to be used.
         * 
         * e.g., `4.fg.white = '37'`
         */
        4: {
            /** Codes used for foreground colours. */
            fg: { [ C in Colour | "light-grey" | "white" ]: string; };

            /** Codes used for background colours. */
            bg: { [ C in Colour | "light-grey" | "white" ]: string; };
        };

        /** 
         * 8-bit colours to be used for foreground or background.
         * 
         * e.g., `8.white = '5;7'`
         */
        8: { [ C in Colour | "light-grey" | "white" ]: string; };

        /** 
         * 24-bit colours to be used for foreground or background.
         * 
         * e.g., `24.white = '2;245;245;245'`
         */
        24: { [ C in Colour | "light-grey" | "white" ]: string; };
    };

    /**
     * Optional configuration for {@link MessageMaker}.
     * 
     * @interface
     */
    export type Args = AbstractConfigurableClass.Args & {

        /**
         * Ansi colour codes for the default node {@link MessageMaker.Args.painter} function.
         * 
         * @see {@link MessageMaker.ARGS_DEFAULT}  For default values.
         * @see {@link MessageMaker.buildArgs}  For default node {@link MessageMaker.Args.painter}.
         */
        ansiColours: AnsiColours;

        /**
         * Default arguments for {@link MessageMaker.msg}. Merged with the
         * default value recursively.
         * 
         * @see {@link MessageMaker.buildArgs}  For default value.
         */
        msg: MsgArgs;

        optsRecursive: true,

        /**
         * Function used to apply formatting to the messages.
         * 
         * @see {@link MessageMaker.buildArgs}  For default values.
         */
        painter: null | ( ( line: string, args?: Partial<PainterArgs> ) => string );

        /**
         * Defines the default {@link MessageMaker.Args.painter} value.
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
    };

    /**
     * Input value for multiple individually-formatted messages.  Used by
     * {@link MessageMaker.msg}.
     *
     * {@link MessageMaker.MsgArgs.linesIn} and
     * {@link MessageMaker.MsgArgs.linesOut} are omitted from args because in
     * bulk messages, they should just be a string in the `messages` param array.
     * 
     * @expandType RecursivePartial
     */
    export type BulkMsgs = (
        | [ string | string[], RecursivePartial<Omit<MessageMaker.MsgArgs, "linesIn" | "linesOut">> | undefined ]
        | [ string | string[] ]
    )[];

    /**
     * Colour slugs that can be used for formatting.
     * 
     * @see {@link MessageMaker.painter}
     * @see {@link MessageMaker.PainterArgs}
     */
    export type Colour =
        | "red"
        | "orange"
        | "yellow"
        | "green"
        | "turquoise"
        | "blue"
        | "purple"
        | "pink"
        | "grey"
        | "black";

    /**
     * Optional configuration for {@link MessageMaker.msg}.
     * 
     * @interface
     */
    export type MsgArgs = PainterArgs & {

        /**
         * If defined, an indent is added to every line.  This is best for
         * creating visual hierarchies.  Indents count towards the
         * {@link MessageMaker.MsgArgs.maxWidth}.
         * 
         * Starts at zero (no indent).
         * 
         * @default 0
         */
        depth: number;

        /**
         * Pads each line to be at least equal to
         * {@link MessageMaker.MsgArgs.maxWidth}.
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
         * {@link MessageMaker.MsgArgs.depth}).
         * 
         * @default '    '
         */
        tab: string;
    };

    /**
     * Optional configuration for {@link MessageMaker.msgs}.
     * 
     * @interface
     */
    export type BulkMsgArgs = MsgArgs & {

        /**
         * Used to join bulk strings together.
         * 
         * @default '\n\n'
         */
        joiner: string;
    };

    /**
     * Optional configuration for {@link MessageMaker.painter}.
     * 
     * @interface
     */
    export type PainterArgs = {

        /**
         * If true, applies bold font styles.
         * 
         * @default false
         */
        bold: boolean;

        /**
         * Applies the given colour to the text.
         *
         * Default painter function for {@link MessageMaker.Args.paintFormat}
         * options `"html"` and `"markdown"` do not currently support colours.
         * To use colour with those outputs formats, you must provide your own
         * {@link MessageMaker.Args.painter} argument.
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
    };
}