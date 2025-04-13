#!/usr/bin/env tsx
'use strict';
/**
 * Exports some utilities to use in scripts.
 * 
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 */

import minimist from 'minimist';

export type * as Types from './@types/utilities.d.ts';
export * from './classes/Functions.js';

import { BuildFunctions } from './classes/Functions.js';


const args: BuildFunctions.Args =
    // @ts-expect-error
    minimist( process.argv.slice( 2 ) ) as BuildFunctions.Args;

export const F = new BuildFunctions( args );