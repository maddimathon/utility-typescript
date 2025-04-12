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

import type { DocumentArgs } from './classes/Document.js';
import { Document } from './classes/Document.js';


const args: DocumentArgs = minimist( process.argv.slice( 2 ) );

const doc = new Document( args );

await doc.run();