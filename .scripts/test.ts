#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { TestArgs } from './classes/Test.js';
import { Test } from './classes/Test.js';

// @ts-expect-error
const args: TestArgs = minimist( process.argv.slice( 2 ) );

const ts = new Test( args );

await ts.run();