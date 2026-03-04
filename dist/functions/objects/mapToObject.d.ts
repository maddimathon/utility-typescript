/**
 * @since 2.0.0-beta.2.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.2
 * @license MIT
 */
import { RecursiveMap, RecursiveRecord } from '../../types/objects/records.js';
export declare function mapToObject<T_Keys extends keyof any, T_Values extends any>(map: Map<T_Keys, T_Values>): Record<T_Keys, T_Values>;
export declare function mapToObject<T_Keys extends keyof any, T_Values extends any>(map: RecursiveMap<T_Keys, T_Values>): RecursiveRecord<T_Keys, T_Values>;
//# sourceMappingURL=mapToObject.d.ts.map