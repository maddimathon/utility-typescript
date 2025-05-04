#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */

import { NodeConsole } from '../../src/ts/classes/node/NodeConsole.js';

await NodeConsole.sample( { debug: false, msgMaker: { msg: { maxWidth: 80 } } } );
// await NodeConsole.sampleInteractivity( new NodeConsole( { msgMaker: { msg: { maxWidth: 80 } } } ), { debug: true } );