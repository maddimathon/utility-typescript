/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { AbstractStage } from '../classes/abstracts/AbstractStage.js';


export type ReplacementObject = { find: string | RegExp, replace: string; };


export function currentReplacements( stage: AbstractStage<any, any> ): ReplacementObject[] {
    return [
        { find: /___(CURRENT)_DATE___/g, replace: stage.datestamp( null, 'yyyy-MM-dd' ), },
        { find: /___(CURRENT)_DESC(RIPTION)?___/g, replace: stage.pkg.description, },
        { find: /___(CURRENT)_(HOMEPAGE|URL)___/g, replace: stage.pkg.homepage, },
        { find: /___(CURRENT)_VERSION___/g, replace: stage.pkgVersion, },
        { find: /___(CURRENT)_YEAR___/g, replace: stage.datestamp( null, 'yyyy' ), },
    ];
}

export function pkgReplacements( stage: AbstractStage<any, any> ): ReplacementObject[] {
    return [
        { find: /___(PKG)_DATE___/g, replace: stage.datestamp( null, 'yyyy-MM-dd' ), },
        { find: /___(PKG)_VERSION___/g, replace: stage.pkgVersion, },
        { find: /___(PKG)_YEAR___/g, replace: stage.datestamp( null, 'yyyy' ), },
    ];
}