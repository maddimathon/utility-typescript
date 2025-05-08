/**
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { AbstractStage } from '../classes/abstracts/AbstractStage.js';


export type ReplacementObject = { find: string | RegExp, replace: string; };


export function currentReplacements( stage: AbstractStage<any, any> ): ReplacementObject[] {
    return [
        { find: '___CURRENT_DESC___', replace: stage.pkg.description, },
        { find: '___CURRENT_URL___', replace: stage.pkg.homepage, },
        { find: '___CURRENT_VERSION___', replace: stage.pkgVersion, },
        { find: '___CURRENT_YEAR___', replace: stage.datestamp( null, 'yyyy' ), },
    ];
}

export function pkgReplacements( stage: AbstractStage<any, any> ): ReplacementObject[] {
    return [
        { find: '2025-05-08', replace: stage.datestamp( null, 'yyyy-MM-dd' ), },
        { find: '0.4.3', replace: stage.pkgVersion, },
        { find: '2025', replace: stage.datestamp( null, 'yyyy' ), },
    ];
}