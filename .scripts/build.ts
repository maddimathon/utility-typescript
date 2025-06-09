#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Build } from './classes/Build.js';

const args = minimist( process.argv.slice( 2 ) ) as Build.Args;

const bld = new Build( args );

await bld.run();