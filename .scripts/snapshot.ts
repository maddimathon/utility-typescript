#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Snapshot } from './classes/Snapshot.js';

const args = minimist( process.argv.slice( 2 ) ) as Snapshot.Args;

const snap = new Snapshot( args );

await snap.run();