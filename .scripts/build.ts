#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { BuildArgs } from './classes/Build.js';
import { Build } from './classes/Build.js';

// @ts-expect-error
const args: BuildArgs = minimist( process.argv.slice( 2 ) );

const bld = new Build( args );

await bld.run();