/**
 * Exports all atomized javascript content, except types from the {@link type}
 * export or those specific to node (which are exported at {@link node}).
 *
 * @category Default Endpoint
 *
 * @module default
 *
 * @mergeModuleWith <project>
 *
 * @since 0.1.0
 *
 * @example
 * ```ts
 * import { ... } from '@maddimathon/utility-typescript';
 * ```
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
export * from './functions/arrays/arrayUnique.js';
export * from './functions/arrays/hasIterator.js';
export * from './functions/maps/mapFlatten.js';
export * from './functions/maps/mapFlattenAsync.js';
export * from './functions/maps/mapToObject.js';
export * from './functions/maps/mapToObjectAsync.js';
export * from './functions/objects/deleteUndefinedProps.js';
export * from './functions/objects/isObjectEmpty.js';
export * from './functions/objects/mergeArgs.js';
export * from './functions/objects/mergeArgsAsync.js';
export * from './functions/objects/objectFlatten.js';
export * from './functions/objects/objectFlattenAsync.js';
export * from './functions/objects/objectKeySort.js';
export * from './functions/objects/objectKeySortAsync.js';
export * from './functions/objects/objectMap.js';
export * from './functions/objects/objectMapAsync.js';
export * from './functions/regex/escRegExp.js';
export * from './functions/regex/escRegExpReplace.js';
export * from './functions/strings/makeNumber.js';
export * from './functions/strings/makeNumberAsync.js';
export * from './functions/strings/slugify.js';
export * from './functions/strings/softWrapText.js';
export * from './functions/strings/timestamp.js';
export * from './functions/strings/toTitleCase.js';
export * from './functions/typeOf.js';
export * from './classes/MessageMaker.js';
export * from './classes/VariableInspector.js';
