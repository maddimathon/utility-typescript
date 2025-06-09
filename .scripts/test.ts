#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Test } from './classes/Test.js';

const args = minimist( process.argv.slice( 2 ) ) as Test.Args;

const ts = new Test( args );

await ts.run();