/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

// import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { NodeFiles } from './NodeFiles.js';

describe( 'NodeFiles', () => {

    const nodeFs = new NodeFiles();

    test( 'NodeFiles.pathRelative()', () => {

        const testSets: [ string, string ][] = [
            [
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/package.json',
                'package.json',
            ],
            [
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/.scripts/',
                '.scripts',
            ],
            [
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/',
                '.',
            ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nodeFs.pathRelative( input ) ).toBe( result );
        }
    } );

    test( 'NodeFiles.pathResolve()', () => {

        const testSets: [ string[], string ][] = [
            [
                [ 'package.json' ],
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/package.json'
            ],
            [
                [ '.scripts', 'package.ts' ],
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/.scripts/package.ts'
            ],
            [
                [ '.scripts', 'classes/' ],
                '/Volumes/maddi/Files/Creative/Coding/Code Libraries/utility-typescript/.scripts/classes'
            ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nodeFs.pathResolve( ...input ) ).toBe( result );
        }
    } );

    test( 'NodeFiles.changeBaseName()', () => {

        const testSets: [ [ string, string ], string ][] = [
            [ [ '.scripts/package.ts', 'new-package' ], '.scripts/new-package.ts' ],
            [ [ '.scripts/package', 'new-package' ], '.scripts/new-package' ],
            [ [ nodeFs.pathResolve( '.scripts/package.ts' ), 'new-package' ], nodeFs.pathResolve( '.scripts/new-package.ts' ) ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nodeFs.changeBaseName( ...input ) ).toBe( result );
        }
    } );

    test( 'NodeFiles.uniquePath()', () => {

        const testSets: [ string, string ][] = [
            [ '.scripts/package.ts', nodeFs.pathResolve( '.scripts/package-1.ts' ) ],
            [ '.scripts/classes/abstracts/AbstractStage.ts', nodeFs.pathResolve( '.scripts/classes/abstracts/AbstractStage-1.ts' ) ],
            [ '.scripts/tmp/test-12.ts', nodeFs.pathResolve( '.scripts/tmp/test-13.ts' ) ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nodeFs.uniquePath( input ) ).toBe( result );
        }
    } );

} );