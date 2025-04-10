#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 * 
 * @since ___PKG_VERSION___
 */

import minimist from 'minimist';

// import { F } from './@utilities.js';

import type { TestArgs } from './classes/Test.js';
import { Test } from './classes/Test.js';


const args: TestArgs = minimist( process.argv.slice( 2 ) );

const ts = new Test( args );

await ts.run();