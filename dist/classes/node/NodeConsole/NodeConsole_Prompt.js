/**
 * @since 2.0.0-draft
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@2.0.0-draft
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-draft
 * @license MIT
 */
import * as inquirer from '@inquirer/prompts';
import { mergeArgs,
// timeout,
 } from '../../../functions/index.js';
import { NodeConsole_Error } from './NodeConsole_Error.js';
/**
 * Only used by {@link NodeConsole}.
 *
 * @since 2.0.0-draft
 *
 * @experimental
 * @internal
 */
export class NodeConsole_Prompt {
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
        var _a, _b, _c, _d, _e, _f;
        const config = mergeArgs({
            msgArgs: {},
            theme: {},
        }, _config, false);
        const { depth = 0, indent = '', hangingIndent = '', linesIn = 0, linesOut = 0, timestamp = false, } = (_a = config.msgArgs) !== null && _a !== void 0 ? _a : {};
        const msgArgs = {
            bold: true,
            ...(_b = config.msgArgs) !== null && _b !== void 0 ? _b : {},
            linesIn: 0,
            linesOut: 0,
            depth: 0,
            hangingIndent: '',
            indent: '',
        };
        const styleClrs = {
            ...this.args.styleClrs,
            ...(_c = config.styleClrs) !== null && _c !== void 0 ? _c : {},
            highlight: (_e = (_d = config.styleClrs) === null || _d === void 0 ? void 0 : _d.highlight) !== null && _e !== void 0 ? _e : ((msgArgs.clr && msgArgs.clr != 'black' && msgArgs.clr != 'grey')
                ? msgArgs.clr
                : this.args.styleClrs.highlight),
        };
        const prefixIndent = this.msg.args.msg.tab.repeat(depth)
            + ' '.repeat(hangingIndent.length + indent.length);
        const prefixTimestamp = timestamp ? this.msg.timestampMsg('', msgArgs) : '';
        const prefixTimestampIndent = timestamp ? ' '.repeat(this.msg.timestampMsg('').length) : '';
        const selectCursorIndent = prompter == 'select' ? '  ' : '';
        config.theme = {
            helpMode: 'always',
            icon: {
                cursor: '→',
            },
            prefix: {
                done: prefixIndent + (timestamp ? prefixTimestamp : this.msg.msg('✓', {
                    clr: styleClrs.highlight,
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: true,
                })),
                idle: prefixIndent + (timestamp ? prefixTimestamp : this.msg.msg('?', {
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: true,
                })),
            },
            style: {
                answer: (text) => text,
                description: (text) => '\n' + selectCursorIndent + this.msg.msg(text, {
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: false,
                    clr: styleClrs.highlight,
                    italic: !(msgArgs === null || msgArgs === void 0 ? void 0 : msgArgs.italic),
                }),
                disabled: (text) => selectCursorIndent + this.msg.msg(text, {
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: false,
                    clr: styleClrs.disabled,
                }),
                error: (text) => prefixIndent + prefixTimestampIndent + ' '.repeat(config.message.length + (timestamp ? 1 : 3)) + this.msg.msg(text, {
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: false,
                    clr: styleClrs.error,
                    italic: !(msgArgs === null || msgArgs === void 0 ? void 0 : msgArgs.italic),
                }),
                help: (text) => this.msg.msg(text, {
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: false,
                    clr: styleClrs.help,
                    italic: !(msgArgs === null || msgArgs === void 0 ? void 0 : msgArgs.italic),
                }),
                highlight: (text) => this.msg.msg(text, {
                    clr: styleClrs.highlight,
                    ...msgArgs !== null && msgArgs !== void 0 ? msgArgs : {},
                    bold: true,
                    italic: !(msgArgs === null || msgArgs === void 0 ? void 0 : msgArgs.italic),
                }),
                key: (text) => 'KEY: (' + text + ')',
                message: (text, status) => this.msg.msg(text, msgArgs),
            },
            validationFailureMode: 'keep',
        };
        const timeout = (_f = config.timeout) !== null && _f !== void 0 ? _f : this.args.prompt.timeout;
        linesIn && console.log('\n'.repeat(linesIn));
        const result = await run(config, {
            signal: timeout
                ? AbortSignal.timeout(timeout)
                : undefined,
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
     * @category  Interactivity
     */
    async bool(config) {
        const defaultConfig = {};
        return this.prompt('bool', inquirer.confirm, mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category  Interactivity
     */
    async input(config) {
        const defaultConfig = {
            required: true,
        };
        return this.prompt('input', inquirer.input, mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category  Interactivity
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
//# sourceMappingURL=NodeConsole_Prompt.js.map