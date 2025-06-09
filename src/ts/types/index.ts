/**
 * Exports all global types (no JavaScript).
 * 
 * @module Types
 * 
 * @since 0.1.0
 * 
 * @example
 * ```ts
 * import type { Types } from '@maddimathon/utility-typescript';
 * import type { ... } from '@maddimathon/utility-typescript/types';
 * ```
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

export type * from './arrays/index.ts';
export type * from './functions/index.ts';
export type * as Json from './json/index.ts';
export type * as Debug from './debug.js';
export type * as Objects from './objects/index.ts';
export type * from './string-literals/index.ts';
export type * as Test from './test.js';