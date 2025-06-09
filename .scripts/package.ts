#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Package } from './classes/Package.js';

const args = minimist( process.argv.slice( 2 ) ) as Package.Args;

const pkg = new Package( args );

await pkg.run();