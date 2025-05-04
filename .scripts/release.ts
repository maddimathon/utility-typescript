#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { ReleaseArgs } from './classes/Release.js';
import { Release } from './classes/Release.js';

// @ts-expect-error
const args: ReleaseArgs = minimist( process.argv.slice( 2 ) );

const rel = new Release( args );

await rel.run();