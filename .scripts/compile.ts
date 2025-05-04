#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { CompileArgs } from './classes/Compile.js';
import { Compile } from './classes/Compile.js';

// @ts-expect-error
const args: CompileArgs = minimist( process.argv.slice( 2 ) );

const cmpl = new Compile( args );

await cmpl.run();