/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
/**
 * Formats a date in a predictable way.
 *
 * Meant for human-readable timestamps, not ISO or Unix, etc.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString | Date.toLocaleString()}  Used to format the string.
 *
 * @category Functions – String
 *
 * @param date   Optional. Date object to format. Defaults to now.
 * @param _args  Optional.
 *
 * @return  Formatted date string.
 *
 * @since 0.1.0
 */
export function timestamp(date = null, _args = {}) {
    const _inputTimeFormat = typeof _args.time === 'object' ? _args.time : {};
    const formats = {
        date: typeof _args.date === 'object'
            ? {
                ...timestamp.Args.Format.DEFAULTS.date,
                ..._args.date,
            }
            : timestamp.Args.Format.DEFAULTS.date,
        time: {
            ...timestamp.Args.Format.DEFAULTS.time,
            ..._inputTimeFormat,
            hour12: !_inputTimeFormat.hour12
                ? false
                : typeof _inputTimeFormat.hour12 === 'object'
                    ? {
                        ...timestamp.Args.Format.DEFAULTS.time.hour12,
                        ..._inputTimeFormat.hour12,
                    }
                    : timestamp.Args.Format.DEFAULTS.time.hour12,
            second: _inputTimeFormat.second ?? _inputTimeFormat.millisecond ?? false,
        },
    };
    const args = {
        separator: ' @ ',
        ..._args,
        date: !!_args.date,
        time: _args.time ? !!_args.time : !_args.date,
    };
    if (args.debug) {
        console.log('timestamp() args =', args);
        console.log('timestamp() formats =', formats);
    }
    if (!(date instanceof Date)) {
        date = new Date();
    }
    const formatted = [];
    if (args.date) {
        const _dateParts = [];
        if (formats.date.year) {
            _dateParts.push(date.getFullYear().toFixed().padStart(4, '0'));
        }
        if (formats.date.month) {
            _dateParts.push((date.getMonth() + 1).toFixed().padStart(2, '0'));
        }
        if (formats.date.day) {
            _dateParts.push(date.getDate().toFixed().padStart(2, '0'));
        }
        if (_dateParts.length) {
            formatted.push(_dateParts.join('-'));
        }
    }
    if (args.time) {
        const _timeParts_colon = [];
        if (formats.time.hour) {
            let _hr = date.getHours();
            if (formats.time.hour12) {
                _hr = _hr % 12 || 12;
            }
            _timeParts_colon.push(_hr.toFixed().padStart(2, '0'));
        }
        if (formats.time.minute) {
            _timeParts_colon.push(date.getMinutes().toFixed().padStart(2, '0'));
        }
        if (formats.time.second) {
            _timeParts_colon.push(date.getSeconds().toFixed().padStart(2, '0'));
        }
        const _timeParts_dot = _timeParts_colon.length
            ? [_timeParts_colon.join(':')]
            : [];
        if (formats.time.millisecond) {
            _timeParts_dot.push(date.getMilliseconds().toFixed().padEnd(3, '0'));
        }
        if (_timeParts_dot.length) {
            let suffix = '';
            if (formats.time.hour && formats.time.hour12) {
                suffix = date.getHours() < 12 ? formats.time.hour12.am : formats.time.hour12.pm;
            }
            formatted.push(_timeParts_dot.join('.') + suffix);
        }
    }
    if (args.debug) {
        console.log('timestamp() formatted =', formatted);
    }
    return formatted.join(args.separator);
}
/**
 * Used only for {@link timestamp} function.
 *
 * @category Functions – String
 *
 * @since 0.1.0
 */
(function (timestamp) {
    /**
     * Utility types for the {@link Args} type.
     *
     * @since 2.0.0-beta.3
     */
    let Args;
    (function (Args) {
        /**
         * Utility types for defining output formats in the {@link Args} type.
         *
         * @since 2.0.0-beta.3
         */
        let Format;
        (function (Format) {
            /**
             * Default format argument values.
             *
             * @since 2.0.0-beta.3
             */
            Format.DEFAULTS = {
                date: {
                    year: true,
                    month: true,
                    day: true,
                },
                time: {
                    hour12: {
                        am: ' am',
                        pm: ' pm',
                    },
                    hour: true,
                    minute: true,
                    second: false,
                    millisecond: false,
                },
            };
        })(Format = Args.Format || (Args.Format = {}));
    })(Args = timestamp.Args || (timestamp.Args = {}));
})(timestamp || (timestamp = {}));
