/**
 * @since 0.1.1
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import {
    execSync as nodeExecSync,
} from 'child_process';

import type { RecursivePartial } from '../../types/objects/index.js';

import {
    escRegExpReplace,
    mergeArgs,
} from '../../functions/index.js';

import { AbstractConfigurableClass } from '../abstracts/index.js';

import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';

import {
    NodeConsole_Error,
    NodeConsole_Prompt,
} from './NodeConsole/index.js';


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
        const nc = new NodeConsole( mergeArgs( {

            msgMaker: {
                msg: { maxWidth: 80 },
            },

            prompt: {
                timeout: 60000,
            },
        } as RecursivePartial<NodeConsole.Args>, args, true ) );

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

        nc.logs( clrMsgs, { joiner: '\n' } );

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

        nc.h3( 'H3: Flags' );
        nc.logs( clrFlagMsgs, { joiner: '\n' } );

        const clrReverseFlagMsgs: MessageMaker.BulkMsgs = [];
        for ( const clr of colours ) {

            clrReverseFlagMsgs.push( [
                `This is a ${ clr }, bold, italic, reverse flag message.`,
                {
                    clr,

                    bold: true,
                    flag: 'reverse',
                    italic: true,
                },
            ] );
        }

        nc.heading( 'H4: Reversed Flags', 4 );
        nc.logs( clrReverseFlagMsgs, { joiner: '\n' } );


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
            nc = new NodeConsole( mergeArgs( {

                msgMaker: {
                    msg: { maxWidth: 80 },
                },

                prompt: {
                    timeout: 60000,
                },
            } as RecursivePartial<NodeConsole.Args>, args, true ) );
        }
        // nc.timestampVarDump( { 'nc.args': nc.args } );
        // nc.timestampLog( '{ 'nc.args': nc.args }' );

        const errorHandler = ( error: any ) => {

            if ( error instanceof NodeConsole_Error ) {
                nc.timestampLog( error.toString(), {
                    clr: 'red',
                    depth: 1,
                    maxWidth: null,
                } );
            } else {
                nc.timestampVarDump( { error }, {
                    clr: 'red',
                    depth: 1,
                    maxWidth: null,
                } );
            }

            return undefined;
        };

        /**
         * Runs the function and vardumps the result.
         * 
         * @param run        Function to run and whose return to dump.
         * @param msgArgs    Message args passed to the variable inspector.
         */
        const runAndDump = async <T>(
            run: ( args: Partial<NodeConsole_Prompt.Config> ) => Promise<T>,
            msgArgs: Partial<NodeConsole.MsgArgs> = {},
        ) => {
            try {
                const inspectorVar = { result: await run( { msgArgs } ).catch( errorHandler ) };

                const inspectorMsgArgs: Partial<NodeConsole.MsgArgs> = {
                    bold: false,
                    italic: false,

                    depth: 1,

                    ...msgArgs ?? {},
                };

                nc.timestampVarDump( inspectorVar, inspectorMsgArgs );
            } catch ( error ) {
                errorHandler( error );
            }
        };


        nc.h3( 'H3: Bool' );
        nc.timestampLog( '' );
        await runAndDump( async ( args ) => nc.prompt.bool( {
            ...args as NodeConsole_Prompt.BoolConfig,
            message: 'This bool method should let you say yes or no:',
        } ) );

        if ( args.debug ) {

            await runAndDump( async ( args ) => nc.prompt.bool( {
                ...args as NodeConsole_Prompt.BoolConfig,
                message: 'This method should have a depth level 1 and be red:',
            } ), {
                clr: 'red',
                depth: 1,
            } );

            await runAndDump( async ( args ) => nc.prompt.bool( {
                ...args as NodeConsole_Prompt.BoolConfig,
                message: 'This timestamped bool method should have a depth level 2 and be a yellow flag:',
            } ), {
                clr: 'yellow',
                depth: 2,
                flag: true,
            } );
        }


        nc.h3( 'H3: Input' );
        const stringValidator = ( value: string ) => value == 'I_AM_A_ERROR' ? 'Your string matched the test error string, pick something else' : true;
        await runAndDump( async ( args ) => nc.prompt.input( {
            ...args as NodeConsole_Prompt.InputConfig,
            message: 'This input method should let you input a custom string:',
            validate: stringValidator,
        } ) );

        if ( args.debug ) {

            await runAndDump( async ( args ) => nc.prompt.input( {
                ...args as NodeConsole_Prompt.InputConfig,
                message: 'This input method should have a depth level 1 and be orange:',
                validate: stringValidator,
            } ), {
                clr: 'orange',
                depth: 1,
            } );

            await runAndDump( async ( args ) => nc.prompt.input( {
                ...args as NodeConsole_Prompt.InputConfig,
                message: 'This timestamped input method should have a depth level 2 and be purple:',
                validate: stringValidator,
            } ), {
                clr: 'purple',
                depth: 2,
            } );
        }


        nc.h3( 'H3: Select' );
        await runAndDump( async ( args ) => nc.prompt.select( {
            ...args as NodeConsole_Prompt.SelectConfig<any>,
            message: 'This select method should let you choose from a multiple-choice list of simple strings:',
            choices: [
                'Option 1',
                'Option 2',
                'Option 3',
            ],
        } ) );

        if ( args.debug ) {

            const choices: NodeConsole_Prompt.SelectConfig<string | 4>[ 'choices' ] = [
                {
                    value: 'Simple Option 1',
                },
                {
                    value: 'Simple Option 2',
                },
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
            ];

            await runAndDump( async ( args ) => nc.prompt.select( {
                ...args as NodeConsole_Prompt.SelectConfig<any>,
                message: 'This select method should let you choose from a multiple-choice list with complex choices:',
                choices,
            } ) );

            await runAndDump( async ( args ) => nc.prompt.select( {
                ...args as NodeConsole_Prompt.SelectConfig<any>,
                message: 'This timestamped select method should have a depth level 3 and be turquoise:',
                choices,
            } ), {
                clr: 'turquoise',
                depth: 3,
            } );

            await runAndDump( async ( args ) => nc.prompt.select( {
                ...args as NodeConsole_Prompt.SelectConfig<any>,
                message: 'This select method should have a depth level 1:',
                choices,
            } ), {
                depth: 1,
            } );

            await runAndDump( async ( args ) => nc.prompt.select( {
                ...args as NodeConsole_Prompt.SelectConfig<any>,
                message: 'This select method should have a depth level 2:',
                choices,
            } ), {
                depth: 2,
            } );

            await runAndDump( async ( args ) => nc.prompt.select( {
                ...args as NodeConsole_Prompt.SelectConfig<any>,
                message: 'This select method should have a depth level 3:',
                choices,
            } ), {
                depth: 3,
            } );
        }

        return nc;
    }



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * A local instance of {@link MessageMaker} initialized using 
     * `{@link NodeConsole.Args}.msgMaker`.
     * 
     * @category  Utilities
     */
    public readonly msg: MessageMaker;

    /**
     * Public alias for internal prompting methods.
     * 
     * @category Interactive
     */
    public readonly prompt: NodeConsole_Prompt;


    /* Args ===================================== */

    /**
     * @category Args
     */
    public get ARGS_DEFAULT() {

        return {

            argsRecursive: true,

            msgMaker: {
                msg: {
                    maxWidth: 100,
                    tab: '        ',
                },
                paintFormat: 'node',
            },

            prompt: {
                throwError: 'auto',
                timeout: 300000,
            },

            separator: null,

            styleClrs: {
                disabled: 'grey',
                error: 'red',
                help: 'grey',
                highlight: 'purple',
            },

            varInspect: {},
        } as const satisfies NodeConsole.Args;
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public override buildArgs( args?: RecursivePartial<NodeConsole.Args> ): NodeConsole.Args {

        const mergedDefault = this.ARGS_DEFAULT as NodeConsole.Args;

        // using this.mergeArgs here can cause issues because 
        // this method is sometimes called from the prototype
        const merged = mergeArgs( mergedDefault, args, this.ARGS_DEFAULT.argsRecursive );

        if ( args?.msgMaker ) {

            merged.msgMaker = MessageMaker.prototype.buildArgs( mergeArgs(
                mergedDefault.msgMaker,
                args.msgMaker,
                MessageMaker.prototype.ARGS_DEFAULT.argsRecursive
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
        this.prompt = new NodeConsole_Prompt( this.msg, this.args );

        this.cmd = this.cmd.bind( this );
        this.cmdArgs = this.cmdArgs.bind( this );
        this.debug = this.debug.bind( this );
        this.debugs = this.debugs.bind( this );
        this.h1 = this.h1.bind( this );
        this.h2 = this.h2.bind( this );
        this.h3 = this.h3.bind( this );
        this.heading = this.heading.bind( this );
        this.log = this.log.bind( this );
        this.logs = this.logs.bind( this );
        this.sep = this.sep.bind( this );
        this.separator = this.separator.bind( this );
        this.timestampLog = this.timestampLog.bind( this );
        this.timestampVarDump = this.timestampVarDump.bind( this );
        this.varDump = this.varDump.bind( this );
        this.warn = this.warn.bind( this );
        this.warns = this.warns.bind( this );
    }



    /* METHODS
     * ====================================================================== */


    /* Terminal ===================================== */

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
    public cmd(
        cmd: string,
        args: Parameters<NodeConsole[ 'cmdArgs' ]>[ 0 ] = {},
        literalFalse?: Parameters<NodeConsole[ 'cmdArgs' ]>[ 1 ],
        equals?: Parameters<NodeConsole[ 'cmdArgs' ]>[ 2 ],
    ): void {

        nodeExecSync(
            `${ cmd } ${ this.cmdArgs( args, literalFalse, equals ) }`,
            {
                encoding: 'utf-8',
            },
        );
    }

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
    public cmdArgs(
        obj: { [ key: string ]: boolean | number | string | null; },
        literalFalse: boolean = false,
        equals: boolean = true,
    ): string {

        const arr: string[] = [];

        const sep: " " | "=" = equals ? '=' : ' ';

        for ( const key in obj ) {

            if (
                obj[ key ] === null
                || typeof obj[ key ] === 'undefined'
                || obj[ key ] === undefined
            ) {
                continue;
            }

            switch ( typeof obj[ key ] ) {

                case 'boolean':
                    if ( obj[ key ] ) {
                        arr.push( `--${ key }` );
                    } else if ( literalFalse ) {
                        arr.push( `--${ key }${ sep }false` );
                    } else {
                        arr.push( `--no-${ key }` );
                    }
                    continue;

                case 'number':
                    arr.push( `--${ key }${ sep }${ obj[ key ] }` );
                    continue;

                case 'string':
                    arr.push( `--${ key }${ sep }"${ obj[ key ].replace( /(?<!\\)"/g, escRegExpReplace( '\\"' ) ) }"` );
                    continue;
            }
        }

        return arr.join( ' ' );
    }


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
 * @since 0.1.1
 * @since 2.0.0-alpha — Removed CmdErrorHandler type.
 */
export namespace NodeConsole {

    /**
     * Optional configuration for {@link NodeConsole}.
     * 
     * @since 0.1.1
     */
    export type Args = AbstractConfigurableClass.Args & {

        argsRecursive: true;

        /**
         * Optional overrides used when initializing {@link MessageMaker}.
         */
        msgMaker: RecursivePartial<MessageMaker.Args>;

        prompt: NodeConsole_Prompt.Args,

        /**
         * An override for the output of this
         */
        separator: null
        | [ string | string[] ]
        | [ string | string[], undefined | Partial<MsgArgs> ];

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
    };

    /**
     * Error thrown from the terminal in {@link NodeConsole.cmd}.
     * 
     * @since 0.1.1
     */
    export type CmdError = {
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
    export type MsgArgs = Partial<MessageMaker.MsgArgs> & {

        /**
         * Console method to use for outputting to the console.
         */
        via: "log" | "warn" | "debug";
    };
}