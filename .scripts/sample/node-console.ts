#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { NodeConsole } from '../../src/ts/classes/node/NodeConsole.js';

await NodeConsole.sample( { debug: false, msgMaker: { msg: { maxWidth: 80 } } } );
// await NodeConsole.sampleInteractivity( new NodeConsole( { msgMaker: { msg: { maxWidth: 80 } } } ), { debug: true } );