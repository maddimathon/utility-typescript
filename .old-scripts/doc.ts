#!/usr/bin/env tsx
'use strict';
/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import minimist from 'minimist';

import { Document } from './classes/Document.js';

const args = minimist( process.argv.slice( 2 ) ) as Document.Args;

const doc = new Document( args );

await doc.run();