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

import type { CompileArgs } from './classes/Compile.js';
import { Compile } from './classes/Compile.js';


const args: CompileArgs = minimist( process.argv.slice( 2 ) );

const cmpl = new Compile( args );

await cmpl.run();