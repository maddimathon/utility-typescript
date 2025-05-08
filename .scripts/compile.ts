#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Compile } from './classes/Compile.js';

const args = minimist( process.argv.slice( 2 ) ) as Compile.Args;

const cmpl = new Compile( args );

await cmpl.run();