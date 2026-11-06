/**
 * @since 2.0.0-beta.7
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../types/index.js';

import { describe, expect, test } from '@jest/globals';

import { iterableFlatten } from './iterableFlatten.js';

const _mapContents = [
    [ 'one', 1 ],
    [ 'two', 2 ],
    [ 'three', 3 ],
] as const;
const _mapContents_flat = [
    ..._mapContents[ 0 ],
    ..._mapContents[ 1 ],
    ..._mapContents[ 2 ],
] as const;

const _setContents = [
    'set-a',
    'set-b',
    'set-c',
] as const;

const multiDimensionArr = [
    'one',
    'two',
    new Set( [
        ..._setContents,
        new Map( _mapContents ),
    ] ),
    'three',
    'four',
    298643515,
    'two',
    'one',
    'four',
];

const flattenedArr = [
    'one',
    'two',
    ..._setContents,
    ..._mapContents_flat,
    'three',
    'four',
    298643515,
    'two',
    'one',
    'four',
];

describe( 'iterableFlatten()', () => {
    test( 'flattening', () => expect( iterableFlatten( multiDimensionArr ) ).toEqual( flattenedArr ) );
} );