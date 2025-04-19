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

import type { RecursivePartial } from '../../types/objects/index.js';

import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';

import {
    mergeArgs,
} from '../../functions/index.js';


/**
 * Used only for {@link NodeConsole}.
 */
export namespace NodeConsole {

    /**
     * Optional configuration for {@link NodeConsole}.
     * 
     * @interface
     */
    export type Args = AbstractConfigurableClass.Args & {

        /**
         * Optional overrides used when initializing {@link MessageMaker}.
         */
        msgMaker: RecursivePartial<MessageMaker.Args>;

        /**
         * An override for the output of this
         */
        separator: null | [ string | string[] ] | [ string | string[], undefined | Partial<MsgArgs> ];

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
    export type MsgArgs = Partial<MessageMaker.MsgArgs> & {

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
    public static sample(
        args: Partial<NodeConsole.Args & { debug: boolean; }> = {},
    ): NodeConsole {
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

        nc.separator();

        nc.log(
            'This message has a hanging indent. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. \nSuspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            { hangingIndent: ' '.repeat( 8 ) }
        );

        nc.separator();

        nc.log( [
            'This array message has a hanging indent.',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
            'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
            '---',
            'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
        ], { hangingIndent: ' '.repeat( 8 ) } );

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

        nc.h3( 'H3: Timestamped Depth' );
        for ( let i = 0; i <= 7; i++ ) {
            nc.timestampLog( [
                `This is a timestamped depth level ${ i } message.`,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ], { depth: i } );
        }


        nc.h2( 'H2: Variable Inspections' );
        const exampleVariable = VariableInspector.sampleComplexObject;
        nc.varDump( { exampleVariable } );
        nc.timestampVarDump( { exampleVariable } );


        nc.h1( 'All done! (in purple)', { clr: 'purple' } );
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
    public get ARGS_DEFAULT(): NodeConsole.Args {

        return {

            msgMaker: {
                msg: {
                    maxWidth: 120,
                    tab: '        ',
                },
                paintFormat: 'node',
            },

            optsRecursive: false,

            separator: null,

            varInspect: {},
        };
    }

    /**
     * Build a complete args object.
     * 
     * @category Args
     */
    public buildArgs( args?: Partial<NodeConsole.Args> ): NodeConsole.Args {

        const mergedDefault = AbstractConfigurableClass.abstractArgs(
            this.ARGS_DEFAULT
        ) as NodeConsole.Args;

        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        return mergeArgs(
            mergedDefault,
            args,
            this.ARGS_DEFAULT.optsRecursive
        );
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

    public constructor ( args: Partial<NodeConsole.Args> = {} ) {
        super( args );

        if ( !this.args.msgMaker ) {
            this.args.msgMaker = {};
        }

        // if ( !this.args.msgMaker.ansiColours ) {

        //     const ansiColours: MessageMaker.Args[ 'ansiColours' ] = {
        //         black: '2;51;51;51',
        //         grey: '2;91;87;88',
        //         white: '2;245;245;245',

        //         red: '2;165;44;50',
        //         orange: '2;147;63;34',
        //         yellow: '2;122;80;0',
        //         green: '2;24;103;31',
        //         turquoise: '2;4;98;76',
        //         blue: '2;45;91;134',
        //         purple: '2;121;60;150',
        //         pink: '2;143;56;114',
        //     };

        //     this.args.msgMaker.ansiColours = ansiColours;
        // }

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