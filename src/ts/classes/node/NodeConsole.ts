/**
 * @since tmpl-0.1.1
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

import * as inquirer from '@inquirer/prompts';

import type { RecursivePartial } from '../../types/objects/index.js';

import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';

import {
    mergeArgs,
} from '../../functions/index.js';


/**
 * A configurable class for outputting to console within Node.
 * 
 * Includes formatting and interactive utilities.
 *
 * Not currently tested, marked beta.
 * 
 * @see {@link MessageMaker}  Used to format strings for output.  Initialized in the constructor.
 * 
 * @class
 * @beta
 */
export class NodeConsole extends AbstractConfigurableClass<NodeConsole.Args> {



    /* STATIC METHODS
     * ====================================================================== */

    /**
     * Prints sample output to the console via NodeConsole.log().
     *
     * @category Static
     * 
     * @returns  An example, constructed instance used for the sample.
     */
    public static async sample(
        args: RecursivePartial<NodeConsole.Args & { debug: boolean; }> = {},
    ): Promise<NodeConsole> {
        const nc = new NodeConsole( args );

        nc.h1( 'H1: Sample NodeConsole Output' );

        nc.log( 'This is a completely default, single-line message.' );

        nc.h2( 'H2: Multi-line Strings' );

        nc.log( [
            'This is a completely default array of messages (via log).',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
            'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
            '---',
            'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
        ] );

        if ( args.debug ) {

            nc.separator();

            nc.logs( [
                [ 'This is a completely default array of messages (via logs).' ],
                [ '' ],
                [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.' ],
                [ 'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.' ],
                [ '---' ],
                [ 'I AM BLUE.', { clr: 'blue', flag: true, } ],
                [ 'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.' ],
            ] );
        }

        nc.separator();

        nc.log(
            'This message has a hanging indent. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. \nSuspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            { hangingIndent: ' '.repeat( 8 ) }
        );

        if ( args.debug ) {

            nc.separator();

            nc.log( [
                'This array message has a hanging indent.',
                '',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
                'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
                '---',
                'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
            ], { hangingIndent: ' '.repeat( 8 ) } );
        }


        nc.h2( 'H2: Colours' );
        const colours: MessageMaker.Colour[] = [
            'black',
            'grey',
            'red',
            'orange',
            'yellow',
            'green',
            'turquoise',
            'blue',
            'purple',
            'pink',
        ];

        const clrMsgs: MessageMaker.BulkMsgs = [];
        for ( const clr of colours ) {

            clrMsgs.push( [
                `This is a ${ clr }, italic message.`,
                {
                    clr,
                    italic: true,
                }
            ] );
        }

        const clrFlagMsgs: MessageMaker.BulkMsgs = [];
        for ( const clr of colours ) {

            clrFlagMsgs.push( [
                `This is a ${ clr }, bold, italic, flag message.`,
                {
                    clr,

                    bold: true,
                    flag: true,
                    italic: true,
                },
            ] );
        }

        nc.logs( clrMsgs, { joiner: '\n' } );

        nc.h3( 'H3: Flags' );
        nc.logs( clrFlagMsgs, { joiner: '\n' } );


        nc.heading( 'H4: Random Test Heading', 4 );


        nc.h2( 'H2: Styles' );
        nc.log( 'This is a red, italic message.', { clr: 'red', italic: true, } );
        nc.log( 'This is a turquoise, bold message.', { clr: 'turquoise', bold: true, } );
        nc.log( 'This message is both bold *and* italic.', { bold: true, italic: true, } );


        nc.h2( 'H2: Depth' );
        for ( let i = 0; i <= 7; i++ ) {
            nc.log( [
                `This is a depth level ${ i } message.`,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ], { depth: i } );
        }


        nc.h2( 'H2: Timestamps' );
        nc.timestampLog( 'This is a red, italic timestamped message.', { clr: 'red', italic: true, } );
        nc.timestampLog( 'This is a turquoise, bold timestamped message.', { clr: 'turquoise', bold: true, } );
        nc.timestampLog( 'This timestamped message is both bold *and* italic.', { bold: true, italic: true, } );

        if ( args.debug ) {
            nc.timestampLog( [
                'This is an array timestamped message.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
                'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
                'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
            ], { clr: 'purple', } );
            nc.timestampLog( [
                [ 'This is a bulk timestamped message.' ],
                [ 'I AM BLUE.', { clr: 'blue', flag: true, } ],
                [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.' ],
                [ 'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.' ],
                [ 'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.' ],
            ], { clr: 'purple', } );
        }

        nc.h3( 'H3: Timestamped Depth' );
        for ( let i = 0; i <= 7; i++ ) {
            nc.timestampLog( [
                `This is a timestamped depth level ${ i } message.`,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ], { depth: i } );
        }


        if ( args.debug ) {
            nc.h2( 'H2: Variable Inspections' );
            const exampleVariable = VariableInspector.sampleComplexObject;
            nc.varDump( { exampleVariable } );
            nc.timestampVarDump( { exampleVariable } );
        }


        nc.h2( 'H2: Interactivity' );
        await NodeConsole.sampleInteractivity( nc, args );


        nc.h1( 'All done! (in purple)', { clr: 'purple' } );
        return nc;
    }

    /**
     * Samples the interactive methods.
     * 
     * @category Static
     */
    public static async sampleInteractivity(
        nc?: NodeConsole,
        args: RecursivePartial<NodeConsole.Args & { debug: boolean; }> = {},
    ) {
        if ( !nc ) {
            nc = new NodeConsole( args );
        }

        /**
         * For testing the prompt methods.
         */
        const tester = async <P extends NodeConsole.Prompt.Slug>(
            prompt: P,
            basicMsg: string,
            config: Omit<NodeConsole.Prompt.Config<P>, "message">,
            extras: ( Omit<NodeConsole.Prompt.Config<P>, "choices"> & { timestamp?: boolean; } )[] = [],
        ) => {

            nc.varDump( {
                result: await nc.prompt( prompt, {
                    ...config ?? {},
                    message: basicMsg,
                } as NodeConsole.Prompt.Config<P> )
            } );

            if ( args.debug ) {

                for ( const extra of extras ) {

                    const inspectorVar = {
                        result: await nc.prompt( prompt, {
                            ...config ?? {},
                            ...extra ?? {},
                        } as NodeConsole.Prompt.Config<P> )
                    };

                    const inspectorMsgArgs: Partial<NodeConsole.MsgArgs> = {
                        ...config.msgArgs ?? {},
                        ...extra.msgArgs ?? {},

                        bold: false,
                        italic: false,
                    };

                    if ( extra.timestamp ) {
                        nc.timestampVarDump( inspectorVar, inspectorMsgArgs );
                    } else {
                        nc.varDump( inspectorVar, inspectorMsgArgs );
                    }
                }
            }
        };

        nc.h3( 'H3: Bool' );
        await tester(
            'bool',
            'This bool method should let you say yes or no:',
            {},
            [
                {
                    message: 'This method should have a depth level 1 and be red:',
                    msgArgs: {
                        clr: 'red',
                        depth: 1,
                    },
                },
                {
                    message: 'This timestamped bool method should have a depth level 2 and be a yellow flag:',
                    msgArgs: {
                        clr: 'yellow',
                        depth: 2,
                        flag: true,
                        timestamp: true,
                    },
                },
            ],
        );


        nc.h3( 'H3: Input' );
        await tester(
            'input',
            'This input method should let you input a custom string:',
            {
                validate: ( value: string ) => value == 'I_AM_A_ERROR' ? 'Your string matched the test error string, pick something else' : true,
            },
            [
                {
                    message: 'This input method should have a depth level 1 and be orange:',
                    msgArgs: {
                        clr: 'orange',
                        depth: 1,
                    },
                },
                {
                    message: 'This timestamped input method should have a depth level 2 and be purple:',
                    msgArgs: {
                        clr: 'purple',
                        depth: 2,
                        timestamp: true,
                    },
                },
            ],
        );


        nc.h3( 'H3: Select' );
        await tester(
            'select',
            'This select method should let you choose from a multiple-choice list:',
            {
                choices: [
                    'Simple Option 1',
                    'Simple Option 2',
                    {
                        value: 'example hidden value',

                        description: 'Option description',
                        name: 'Detailed Option 1',
                    },
                    {
                        value: 'Detailed Option 2',

                        description: 'Option description',
                        disabled: true,
                    },
                    {
                        value: 'Detailed Option 3',

                        disabled: '(this option is disabled with a message)',
                    },
                    {
                        value: 4,

                        description: 'This option returns a number',
                        name: 'Detailed Option 4',
                    },
                ],
            },
            [
                {
                    message: 'This timestamped select method should have a depth level 3 and be turquoise:',
                    msgArgs: {
                        clr: 'turquoise',
                        depth: 3,
                        timestamp: true,
                    },
                },
                {
                    message: 'This select method should have a depth level 1:',
                    msgArgs: {
                        depth: 1,
                    },
                },
                {
                    message: 'This select method should have a depth level 2:',
                    msgArgs: {
                        depth: 2,
                    },
                },
                {
                    message: 'This select method should have a depth level 3:',
                    msgArgs: {
                        depth: 3,
                    },
                },
            ]
        );


        return nc;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * A local instance of {@link MessageMaker} initialized using 
     * {@link NodeConsole.Args.msgMaker}.
     * 
     * @category  Utilities
     */
    public readonly msg: MessageMaker;


    /* Args ===================================== */

    /**
     * @category Args
     */
    public get ARGS_DEFAULT() {

        const defaults = {

            msgMaker: {
                msg: {
                    maxWidth: 100,
                    tab: '        ',
                },
                paintFormat: 'node',
            },

            optsRecursive: true,

            separator: null,

            styleClrs: {
                disabled: 'grey',
                error: 'red',
                help: 'grey',
                highlight: 'purple',
            },

            varInspect: {},
        } as const;

        // this lets the types work a bit better by letting us export the
        // default as const but ensure that it is the same shape as the args
        const testType: NodeConsole.Args = defaults;
        testType;

        return defaults;
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: RecursivePartial<NodeConsole.Args> ): NodeConsole.Args {

        const mergedDefault: NodeConsole.Args = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as NodeConsole.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs<any, NodeConsole.Args, RecursivePartial<NodeConsole.Args>>(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );

        if ( args?.msgMaker ) {

            merged.msgMaker = MessageMaker.prototype.buildArgs( mergeArgs(
                mergedDefault.msgMaker,
                args.msgMaker,
                MessageMaker.prototype.ARGS_DEFAULT.optsRecursive
            ) );
        }

        return merged;
    }


    /* Aliases ===================================== */

    /**
     * Gets the `maxWidth` from {@link NodeConsole.args}, or default (`120`) if
     * none is set.
     * 
     * @category Args
     */
    public get maxWidth(): number {
        return this.args.msgMaker?.msg?.maxWidth ?? 120;
    }



    /* CONSTRUCTOR
     * ====================================================================== */

    public constructor ( args: RecursivePartial<NodeConsole.Args> = {} ) {
        super( args );

        this.msg = new MessageMaker( this.args.msgMaker );
    }



    /* METHODS
     * ====================================================================== */


    /* Outputters ===================================== */

    /**
     * Outputs the given message to the console.
     * 
     * @category  Outputters
     * 
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    public log(
        msg: string | string[],
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        console[ args.via ?? 'log' ]( this.msg.msg( msg, args ) );
    }

    /**
     * Outputs the given message to the console.
     * 
     * @category  Outputters
     * 
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    public logs(
        msgs: MessageMaker.BulkMsgs,
        args: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs> = {},
    ): void {
        if ( !Array.isArray( msgs ) ) {
            msgs = [ msgs ];
        }

        console[ args.via ?? 'log' ]( this.msg.msgs( msgs, args ) );
    }

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
    public timestampLog(
        msg: Parameters<MessageMaker[ 'timestampMsg' ]>[ 0 ],
        args: RecursivePartial<NodeConsole.MsgArgs> & Parameters<MessageMaker[ 'timestampMsg' ]>[ 1 ] = {},
        timeArgs: RecursivePartial<NodeConsole.MsgArgs> & Parameters<MessageMaker[ 'timestampMsg' ]>[ 2 ] = {},
    ): void {

        console[ args.via ?? 'log' ]( this.msg.timestampMsg(
            msg,
            args,
            timeArgs,
        ) );
    }

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
    public timestampVarDump(
        variable: ConstructorParameters<typeof VariableInspector>[ 0 ],
        args: Parameters<NodeConsole[ 'timestampLog' ]>[ 1 ] = {},
        timeArgs: Parameters<NodeConsole[ 'timestampLog' ]>[ 2 ] = {},
    ): void {

        this.timestampLog( VariableInspector.stringify(
            variable,
            this.mergeArgs( this.args.varInspect, args )
        ), args, timeArgs );
    }

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
    public varDump(
        variable: ConstructorParameters<typeof VariableInspector>[ 0 ],
        args: Parameters<NodeConsole[ 'log' ]>[ 1 ] = {},
    ): void {

        this.log( VariableInspector.stringify(
            variable,
            this.mergeArgs( this.args.varInspect, args )
        ), args );
    }


    /* Outputters (Pre-formatted) ===================================== */

    /**
     * Outputs a heading string to the console.
     * 
     * @category  Outputters (Pre-formatted)
     * 
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    public heading(
        heading: string,
        level: number,
        _args: RecursivePartial<Omit<
            NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs,
            "linesIn" | "linesOut"
        >> = {},
    ): void {

        const args: Partial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs> & {
            maxWidth: NonNullable<MessageMaker.BulkMsgArgs[ 'maxWidth' ]>;
        } = {
            bold: true,
            joiner: '\n',

            ..._args,

            linesIn: 2,
            linesOut: 1,
            maxWidth: _args.maxWidth ?? this.maxWidth,
        };

        let messages: MessageMaker.BulkMsgs = [
            [ heading ],
        ];

        switch ( level ) {

            case 1:
                args.clr = args.clr ?? null;
                args.linesIn = 3;

                messages = [
                    [ heading.toUpperCase(), { flag: true, fullWidth: true } ],
                    [ '='.repeat( this.maxWidth ) ],
                ];
                break;

            case 2:
                args.clr = args.clr ?? 'purple';
                args.maxWidth = this.maxWidth * 2 / 3;

                messages = [
                    [ heading, { flag: true, fullWidth: true } ],
                    [ '+ '.repeat( args.maxWidth / 2 ).trim() ],
                ];
                break;

            case 3:
                args.clr = args.clr ?? 'turquoise';
                args.maxWidth = this.maxWidth / 3;

                messages = [
                    [ heading, { flag: true, fullWidth: true } ],
                    [ '+ '.repeat( args.maxWidth / 2 ).trim() ],
                ];
                break;

            default:
                args.clr = args.clr ?? 'green';

                messages = [
                    [ heading, { flag: true } ],
                    [ '- '.repeat( Math.ceil( Math.min( heading.length, args.maxWidth / 2 ) / 2 + 1.5 ) ).trim() ],
                ];
                break;
        }

        console[ args.via ?? 'log' ]( this.msg.msgs( messages, args ) );
    }

    /**
     * Outputs a separator string to the console.
     * 
     * @category  Outputters (Pre-formatted)
     * 
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    public separator( args: RecursivePartial<NodeConsole.MsgArgs> = {} ): void {

        const quarterWidth = this.maxWidth / 4;

        const padding = ' '.repeat( quarterWidth );

        const defaultArgs: Partial<NodeConsole.MsgArgs> = {
            bold: true,
            clr: 'grey',
            ...( this.args.separator?.[ 1 ] ?? {} ),
        };

        console[ args.via ?? 'log' ]( this.msg.msg(
            this.args.separator?.[ 0 ] ?? [
                '',
                padding + '- '.repeat( quarterWidth ).trim() + padding,
                '',
            ],
            { ...defaultArgs, ...args },
        ) );
    }


    /* Prompters ===================================== */

    /**
     * Public alias for internal prompting methods.
     * 
     * @category  Interactivity
     * 
     * @param prompter  Which prompting method to use.
     * @param _config   Optional partial configuration for the prompting method.
     * 
     * @see {@link NodeConsole.promptBool}  Used if `prompter` param is `"bool"`.
     * @see {@link NodeConsole.promptInput}  Used if `prompter` param is `"input"`.
     */
    public async prompt<
        P extends NodeConsole.Prompt.Slug,
        SelectValues extends number | string,
    >(
        prompter: P,
        _config?: Omit<NodeConsole.Prompt.Config<P, SelectValues>, "theme">,
    ): Promise<NodeConsole.Prompt.Return<P, SelectValues>> {

        const config: NodeConsole.Prompt.Config<P, SelectValues> = this.mergeArgs(
            {
                msgArgs: {},
            },
            _config as NodeConsole.Prompt.Config<P, SelectValues>,
            false
        );

        const {
            depth = 0,

            indent = '',
            hangingIndent = '',

            linesIn = 0,
            linesOut = 0,

            timestamp = false,
        } = config.msgArgs ?? {};

        const msgArgs: NonNullable<NodeConsole.Prompt.Config[ 'msgArgs' ]> = {
            bold: true,

            ...config.msgArgs ?? {},

            linesIn: 0,
            linesOut: 0,

            depth: 0,
            hangingIndent: '',
            indent: '',
        };

        const styleClrs: Required<NonNullable<NonNullable<NodeConsole.Prompt.Config>[ 'styleClrs' ]>> = {
            ...this.args.styleClrs,

            ...config.styleClrs ?? {},

            highlight: config.styleClrs?.highlight
                ?? (
                    ( msgArgs.clr && msgArgs.clr != 'black' && msgArgs.clr != 'grey' )
                        ? msgArgs.clr
                        : this.args.styleClrs.highlight
                ),
        };

        const prefixIndent = this.msg.args.msg.tab.repeat( depth )
            + ' '.repeat( hangingIndent.length + indent.length );

        const prefixTimestamp = timestamp ? this.msg.timestampMsg( '', msgArgs ) : '';

        const prefixTimestampIndent = timestamp ? ' '.repeat( this.msg.timestampMsg( '' ).length ) : '';

        const selectCursorIndent = prompter == 'select' ? '  ' : '';

        config.theme = {

            helpMode: 'always',

            icon: {
                cursor: '→',
            },

            prefix: {

                done: prefixIndent + ( timestamp ? prefixTimestamp : this.msg.msg(
                    '✓',
                    {
                        clr: styleClrs.highlight,
                        ...msgArgs ?? {},
                        bold: true,
                    }
                ) ),

                idle: prefixIndent + ( timestamp ? prefixTimestamp : this.msg.msg(
                    '?',
                    {
                        ...msgArgs ?? {},
                        bold: true,
                    }
                ) ),
            },

            style: {

                answer: ( text: string ) => text,

                description: ( text: string ) => '\n' + selectCursorIndent + this.msg.msg( text, {
                    ...msgArgs ?? {},

                    bold: false,
                    clr: styleClrs.highlight,
                    italic: !msgArgs?.italic,
                } ),

                disabled: ( text: string ) => selectCursorIndent + this.msg.msg( text, {
                    ...msgArgs ?? {},

                    bold: false,
                    clr: styleClrs.disabled,
                } ),

                error: ( text: string ) => prefixIndent + prefixTimestampIndent + ' '.repeat( config.message.length + ( timestamp ? 1 : 3 ) ) + this.msg.msg( text, {
                    ...msgArgs ?? {},

                    bold: false,
                    clr: styleClrs.error,
                    italic: !msgArgs?.italic,
                } ),

                help: ( text: string ) => this.msg.msg( text, {
                    ...msgArgs ?? {},

                    bold: false,
                    clr: styleClrs.help,
                    italic: !msgArgs?.italic,
                } ),

                highlight: ( text: string ) => this.msg.msg( text, {
                    clr: styleClrs.highlight,

                    ...msgArgs ?? {},

                    bold: true,
                    italic: !msgArgs?.italic,
                } ),

                key: ( text: string ) => 'KEY: (' + text + ')',

                message: (
                    text: string,
                    status: 'idle' | 'done' | 'loading',
                ) => this.msg.msg( text, msgArgs ),
            },

            validationFailureMode: 'keep',
        };

        if ( linesIn ) {
            this.log( '\n'.repeat( linesIn ) );
        }

        let result: NodeConsole.Prompt.Return<P, SelectValues>;

        switch ( prompter ) {

            case 'bool':
                result = await this.promptBool(
                    config as NodeConsole.Prompt.Config<"bool">,
                ) as NodeConsole.Prompt.Return<P, SelectValues>;
                break;

            case 'input':
                result = await this.promptInput(
                    config as NodeConsole.Prompt.Config<"input">,
                ) as NodeConsole.Prompt.Return<P, SelectValues>;
                break;

            case 'select':
                result = await this.promptSelect(
                    config as NodeConsole.Prompt.Config<"select", SelectValues>,
                ) as NodeConsole.Prompt.Return<P, SelectValues>;
                break;
        }

        if ( linesOut ) {
            this.log( '\n'.repeat( linesOut ) );
        }

        return result;
    }

    /**
     * @category  Interactivity
     */
    protected async promptBool(
        config: NodeConsole.Prompt.Config<"bool">,
    ): Promise<NodeConsole.Prompt.Return<"bool">> {

        const defaultConfig: Omit<NodeConsole.Prompt.Config<"bool">, "message" | "msgArgs"> = {
            default: false,
        };

        return await inquirer.confirm( this.mergeArgs(
            defaultConfig,
            config,
            true
        ) );
    }

    /**
     * @category  Interactivity
     */
    protected async promptInput(
        config: NodeConsole.Prompt.Config<"input">,
    ): Promise<NodeConsole.Prompt.Return<"input">> {

        const defaultConfig: Omit<NodeConsole.Prompt.Config<"input">, "message" | "msgArgs"> = {
            required: true,
        };

        return await inquirer.input( this.mergeArgs(
            defaultConfig,
            config,
            true
        ) );
    }

    /**
     * @category  Interactivity
     */
    protected async promptSelect<SelectValues extends number | string>(
        config: NodeConsole.Prompt.Config<"select", SelectValues>,
    ): Promise<NodeConsole.Prompt.Return<"select", SelectValues>> {

        const defaultConfig: Omit<
            NodeConsole.Prompt.Config<"select", SelectValues>,
            "choices" | "message" | "msgArgs"
        > = {
            pageSize: 10,
        };

        return await inquirer.select( this.mergeArgs(
            defaultConfig,
            config,
            true
        ) as Parameters<typeof inquirer.select>[ 0 ] ) as SelectValues;
    }


    /* Aliases ===================================== */

    /**
     * Alias for {@link NodeConsole.log} with `via: "debug"` argument.
     * 
     * @category  Aliases
     */
    public debug(
        msg: string | string[],
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        this.log( msg, { ...args, via: 'debug' } );
    }

    /**
     * Alias for {@link NodeConsole.logs} with `via: "debug"` argument.
     * 
     * @category  Aliases
     */
    public debugs(
        msgs: MessageMaker.BulkMsgs,
        args: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs> = {},
    ): void {
        this.logs( msgs, { ...args, via: 'debug' } );
    }

    /**
     * Outputs a level-one heading string to the console.
     * 
     * Alias for {@link MessageMaker.heading}.
     * 
     * @category  Outputters (Pre-formatted)
     */
    public h1(
        heading: string,
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        this.heading( heading, 1, args );
    }

    /**
     * Outputs a level-two heading string to the console.
     * 
     * Alias for {@link MessageMaker.heading}.
     * 
     * @category  Outputters (Pre-formatted)
     */
    public h2(
        heading: string,
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        this.heading( heading, 2, args );
    }

    /**
     * Outputs a level-three heading string to the console.
     * 
     * Alias for {@link MessageMaker.heading}.
     * 
     * @category  Outputters (Pre-formatted)
     */
    public h3(
        heading: string,
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        this.heading( heading, 3, args );
    }

    /**
     * Alias for {@link NodeConsole.separator}.
     * 
     * @category  Aliases
     */
    public sep( ...params: Parameters<NodeConsole[ 'separator' ]> ): void {
        this.separator( ...params );
    }

    /**
     * Alias for {@link NodeConsole.log} with `via: "warn"` argument.
     * 
     * @category  Aliases
     */
    public warn(
        msg: string | string[],
        args: RecursivePartial<NodeConsole.MsgArgs> = {},
    ): void {
        this.log( msg, { ...args, via: 'warn' } );
    }

    /**
     * Alias for {@link NodeConsole.logs} with `via: "warn"` argument.
     * 
     * @category  Aliases
     */
    public warns(
        msgs: MessageMaker.BulkMsgs,
        args: RecursivePartial<NodeConsole.MsgArgs & MessageMaker.BulkMsgArgs> = {},
    ): void {
        this.logs( msgs, { ...args, via: 'warn' } );
    }
}

/**
 * Used only for {@link NodeConsole}.
 * 
 * @namespace
 * @beta
 */
export namespace NodeConsole {

    /**
     * Optional configuration for {@link NodeConsole}.
     */
    export interface Args extends AbstractConfigurableClass.Args {

        /**
         * Optional overrides used when initializing {@link MessageMaker}.
         */
        msgMaker: RecursivePartial<MessageMaker.Args>;

        /**
         * An override for the output of this
         */
        separator: null | [ string | string[] ] | [ string | string[], undefined | Partial<MsgArgs> ];

        /**
         * Default colour slugs for formatting prompts.
         */
        styleClrs: {
            [ K in "disabled" | "error" | "help" | "highlight" ]: MessageMaker.Colour;
        };

        /**
         * Optional overrides used when initializing {@link VariableInspector}.
         */
        varInspect: Partial<VariableInspector.Args>;
    }

    /**
     * Optional configuration for {@link NodeConsole.log}.
     */
    export interface MsgArgs extends Partial<MessageMaker.MsgArgs> {

        /**
         * Console method to use for outputting to the console.
         */
        via: "log" | "warn" | "debug";
    };

    /**
     * Types used for {@link NodeConsole.prompt} and related functions.
     */
    export namespace Prompt {

        /**
         * Param type for prompt method config, optionally restricted by prompt
         * slug.
         *
         * @see {@link Prompt.Slug}
         */
        export type Config<
            P extends Slug = Slug,
            SelectValues extends number | string = number | string,
        > = {

            /**
             * Optional configuration for output messages while prompting.
             */
            msgArgs?: Partial<MessageMaker.MsgArgs & {
                timestamp: boolean;
            }>;

            /**
             * Colours used to style output.
             */
            styleClrs?: Partial<Args[ 'styleClrs' ]>;

        } & (
                | ( P extends "bool" ? Config.Bool : never )
                | ( P extends "input" ? Config.Input : never )
                | ( P extends "select" ? Config.Select<SelectValues> : never )
            );

        /**
         * Individual config types for prompting methods.
         */
        export namespace Config {

            /**
             * Optional configuration for {@link NodeConsole.promptBool}.
             * 
             * @interface
             */
            export type Bool = Parameters<typeof inquirer.confirm>[ 0 ];

            /**
             * Optional configuration for {@link NodeConsole.promptInput}.
             * 
             * @interface
             */
            export type Input = Parameters<typeof inquirer.input>[ 0 ];

            /**
             * Optional configuration for {@link NodeConsole.promptSelect}.
             * 
             * @interface
             */
            export type Select<Values extends null | boolean | number | string | undefined> = Omit<Parameters<typeof inquirer.select>[ 0 ], "choices"> & {

                choices: ( string | {
                    value: Values;

                    name?: string;
                    description?: string;
                    short?: string;
                    disabled?: boolean | string;
                } )[];
            };
        }

        /**
         * Return type for prompt methods, optionally restricted by prompt slug.
         * 
         * @see {@link Prompt.Slug}
         */
        export type Return<
            P extends Slug = Slug,
            SelectValues extends number | string = number | string,
        > =
            | ( P extends "bool" ? boolean : never )
            | ( P extends "input" ? string : never )
            | ( P extends "select" ? SelectValues : never );

        /**
         * Method names for interactivity in the console.
         */
        export type Slug = "bool" | "input" | "select";
    };
}