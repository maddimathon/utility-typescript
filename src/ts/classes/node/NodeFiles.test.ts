/**
 * @since 0.2.0
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

import NodeFS from 'node:fs';

// import type { Test } from '../types/index.js';
import { describe, expect, test } from '@jest/globals';

import { NodeFiles } from './NodeFiles.js';

describe( 'NodeFiles', () => {

    const nf_inst = new NodeFiles();

    const test12FilePath = '.scripts/tmp/test-12.ts';

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
            expect( nf_inst.pathRelative( input ) ).toBe( result );
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
            expect( nf_inst.pathResolve( ...input ) ).toBe( result );
        }
    } );

    test( 'NodeFiles.changeBaseName()', () => {

        const testSets: [ [ string, string ], string ][] = [
            [ [ '.scripts/package.ts', 'new-package' ], '.scripts/new-package.ts' ],
            [ [ '.scripts/package', 'new-package' ], '.scripts/new-package' ],
            [ [ nf_inst.pathResolve( '.scripts/package.ts' ), 'new-package' ], nf_inst.pathResolve( '.scripts/new-package.ts' ) ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nf_inst.changeBaseName( ...input ) ).toBe( result );
        }
    } );

    test( 'NodeFiles.uniquePath()', () => {

        const testSets: [ string, string ][] = [
            [ '.scripts/package.ts', nf_inst.pathResolve( '.scripts/package-1.ts' ) ],
            [ '.scripts/classes/abstracts/AbstractStage.ts', nf_inst.pathResolve( '.scripts/classes/abstracts/AbstractStage-1.ts' ) ],
            [ '.scripts/tmp/test-12.ts', nf_inst.pathResolve( '.scripts/tmp/test-13.ts' ) ],
        ];

        for ( const [ input, result ] of testSets ) {
            expect( nf_inst.uniquePath( input ) ).toBe( result );
        }
    } );

    const test12FileContent = '// this is a file to test reading files';

    test( 'NodeFiles.readFile()', () => {

        expect( nf_inst.readFile( nf_inst.pathResolve( test12FilePath ) ) ).toBe( test12FileContent );
        expect( nf_inst.readFile( test12FilePath ) ).toBe( test12FileContent );
    } );

    const writeAndDeletePath = '.scripts/tmp/test-written-file.ts';
    const writeAndDeleteAbsolutePath = nf_inst.pathResolve( writeAndDeletePath );

    describe( 'NodeFiles.writeFile()', () => {

        const fileContent = '// this is a file to test writing and deleting files';

        test( 'simple file writing', () => {
            expect( nf_inst.writeFile( writeAndDeletePath, fileContent ) ).toBe( writeAndDeleteAbsolutePath );
            expect( nf_inst.readFile( writeAndDeletePath ) ).toBe( fileContent );
        } );

        test( 'by default, do not overwrite or rename files that already exist', () => {
            expect( nf_inst.writeFile( writeAndDeletePath, fileContent ) ).toBe( false );
        } );

        test( 'if forced, overwrite the file', () => {

            const fileContentOverwrite = '// this is a file to test writing and deleting files (OVERWRITTEN)';

            expect( nf_inst.writeFile( writeAndDeletePath, fileContentOverwrite, { force: true } ) ).toBe( writeAndDeleteAbsolutePath );
            expect( nf_inst.readFile( writeAndDeletePath ) ).toBe( fileContentOverwrite );
        } );

        test( 'if rename is true, create a unique path for the new file', () => {

            expect( nf_inst.writeFile(
                '.scripts/tmp/test-12.ts',
                test12FileContent,
                { rename: true }
            ) ).toBe( nf_inst.pathResolve( '.scripts/tmp/test-13.ts' ) );
        } );
    } );

    test( 'NodeFiles.deleteFiles()', () => {

        nf_inst.deleteFiles( [ writeAndDeletePath, '.scripts/tmp/test-13.ts' ] );

        expect( NodeFS.existsSync( writeAndDeletePath ) ).toBe( false );
        expect( NodeFS.existsSync( '.scripts/tmp/test-13.ts' ) ).toBe( false );
    } );

} );