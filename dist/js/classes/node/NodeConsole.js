/**
 * @since 0.1.1
 *
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@0.4.2
 */
/*!
 * @maddimathon/utility-typescript@0.4.2
 * @license MIT
 */
import { execSync as nodeExecSync, } from 'child_process';
import * as inquirer from '@inquirer/prompts';
import { AbstractConfigurableClass } from '../abstracts/AbstractConfigurableClass.js';
import { MessageMaker } from '../MessageMaker.js';
import { VariableInspector } from '../VariableInspector.js';
import { escRegExpReplace, mergeArgs, } from '../../functions/index.js';
/**
 * A configurable class for outputting to console within node.
 *
 * Includes formatting and interactive utilities.
 *
 * Not currently tested, marked beta.
 *
 * @see {@link MessageMaker}  Used to format strings for output.  Initialized in the constructor.
 *
 * @beta
 */
export class NodeConsole extends AbstractConfigurableClass {
    /* STATIC METHODS
     * ====================================================================== */
    /**
     * Prints sample output to the console via NodeConsole.log().
     *
     * @category Static
     *
     * @returns  An example, constructed instance used for the sample.
     */
    static async sample(args = {}) {
        const nc = new NodeConsole(args);
        nc.h1('H1: Sample NodeConsole Output');
        nc.log('This is a completely default, single-line message.');
        nc.h2('H2: Multi-line Strings');
        nc.log([
            'This is a completely default array of messages (via log).',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
            'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
            '---',
            'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
        ]);
        if (args.debug) {
            nc.separator();
            nc.logs([
                ['This is a completely default array of messages (via logs).'],
                [''],
                ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.'],
                ['Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.'],
                ['---'],
                ['I AM BLUE.', { clr: 'blue', flag: true, }],
                ['Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.'],
            ]);
        }
        nc.separator();
        nc.log('This message has a hanging indent. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. \nSuspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.', { hangingIndent: ' '.repeat(8) });
        if (args.debug) {
            nc.separator();
            nc.log([
                'This array message has a hanging indent.',
                '',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
                'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
                '---',
                'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
            ], { hangingIndent: ' '.repeat(8) });
        }
        nc.h2('H2: Colours');
        const colours = [
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
        const clrMsgs = [];
        for (const clr of colours) {
            clrMsgs.push([
                `This is a ${clr}, italic message.`,
                {
                    clr,
                    italic: true,
                }
            ]);
        }
        nc.logs(clrMsgs, { joiner: '\n' });
        const clrFlagMsgs = [];
        for (const clr of colours) {
            clrFlagMsgs.push([
                `This is a ${clr}, bold, italic, flag message.`,
                {
                    clr,
                    bold: true,
                    flag: true,
                    italic: true,
                },
            ]);
        }
        nc.h3('H3: Flags');
        nc.logs(clrFlagMsgs, { joiner: '\n' });
        const clrReverseFlagMsgs = [];
        for (const clr of colours) {
            clrReverseFlagMsgs.push([
                `This is a ${clr}, bold, italic, reverse flag message.`,
                {
                    clr,
                    bold: true,
                    flag: 'reverse',
                    italic: true,
                },
            ]);
        }
        nc.heading('H4: Reversed Flags', 4);
        nc.logs(clrReverseFlagMsgs, { joiner: '\n' });
        nc.heading('H4: Random Test Heading', 4);
        nc.h2('H2: Styles');
        nc.log('This is a red, italic message.', { clr: 'red', italic: true, });
        nc.log('This is a turquoise, bold message.', { clr: 'turquoise', bold: true, });
        nc.log('This message is both bold *and* italic.', { bold: true, italic: true, });
        nc.h2('H2: Depth');
        for (let i = 0; i <= 7; i++) {
            nc.log([
                `This is a depth level ${i} message.`,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ], { depth: i });
        }
        nc.h2('H2: Timestamps');
        nc.timestampLog('This is a red, italic timestamped message.', { clr: 'red', italic: true, });
        nc.timestampLog('This is a turquoise, bold timestamped message.', { clr: 'turquoise', bold: true, });
        nc.timestampLog('This timestamped message is both bold *and* italic.', { bold: true, italic: true, });
        if (args.debug) {
            nc.timestampLog([
                'This is an array timestamped message.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.',
                'Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.',
                'Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.',
            ], { clr: 'purple', });
            nc.timestampLog([
                ['This is a bulk timestamped message.'],
                ['I AM BLUE.', { clr: 'blue', flag: true, }],
                ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend.'],
                ['Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis. Donec tincidunt ex mollis, gravida lectus ac, malesuada est. Aenean sit amet velit dapibus, auctor odio in, fringilla velit. Nullam ut pellentesque dui, sit amet dapibus nibh.'],
                ['Sed ultricies viverra nisi, in sodales mauris vehicula et. Maecenas ut pharetra orci.'],
            ], { clr: 'purple', });
        }
        nc.h3('H3: Timestamped Depth');
        for (let i = 0; i <= 7; i++) {
            nc.timestampLog([
                `This is a timestamped depth level ${i} message.`,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque dui eu turpis semper eleifend. Cras congue orci quis justo tristique vehicula. Suspendisse pretium eros et mauris vehicula, non facilisis libero venenatis.',
            ], { depth: i });
        }
        if (args.debug) {
            nc.h2('H2: Variable Inspections');
            const exampleVariable = VariableInspector.sampleComplexObject;
            nc.varDump({ exampleVariable });
            nc.timestampVarDump({ exampleVariable });
        }
        nc.h2('H2: Interactivity');
        await NodeConsole.sampleInteractivity(nc, args);
        nc.h1('All done! (in purple)', { clr: 'purple' });
        return nc;
    }
    /**
     * Samples the interactive methods.
     *
     * @category Static
     */
    static async sampleInteractivity(nc, args = {}) {
        if (!nc) {
            nc = new NodeConsole(args);
        }
        /**
         * For testing the prompt methods.
         */
        const tester = async (prompt, basicMsg, config, extras = []) => {
            var _a, _b;
            nc.varDump({
                result: await nc.prompt(prompt, {
                    ...config !== null && config !== void 0 ? config : {},
                    message: basicMsg,
                })
            });
            if (args.debug) {
                for (const extra of extras) {
                    const inspectorVar = {
                        result: await nc.prompt(prompt, {
                            ...config !== null && config !== void 0 ? config : {},
                            ...extra !== null && extra !== void 0 ? extra : {},
                        })
                    };
                    const inspectorMsgArgs = {
                        ...(_a = config.msgArgs) !== null && _a !== void 0 ? _a : {},
                        ...(_b = extra.msgArgs) !== null && _b !== void 0 ? _b : {},
                        bold: false,
                        italic: false,
                    };
                    if (extra.timestamp) {
                        nc.timestampVarDump(inspectorVar, inspectorMsgArgs);
                    }
                    else {
                        nc.varDump(inspectorVar, inspectorMsgArgs);
                    }
                }
            }
        };
        nc.h3('H3: Bool');
        await tester('bool', 'This bool method should let you say yes or no:', {}, [
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
        ]);
        nc.h3('H3: Input');
        await tester('input', 'This input method should let you input a custom string:', {
            validate: (value) => value == 'I_AM_A_ERROR' ? 'Your string matched the test error string, pick something else' : true,
        }, [
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
        ]);
        nc.h3('H3: Select');
        await tester('select', 'This select method should let you choose from a multiple-choice list:', {
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
        }, [
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
        ]);
        return nc;
    }
    /* Args ===================================== */
    /**
     * @category Args
     */
    get ARGS_DEFAULT() {
        const cmdErrorHandler = (err) => {
            const output = err.output
                ? this.msg.implodeWithIndent(err.output.filter((l) => l !== null))
                : Object.keys(err)
                    .map((key) => `${key}: ${err[key]}`)
                    .join('\n');
            this.log('Console error:' + output, { clr: 'red' });
            process.exit(1);
        };
        return {
            cmdErrorHandler,
            msgMaker: {
                msg: {
                    maxWidth: 100,
                    tab: '        ',
                },
                paintFormat: 'node',
            },
            argsRecursive: true,
            separator: null,
            styleClrs: {
                disabled: 'grey',
                error: 'red',
                help: 'grey',
                highlight: 'purple',
            },
            varInspect: {},
        };
    }
    /**
     * Build a complete args object.
     *
     * @category Args
     */
    buildArgs(args) {
        const mergedDefault = AbstractConfigurableClass.abstractArgs(this.ARGS_DEFAULT);
        // using this.mergeArgs here can cause issues because this method is 
        // sometimes called from the prototype
        const merged = mergeArgs(mergedDefault, args !== null && args !== void 0 ? args : {}, this.ARGS_DEFAULT.argsRecursive);
        if (args === null || args === void 0 ? void 0 : args.msgMaker) {
            merged.msgMaker = MessageMaker.prototype.buildArgs(mergeArgs(mergedDefault.msgMaker, args.msgMaker, MessageMaker.prototype.ARGS_DEFAULT.argsRecursive));
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
    get maxWidth() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.args.msgMaker) === null || _a === void 0 ? void 0 : _a.msg) === null || _b === void 0 ? void 0 : _b.maxWidth) !== null && _c !== void 0 ? _c : 120;
    }
    /* CONSTRUCTOR
     * ====================================================================== */
    constructor(args = {}) {
        super(args);
        this.msg = new MessageMaker(this.args.msgMaker);
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
    cmd(cmd, args = {}, literalFalse, equals) {
        try {
            nodeExecSync(`${cmd} ${this.cmdArgs(args, literalFalse, equals)}`, {
                encoding: 'utf-8',
            });
        }
        catch (err) {
            this.args.cmdErrorHandler(err);
        }
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
    cmdArgs(obj, literalFalse = false, equals = true) {
        const arr = [];
        const sep = equals ? '=' : ' ';
        for (const key in obj) {
            if (obj[key] === null
                || typeof obj[key] === 'undefined'
                || obj[key] === undefined) {
                continue;
            }
            switch (typeof obj[key]) {
                case 'boolean':
                    if (obj[key]) {
                        arr.push(`--${key}`);
                    }
                    else if (literalFalse) {
                        arr.push(`--${key}${sep}false`);
                    }
                    else {
                        arr.push(`--no-${key}`);
                    }
                    continue;
                case 'number':
                    arr.push(`--${key}${sep}${obj[key]}`);
                    continue;
                case 'string':
                    arr.push(`--${key}${sep}"${obj[key].replace(/(?<!\\)"/g, escRegExpReplace('\\"'))}"`);
                    continue;
            }
        }
        return arr.join(' ');
    }
    /* Outputters ===================================== */
    /**
     * Outputs the given message to the console.
     *
     * @category  Outputters
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    log(msg, args = {}) {
        var _a;
        console[(_a = args.via) !== null && _a !== void 0 ? _a : 'log'](this.msg.msg(msg, args));
    }
    /**
     * Outputs the given message to the console.
     *
     * @category  Outputters
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    logs(msgs, args = {}) {
        var _a;
        if (!Array.isArray(msgs)) {
            msgs = [msgs];
        }
        console[(_a = args.via) !== null && _a !== void 0 ? _a : 'log'](this.msg.msgs(msgs, args));
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
    timestampLog(msg, args = {}, timeArgs = {}) {
        var _a;
        console[(_a = args.via) !== null && _a !== void 0 ? _a : 'log'](this.msg.timestampMsg(msg, args, timeArgs));
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
    timestampVarDump(variable, args = {}, timeArgs = {}) {
        this.timestampLog(VariableInspector.stringify(variable, this.mergeArgs(this.args.varInspect, args)), args, timeArgs);
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
    varDump(variable, args = {}) {
        this.log(VariableInspector.stringify(variable, this.mergeArgs(this.args.varInspect, args)), args);
    }
    /* Outputters (Pre-formatted) ===================================== */
    /**
     * Outputs a heading string to the console.
     *
     * @category  Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    heading(heading, level, _args = {}) {
        var _a, _b, _c, _d, _e, _f;
        const args = {
            bold: true,
            joiner: '\n',
            ..._args,
            linesIn: 2,
            linesOut: 1,
            maxWidth: (_a = _args.maxWidth) !== null && _a !== void 0 ? _a : this.maxWidth,
        };
        let messages = [
            [heading],
        ];
        switch (level) {
            case 1:
                args.clr = (_b = args.clr) !== null && _b !== void 0 ? _b : null;
                args.linesIn = 3;
                messages = [
                    [heading.toUpperCase(), { flag: true, fullWidth: true }],
                    ['='.repeat(this.maxWidth)],
                ];
                break;
            case 2:
                args.clr = (_c = args.clr) !== null && _c !== void 0 ? _c : 'purple';
                args.maxWidth = this.maxWidth * 2 / 3;
                messages = [
                    [heading, { flag: true, fullWidth: true }],
                    ['+ '.repeat(args.maxWidth / 2).trim()],
                ];
                break;
            case 3:
                args.clr = (_d = args.clr) !== null && _d !== void 0 ? _d : 'turquoise';
                args.maxWidth = this.maxWidth / 3;
                messages = [
                    [heading, { flag: true, fullWidth: true }],
                    ['+ '.repeat(args.maxWidth / 2).trim()],
                ];
                break;
            default:
                args.clr = (_e = args.clr) !== null && _e !== void 0 ? _e : 'green';
                messages = [
                    [heading, { flag: true }],
                    ['- '.repeat(Math.ceil(Math.min(heading.length, args.maxWidth / 2) / 2 + 1.5)).trim()],
                ];
                break;
        }
        console[(_f = args.via) !== null && _f !== void 0 ? _f : 'log'](this.msg.msgs(messages, args));
    }
    /**
     * Outputs a separator string to the console.
     *
     * @category  Outputters (Pre-formatted)
     *
     * @see {@link MessageMaker.msg}  Used to format the message.
     */
    separator(args = {}) {
        var _a, _b, _c, _d, _e;
        const quarterWidth = this.maxWidth / 4;
        const padding = ' '.repeat(quarterWidth);
        const defaultArgs = {
            bold: true,
            clr: 'grey',
            ...((_b = (_a = this.args.separator) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : {}),
        };
        console[(_c = args.via) !== null && _c !== void 0 ? _c : 'log'](this.msg.msg((_e = (_d = this.args.separator) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : [
            '',
            padding + '- '.repeat(quarterWidth).trim() + padding,
            '',
        ], { ...defaultArgs, ...args }));
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
    async prompt(prompter, _config) {
        var _a, _b, _c, _d, _e;
        const config = this.mergeArgs({
            msgArgs: {},
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
        if (linesIn) {
            this.log('\n'.repeat(linesIn));
        }
        let result;
        switch (prompter) {
            case 'bool':
                result = await this.promptBool(config);
                break;
            case 'input':
                result = await this.promptInput(config);
                break;
            case 'select':
                result = await this.promptSelect(config);
                break;
        }
        if (linesOut) {
            this.log('\n'.repeat(linesOut));
        }
        return result;
    }
    /**
     * @category  Interactivity
     */
    async promptBool(config) {
        const defaultConfig = {
            default: false,
        };
        return await inquirer.confirm(this.mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category  Interactivity
     */
    async promptInput(config) {
        const defaultConfig = {
            required: true,
        };
        return await inquirer.input(this.mergeArgs(defaultConfig, config, true));
    }
    /**
     * @category  Interactivity
     */
    async promptSelect(config) {
        const defaultConfig = {
            choices: [],
            msgArgs: {},
            pageSize: 10,
        };
        return await inquirer.select(this.mergeArgs(defaultConfig, config, true));
    }
    /* Aliases ===================================== */
    /**
     * Alias for {@link NodeConsole.log} with `via: "debug"` argument.
     *
     * @category  Aliases
     */
    debug(msg, args = {}) {
        this.log(msg, { ...args, via: 'debug' });
    }
    /**
     * Alias for {@link NodeConsole.logs} with `via: "debug"` argument.
     *
     * @category  Aliases
     */
    debugs(msgs, args = {}) {
        this.logs(msgs, { ...args, via: 'debug' });
    }
    /**
     * Outputs a level-one heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h1(heading, args = {}) {
        this.heading(heading, 1, args);
    }
    /**
     * Outputs a level-two heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h2(heading, args = {}) {
        this.heading(heading, 2, args);
    }
    /**
     * Outputs a level-three heading string to the console.
     *
     * Alias for {@link MessageMaker.heading}.
     *
     * @category  Outputters (Pre-formatted)
     */
    h3(heading, args = {}) {
        this.heading(heading, 3, args);
    }
    /**
     * Alias for {@link NodeConsole.separator}.
     *
     * @category  Aliases
     */
    sep(...params) {
        this.separator(...params);
    }
    /**
     * Alias for {@link NodeConsole.log} with `via: "warn"` argument.
     *
     * @category  Aliases
     */
    warn(msg, args = {}) {
        this.log(msg, { ...args, via: 'warn' });
    }
    /**
     * Alias for {@link NodeConsole.logs} with `via: "warn"` argument.
     *
     * @category  Aliases
     */
    warns(msgs, args = {}) {
        this.logs(msgs, { ...args, via: 'warn' });
    }
}
/**
 * Used only for {@link NodeConsole}.
 *
 * @beta
 */
(function (NodeConsole) {
    ;
})(NodeConsole || (NodeConsole = {}));
//# sourceMappingURL=NodeConsole.js.map