/**
 * Exports all global types (no JavaScript).
 * 
 * @module types
 * 
 * @since 0.1.0
 * @since ___PKG_VERSION___ — Now only available at its own path, not as a namespace from the main export path.
 * 
 * @example
 * ```ts
 * import type { ... } from '@maddimathon/utility-typescript/types';
 * ```
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

export type * from './arrays.ts';

export type * from './functions.js';

export type * from './json/PackageJson.js';
export type * from './json/TsConfig.js';

export type * from './debug.js';

export type * from './objects/classes.js';
export type * from './objects/keys.js';
export type * from './objects/partial.js';
export type * from './objects/required.js';

export type * from './string-literals/html.js';

export type * as Test from './test.js';