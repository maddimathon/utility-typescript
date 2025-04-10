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

import type { BuildArgs } from './classes/Build.js';
import { Build } from './classes/Build.js';


const args: BuildArgs = minimist( process.argv.slice( 2 ) );

const bld = new Build( args );

await bld.run();