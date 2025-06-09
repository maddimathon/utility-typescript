#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

// import { slugify } from '../../src/ts/functions/index.js';
import { VariableInspector } from '../../src/ts/classes/index.js';

const defaultFormatter: VariableInspector.Formatter = ( str ) => '\x1b[0m' + str;
const resetFormatter: VariableInspector.Formatter = ( str ) => '\x1b[0m' + str + '\x1b[0m';

// const vi = 
VariableInspector.sample( {
    debug: true,
    fallbackToJSON: true,
    formatter: {
        _: defaultFormatter,

        prefix: ( str ) => resetFormatter( '\x1b[1m' + str ),
        type: ( str ) => resetFormatter( '\x1b[38;2;24;103;31;3m' + str ),
        via: ( str ) => resetFormatter( '\x1b[38;2;165;44;50m' + str ),
    },
    // inspectFunctions: true,

    childArgs: {
        formatter: {
            prefix: defaultFormatter,
        },
    }
} );

// F.fs.write( `.scripts/tmp/var-inspect-OBJ_${ slugify( F.datetimestamp() ) }.json`, JSON.stringify( vi, null, 4 ), { force: true } );
// F.fs.write( `.scripts/tmp/var-inspect-OBJ_${ slugify( F.datetimestamp() ) }.txt`, vi.toString(), { force: true } );