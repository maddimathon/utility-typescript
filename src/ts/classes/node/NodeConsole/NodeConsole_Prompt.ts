/**
 * @since ___PKG_VERSION___
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

import type { RecursivePartial } from '../../../types/objects/index.js';
import type { NodeConsole } from '../NodeConsole.js';

import {
    mergeArgs,
    // timeout,
} from '../../../functions/index.js';

import { MessageMaker } from '../../MessageMaker.js';
import { NodeConsole_Error } from './NodeConsole_Error.js';


/**
 * Only used by {@link NodeConsole}.
 * 
 * @since ___PKG_VERSION___
 * 
 * @experimental
 * @internal
 */
export class NodeConsole_Prompt {



    /* LOCAL PROPERTIES
     * ====================================================================== */

    /**
     * A completed args object.
     * 
     * @category Args
     */
    protected readonly args: NodeConsole.Args;

    /**
     * A local instance of {@link MessageMaker} initialized using 
     * `{@link NodeConsole.Args}.msgMaker`.
     * 
     * @category  Utilities
     */
    protected readonly msg: MessageMaker;



    /* CONSTRUCTOR
     * ====================================================================== */

    /**
     * @param args  Optional configuration.
     */
    public constructor ( msg: MessageMaker, args: NodeConsole.Args ) {
        this.args = args;
        this.msg = msg;
    }



    /* LOCAL METHODS
     * ====================================================================== */

    /**
     * Runs a prompter function with some output before and after, if
     * applicable.  Also handles and throws errors as applicable.
     */
    protected async prompt<
        Prompter extends NodeConsole_Prompt.Slug,
        Return extends NodeConsole_Prompt.SelectValue,
        Config extends (
            | ( Prompter extends "bool" ? NodeConsole_Prompt.BoolConfig : never )
            | ( Prompter extends "input" ? NodeConsole_Prompt.InputConfig : never )
            | ( Prompter extends "select" ? NodeConsole_Prompt.SelectConfig<Return> : never )
        ),
    >(
        prompter: Prompter,
        run: ( config: Config, context?: {
            input?: NodeJS.ReadableStream;
            output?: NodeJS.WritableStream;
            clearPromptOnDone?: boolean;
            signal?: AbortSignal;
        } ) => Promise<Return>,
        _config: Omit<Config, "theme">,
    ): Promise<Return | undefined> {

        const config = mergeArgs(
            {
                msgArgs: {},
                theme: {},
            },
            _config,
            false
        ) as Config;

        const {
            depth = 0,

            indent = '',
            hangingIndent = '',

            linesIn = 0,
            linesOut = 0,

            timestamp = false,
        } = config.msgArgs ?? {};

        const msgArgs: NonNullable<NodeConsole_Prompt.Config[ 'msgArgs' ]> = {
            bold: true,

            ...config.msgArgs ?? {},

            linesIn: 0,
            linesOut: 0,

            depth: 0,
            hangingIndent: '',
            indent: '',
        };

        const styleClrs: Required<NonNullable<NonNullable<NodeConsole_Prompt.Config>[ 'styleClrs' ]>> = {
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
                    status,
                ) => this.msg.msg( text, msgArgs ),
            },

            validationFailureMode: 'keep',
        };

        const timeout = config.timeout ?? this.args.prompt.timeout;


        linesIn && console.log( '\n'.repeat( linesIn ) );

        const result: Return | undefined = await run(
            config as Config,
            {
                signal: timeout
                    ? AbortSignal.timeout( timeout )
                    : undefined,
            },
        ).catch( ( error ) => {

            const timeoutParams: ConstructorParameters<typeof NodeConsole_Error> = [
                `Prompt input timed out after ${ timeout }ms.`,
                {}
            ];

            // returns
            switch ( error.name ) {

                case 'AbortPromptError':
                    switch ( this.args.prompt.throwError ) {

                        case 'always':
                            console.log( '' );
                            throw new NodeConsole_Error( ...timeoutParams );
                            break;

                        case 'auto':
                            if (
                                typeof config.default === 'undefined'
                                || ( config as NodeConsole_Prompt.InputConfig ).required
                            ) {
                                console.log( '' );
                                throw new NodeConsole_Error( ...timeoutParams );
                            }
                            break;

                        case 'never':
                            break;
                    }

                    return config.default as Return | undefined;

                case 'ExitPromptError':
                    console.log( '' );
                    process.exit( 0 );
                    return config.default as Return | undefined;
            }

            throw error;
        } );

        linesOut && console.log( '\n'.repeat( linesOut ) );

        return result;
    }

    /**
     * @category  Interactivity
     */
    public async bool(
        config: NodeConsole_Prompt.Config<"bool">,
    ): Promise<boolean | undefined> {

        const defaultConfig: Omit<
            NodeConsole_Prompt.Config<"bool">,
            "default" | "message" | "msgArgs"
        > = {
        };

        return this.prompt(
            'bool',
            inquirer.confirm,
            mergeArgs( defaultConfig, config, true )
        );
    }

    /**
     * @category  Interactivity
     */
    public async input(
        config: NodeConsole_Prompt.InputConfig,
    ): Promise<string | undefined> {

        const defaultConfig: Omit<
            NodeConsole_Prompt.InputConfig,
            "default" | "message" | "msgArgs"
        > = {
            required: true,
        };

        return this.prompt(
            'input',
            inquirer.input,
            mergeArgs( defaultConfig, config, true )
        );
    }


    public async select<
        Return extends string,
        Config extends Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: string[];
        } = Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: string[];
        },
    >(
        config: Omit<Config, "theme">,
    ): Promise<string | undefined>;

    public async select<
        Return extends NodeConsole_Prompt.SelectValue,
        Config extends Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: {
                value: Return;

                name?: string;
                description?: string;
                short?: string;
                disabled?: boolean | string;
            }[];
        } = Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: {
                value: Return;

                name?: string;
                description?: string;
                short?: string;
                disabled?: boolean | string;
            }[];
        },
    >(
        config: Omit<Config, "theme">,
    ): Promise<Return | undefined>;

    /**
     * @category  Interactivity
     */
    public async select<
        Return extends NodeConsole_Prompt.SelectValue,
        Config extends Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: {
                value: Return;

                name?: string;
                description?: string;
                short?: string;
                disabled?: boolean | string;
            }[];
        } = Omit<NodeConsole_Prompt.SelectConfig<Return>, "choices"> & {
            choices: {
                value: Return;

                name?: string;
                description?: string;
                short?: string;
                disabled?: boolean | string;
            }[];
        },
    >(
        config: Omit<Config, "theme">,
    ): Promise<Return | undefined> {

        const defaultConfig: Omit<
            NodeConsole_Prompt.SelectConfig<Return>,
            "default" | "message"
        > = {
            choices: [],
            msgArgs: {},
            pageSize: 10,
        };

        return this.prompt(
            'select',
            inquirer.select,
            mergeArgs( defaultConfig, config, true )
        );
    }
}

/**
 * Used only for {@link NodeConsole_Prompt}.
 * 
 * @experimental
 */
export namespace NodeConsole_Prompt {

    /**
     * Optional configuration for {@link NodeConsole_Prompt}.
     */
    export type Args = {

        /**
         * Maximum time to wait before a prompt times out, in milliseconds.
         *
         * If falsy, the prompt never times out (use this cautiously -- it's
         * probably always better to just use a very long timeout).
         *
         * @default 300000
         */
        timeout: number;

        /**
         * Whether to throw an error on timeout.
         * 
         * Options:
         * - `always`: Always throws an error on prompt timeout.
         * - `never`: Never throws an error on prompt timeout (returns undefined).
         * - `auto`: Only throws an error on timeout if there is no default or if required is true.
         * 
         * @default 'auto'
         */
        throwError: "always" | "never" | "auto";
    };

    /**
     * Copied from inquierer types for better typing in this package.
     */
    type DefaultTheme = {
        /**
         * Prefix to prepend to the message. If a function is provided, it will be
         * called with the current status of the prompt, and the return value will be
         * used as the prefix.
         *
         * @remarks
         * If `status === 'loading'`, this property is ignored and the spinner (styled
         * by the `spinner` property) will be displayed instead.
         *
         * @defaultValue
         * ```ts
         * // import colors from 'yoctocolors-cjs';
         * (status) => status === 'done' ? colors.green('✔') : colors.blue('?')
         * ```
         */
        prefix: string | Omit<Record<"loading" | "idle" | "done" | ( string & {} ), string>, 'loading'>;
        /**
         * Configuration for the spinner that is displayed when the prompt is in the
         * `'loading'` state.
         *
         * We recommend the use of {@link https://github.com/sindresorhus/cli-spinners|cli-spinners} for a list of available spinners.
         */
        spinner: {
            /**
             * The time interval between frames, in milliseconds.
             *
             * @defaultValue
             * ```ts
             * 80
             * ```
             */
            interval: number;
            /**
             * A list of frames to show for the spinner.
             *
             * @defaultValue
             * ```ts
             * ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
             * ```
             */
            frames: string[];
        };
        /**
         * Object containing functions to style different parts of the prompt.
         */
        style: {
            /**
             * Style to apply to the user's answer once it has been submitted.
             *
             * @param text - The user's answer.
             * @returns The styled answer.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.cyan(text)
             * ```
             */
            answer: ( text: string ) => string;
            /**
             * Style to apply to the message displayed to the user.
             *
             * @param text - The message to style.
             * @param status - The current status of the prompt.
             * @returns The styled message.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text, status) => colors.bold(text)
             * ```
             */
            message: ( text: string, status: "loading" | "idle" | "done" | ( string & {} ) ) => string;
            /**
             * Style to apply to error messages.
             *
             * @param text - The error message.
             * @returns The styled error message.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.red(`> ${text}`)
             * ```
             */
            error: ( text: string ) => string;
            /**
             * Style to apply to the default answer when one is provided.
             *
             * @param text - The default answer.
             * @returns The styled default answer.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.dim(`(${text})`)
             * ```
             */
            defaultAnswer: ( text: string ) => string;
            /**
             * Style to apply to help text.
             *
             * @param text - The help text.
             * @returns The styled help text.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.dim(text)
             * ```
             */
            help: ( text: string ) => string;
            /**
             * Style to apply to highlighted text.
             *
             * @param text - The text to highlight.
             * @returns The highlighted text.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.cyan(text)
             * ```
             */
            highlight: ( text: string ) => string;
            /**
             * Style to apply to keyboard keys referred to in help texts.
             *
             * @param text - The key to style.
             * @returns The styled key.
             *
             * @defaultValue
             * ```ts
             * // import colors from 'yoctocolors-cjs';
             * (text) => colors.cyan(colors.bold(`<${text}>`))
             * ```
             */
            key: ( text: string ) => string;
        };
    };

    /**
     * Param type for prompt method config, optionally restricted by prompt
     * slug.
     *
     * @see {@link Slug}
     */
    export type Config<
        P extends Slug = Slug,
        Value extends SelectValue = (
            P extends "bool"
            ? boolean
            : P extends "input"
            ? string
            : P extends "select"
            ? SelectValue
            : never
        )
    > = {

        /**
         * Prompt message before input.
         */
        message: string;

        /**
         * Default value, if any.
         */
        default?: Value;

        /**
         * Optional configuration for output messages while prompting.
         */
        msgArgs?: Partial<MessageMaker.MsgArgs & {
            timestamp: boolean;
        }>;

        /**
         * Colours used to style output.
         */
        styleClrs?: Partial<NodeConsole.Args[ 'styleClrs' ]>;

        theme?: RecursivePartial<DefaultTheme>;

        /**
         * @see {@link NodeConsole_Prompt.Args.timeout}
         */
        timeout?: number;
    };

    /**
     * Optional configuration for {@link NodeConsole.promptBool}.
     */
    export type BoolConfig = Config<"bool", boolean> & {
        // these are in Config<"bool"> already
        // message: string;
        // default?: boolean;
        // theme?: RecursivePartial<DefaultTheme>;

        transformer?: ( value: boolean ) => string;
    };

    /**
     * Optional configuration for {@link NodeConsole.promptInput}.
     */
    export type InputConfig = Config<"input", string> & {
        // these are in Config<"bool"> already
        // message: string;
        // default?: string;

        required?: boolean;

        transformer?: ( value: string, { isFinal }: {
            isFinal: boolean;
        } ) => string;
        validate?: ( value: string ) => boolean | string | Promise<string | boolean>;

        theme?: RecursivePartial<DefaultTheme & {
            validationFailureMode: 'keep' | 'clear';
        }>;
    };

    /**
     * Optional configuration for {@link NodeConsole.prompt.select}.
     */
    export type SelectConfig<
        Value extends SelectValue = SelectValue,
    > = Omit<Config<"select", Value>, "default"> & {
        // these are in Config<"bool"> already
        // message: string;

        default?: Value;

        choices:
        | ( [ string ] & string[] )
        | {
            value: Value;

            name?: string;
            description?: string;
            short?: string;
            disabled?: boolean | string;
        }[];

        pageSize?: number | undefined;
        loop?: boolean | undefined;

        theme?: RecursivePartial<DefaultTheme & {
            icon: {
                cursor: string;
            };
            style: {
                disabled: ( text: string ) => string;
                description: ( text: string ) => string;
            };
            helpMode: 'always' | 'never' | 'auto';
            indexMode: 'hidden' | 'number';
        }>;
    };

    /**
     * Options for select (multiple choice) values.
     */
    export type SelectValue = null | boolean | number | string;

    /**
     * Method names for interactivity in the console.
     */
    export type Slug = "bool" | "input" | "select";
}