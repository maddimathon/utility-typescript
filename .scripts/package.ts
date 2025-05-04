#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import type { PackageArgs } from './classes/Package.js';
import { Package } from './classes/Package.js';

// @ts-expect-error
const args: PackageArgs = minimist( process.argv.slice( 2 ) );

const pkg = new Package( args );

await pkg.run();