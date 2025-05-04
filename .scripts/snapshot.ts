#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { SnapshotArgs } from './classes/Snapshot.js';
import { Snapshot } from './classes/Snapshot.js';

// @ts-expect-error
const args: SnapshotArgs = minimist( process.argv.slice( 2 ) );

const snap = new Snapshot( args );

await snap.run();