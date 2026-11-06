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

import { arrayCopy } from './arrayCopy.js';

const multiDimensionArr = [
    'one',
    'two',
    [
        'set-a',
        'set-b',
        'set-c',
        [
            'four',
            298643515,
            'two',
        ],
    ],
    'three',
    'one',
    'four',
];

describe( 'arrayCopy()', () => {
    test( 'copying', () => expect( arrayCopy( multiDimensionArr ) ).toEqual( multiDimensionArr ) );
} );
