/**
 * @since 2.0.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5
 * @license MIT
 */
import * as inquirer from '@inquirer/prompts';
import { mergeArgs } from '../../../functions/objects/mergeArgs.js';
import { MessageMaker } from '../../../classes/MessageMaker.js';
import { NodeConsole_Error } from './NodeConsole_Error.js';
/**
 * Only used by {@link NodeConsole}.
 *
 * @since 2.0.0-alpha
 *
 * @experimental
 */
export class NodeConsole_Prompt {
    /* LOCAL PROPERTIES
     * ====================================================================== */
    /**
     * A completed args object.
     *
     * @category Args
     */
    args;
    /**
     * A local instance of {@link MessageMaker} initialized using
     * `{@link NodeConsole.Args}.msgMaker`.
     *
     * @category Utilities
     */
    msg;
    /* CONSTRUCTOR
     * ====================================================================== */
    /**
     * @param args  Optional configuration.
     */
    constructor(msg, args) {
        this.args = args;
        this.msg = msg;
    }
    /* LOCAL METHODS
     * ====================================================================== */
    /**
     * Runs a prompter function with some output before and after, if
     * applicable.  Also handles and throws errors as applicable.
     */
    async prompt(prompter, run, _config) {
        const config = {
            msgArgs: {},
            theme: {},
            ..._config,
        };
        const { depth = 0, indent = '', 
        // hangingIndent = '',
        linesIn = 0, linesOut = 0, timestamp = false, } = config.msgArgs ?? {};
        const msgArgs = {
            bold: true,
            hangingIndent: '',
            ...config.msgArgs ?? {},
            linesIn: 0,
            linesOut: 0,
            depth: 0,
            indent: this.msg.args.msg.tab.repeat(depth)
                + ' '.repeat(indent.length + (timestamp ? this.msg.timestamped('').length : 0)),
        };
        const styleClrs = {
            ...this.args.styleClrs,
            ...config.styleClrs ?? {},
            highlight: config.styleClrs?.highlight
                ?? ((msgArgs.clr && msgArgs.clr != 'black' && msgArgs.clr != 'grey')
                    ? msgArgs.clr
                    : this.args.styleClrs.highlight),
        };
        const prefixTimestamp = timestamp ? this.msg.timestamped('', msgArgs) : '';
        const indents = {
            message: ' '.repeat(config.message.length + (timestamp ? 1 : 3)),
            prefix: (status) => (status === 'done' || status === 'idle' ? '  ' : ''),
            selectCursor: prompter == 'select' ? '  ' : '',
        };
        config.theme = {
            icon: {
                cursor: '→',
            },
            prefix: {
                done: timestamp ? prefixTimestamp : this.msg.msg('✓', {
                    clr: styleClrs.highlight,
                    ...msgArgs,
                    bold: true,
                }),
                idle: timestamp ? prefixTimestamp : this.msg.msg('?', {
                    ...msgArgs,
                    bold: true,
                }),
            },
            style: {
                answer: (text) => text,
                description: (text) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    bold: false,
                    clr: styleClrs.highlight,
                    linesIn: 0,
                    linesOut: 1,
                    italic: !msgArgs?.italic,
                    indent: msgArgs.indent + indents.selectCursor,
                }),
                disabled: (text) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    bold: false,
                    clr: styleClrs.disabled,
                    hangingIndent: msgArgs.indent + msgArgs.hangingIndent + indents.selectCursor,
                }),
                error: (text) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    bold: false,
                    clr: styleClrs.error,
                    italic: !msgArgs?.italic,
                    hangingIndent: msgArgs.indent + indents.message,
                }),
                help: (text) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    bold: false,
                    clr: styleClrs.help,
                    italic: !msgArgs?.italic,
                }),
                highlight: (text) => this.msg.msg(text, {
                    clr: styleClrs.highlight,
                    ...msgArgs ?? {},
                    bold: true,
                    italic: !msgArgs?.italic,
                    indent: '',
                    hangingIndent: '',
                }),
                key: (text) => 'KEY: (' + text + ')',
                keysHelpTip: (text) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    bold: false,
                    clr: styleClrs.help,
                    italic: !msgArgs?.italic,
                    indent: msgArgs.indent + indents.selectCursor,
                }),
                message: (text, status) => this.msg.msg(text, {
                    ...msgArgs ?? {},
                    indent: '',
                    hangingIndent: msgArgs.indent + indents.prefix(status),
                }),
            },
            validationFailureMode: 'keep',
        };
        const timeout = config.timeout ?? this.args.prompt.timeout;
        linesIn && console.log(' ' + '\n'.repeat(linesIn - 1));
        const result = await run(config, {
            signal: AbortSignal.timeout(timeout),
        }).catch((error) => {
            const timeoutParams = [
                `Prompt input timed out after ${timeout}ms.`,
                {}
            ];
            // returns
            switch (error.name) {
                case 'AbortPromptError':
                    switch (this.args.prompt.throwError) {
                        case 'always':
                            console.log('');
                            throw new NodeConsole_Error(...timeoutParams);
                            break;
                        case 'auto':
                            if (typeof config.default === 'undefined'
                                || config.required) {
                                console.log('');
                                throw new NodeConsole_Error(...timeoutParams);
                            }
                            break;
                        case 'never':
                            break;
                    }
                    return config.default;
                case 'ExitPromptError':
                    console.log('');
                    process.exit(0);
                    return config.default;
            }
            throw error;
        });
        linesOut && console.log('\n'.repeat(linesOut));
        return result;
    }
    /**
     * @category Interactivity
     */
    async bool(config) {
        const defaultConfig = {};
        return this.prompt('bool', (args, context) => inquirer.confirm({
            default: false,
            ...args,
        }, context), mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category Interactivity
     */
    async input(config) {
        const defaultConfig = {
            required: true,
        };
        return this.prompt('input', inquirer.input, mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category Interactivity
     */
    async select(config) {
        const defaultConfig = {
            choices: [],
            msgArgs: {},
            pageSize: 10,
        };
        return this.prompt('select', inquirer.select, mergeArgs(defaultConfig, config, true));
    }
}
