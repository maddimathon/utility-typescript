/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../../types/index.js';
import { expect, test } from '@jest/globals';

import { toTitleCase } from './toTitleCase.js';

test( 'toTitleCase()', () => {
    expect( toTitleCase( 'hello thEre dEar-o-miNe' ) ).toBe( 'Hello There Dear-o-mine' );
} );