#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */

import minimist from 'minimist';

// import { F } from './@utilities.js';

import type { SnapshotArgs } from './classes/Snapshot.js';
import { Snapshot } from './classes/Snapshot.js';


const args: SnapshotArgs = minimist( process.argv.slice( 2 ) );

const snap = new Snapshot( args );

await snap.run();