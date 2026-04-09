/**
 * @since 2.0.0-beta.2
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.3.draft
 * @license MIT
 */
import { RecursiveMap, RecursiveRecord } from '../../types/objects/records.js';
export declare function mapToObjectAsync<T_Keys extends keyof any, T_Values extends any>(map: Map<T_Keys, T_Values>): Promise<Record<T_Keys, T_Values>>;
export declare function mapToObjectAsync<T_Keys extends keyof any, T_Values extends any>(map: RecursiveMap<T_Keys, T_Values>): Promise<RecursiveRecord<T_Keys, T_Values>>;
//# sourceMappingURL=mapToObjectAsync.d.ts.map