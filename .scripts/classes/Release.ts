#!/usr/bin/env tsx
'use strict';
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @author Maddi Mathon (www.maddimathon.com)
 * @homepage ___CURRENT_URL___
 * 
 * @license MIT
 */


/* IMPORT TYPES */
import type { AbstractArgs } from './abstracts/AbstractStage.js';
import type { PackageArgs, PackageStages } from './Package.js';


/* IMPORT EXTERNAL DEPENDENCIES */


/* IMPORT LOCAL DEPENDENCIES */
import { AbstractStage } from './abstracts/AbstractStage.js';
import { Package } from './Package.js';

import {
    pkgReplacements,
} from '../vars/replacements.js';
import { softWrapText } from 'src/ts/functions/index.js';



/* # TYPES
 * ========================================================================== */

export interface ReleaseArgs extends AbstractArgs<ReleaseStages> {

    'only-pkg'?: PackageStages | PackageStages[];
    'without-pkg'?: PackageStages | PackageStages[];
}

export type ReleaseStages = typeof testStages[ number ];



/* # VARIABLES
 * ========================================================================== */

const testStages = [
    'changelog',
    'package',
    'replace',
    'commit',
    'github',
    'tidy',
] as const;



/* # CLASS
 * ========================================================================== */

export class Release extends AbstractStage<ReleaseStages, ReleaseArgs> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public stages = testStages;

    public get ARGS_DEFAULT(): ReleaseArgs {
        // @ts-expect-error
        return {
            ...AbstractStage.ARGS_ABSTRACT,
        };
    }



    /* CONSTRUCTOR
    * ====================================================================== */

    constructor ( args: ReleaseArgs ) {
        args.releasing = true;
        super( args, 'purple' );
    }



    /* LOCAL METHODS
    * ====================================================================== */

    protected async runStage( stage: ReleaseStages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        const depth = this.args[ 'log-base-level' ] ?? 0;

        let linesIn = 2;
        let linesOut = ( this.args.debug || this.args.verbose ) ? 1 : 0;

        const msg: Parameters<typeof this.progressLog>[ 0 ] = which === 'start'
            ? [
                [
                    `RELEASE STARTING`,
                    { flag: true },
                ],
            ]
            : which === 'end'
                ? [
                    [
                        'RELEASED:',
                        { flag: 'reverse' },
                    ],
                    [
                        this.pkg.version,
                        { flag: true },
                    ],
                ]
                : [
                    [
                        `${ which.toUpperCase() }ING RELEASE`,
                        { flag: true },
                    ]
                ];

        this.progressLog(
            msg,
            depth,
            {
                bold: true,
                clr: this.clr,

                linesIn,
                linesOut,

                joiner: '',
            },
        );

        if ( which === 'start' ) {

            const promptArgs: Omit<Parameters<typeof this.fns.nc.prompt>[ 1 ], "message"> = {

                default: false,

                msgArgs: {
                    clr: this.clr,
                    depth: depth + 1,
                    maxWidth: null,
                },

                styleClrs: {
                    highlight: this.clr,
                },
            };

            this.args.dryrun = await this.fns.nc.prompt( 'bool', {
                ...promptArgs,

                message: `Is this a dry run?`,
                default: !!this.args.dryrun,
            } );

            // corrects package number
            const inputVersionMessage = 'What version is being released?';

            const inputVersionIndent: string = ' '.repeat(
                ( depth * this.fns.nc.msg.args.msg.tab.length )
                + inputVersionMessage.length
                + 11
            );

            const inputVersion = ( await this.fns.nc.prompt( 'input', {
                ...promptArgs,
                message: inputVersionMessage,

                default: this.pkg.version,
                validate: ( value ) => (
                    value.trim().match( /^\d+\.\d+\.\d+(\-((alpha|beta)(\.\d+)?|\d+\.\d+\.\d+))?(\+[^\s]+)?$/gi )
                        ? true
                        : softWrapText(
                            'The version should be in [MAJOR].[MINOR].[PATCH] format, optionally suffixed with `-alpha[.#]`, `-beta[.#]`, another valid version code, or metadata prefixed with `+`.',
                            Math.max( 20, ( this.fns.nc.msg.args.msg.maxWidth ?? 80 ) - inputVersionIndent.length )
                        ).split( /\n/g ).join( '\n' + inputVersionIndent )
                ),
            } ) ).trim();

            if ( inputVersion !== this.pkg.version ) {

                const currentPkgJson = this.fns.fs.readFile( 'package.json' );

                this.pkg.version = inputVersion;

                this.fns.fs.writeFile(
                    'package.json',
                    currentPkgJson.replace( /"version":\s*"[^"]*"/gi, this.fns.fns.escRegExpReplace( `"version": "${ inputVersion }"` ) ),
                    { force: true }
                );
            }

            // returns if prep questions fail
            if ( !this.args.dryrun ) {

                // returns
                if (
                    ! await this.fns.nc.prompt( 'bool', {
                        ...promptArgs,
                        message: `Is .releasenotes.md updated?`,
                    } )
                ) {
                    process.exit( 0 );
                }
            }
        }
    }



    /* STAGE METHODS
    * ====================================================================== */

    protected async changelog() {
        if ( !this.args.dryrun ) {
            this.progressLog( 'updating changelog...', 1 );
        }

        const newEntryRegex = /(\n\s*)<!--CHANGELOG_NEW-->\s*(\n|$)/g;

        const newChangeLogEntry =
            '\n\n\n<!--CHANGELOG_NEW-->\n\n\n'
            + `## **${ this.pkgVersion }** -- ${ this.datestamp() }`
            + '\n\n'
            + this.fns.fs.readFile( '.releasenotes.md' ).trim()
            + '\n\n\n';

        // returns
        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping changelog updates during dryrun...', 1 );

            this.args.debug && this.fns.nc.varDump( { newChangeLogEntry }, {
                clr: this.clr,
                depth: 2 + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            return;
        }

        this.fns.fs.writeFile( 'CHANGELOG.md', (
            this.fns.fs.readFile( 'CHANGELOG.md' )
                .replace( newEntryRegex, this.fns.fns.escRegExpReplace( newChangeLogEntry ) )
        ), { force: true } );
    }

    protected async package() {

        const pkg = new Package( {
            ...this.args as PackageArgs,

            'log-base-level': 1 + ( this.args[ 'log-base-level' ] ?? 0 ),

            only: this.args[ 'only-pkg' ],
            without: this.args[ 'without-pkg' ],

            releasing: true,
        } );

        await pkg.run();
    }

    protected async replace() {
        this.progressLog( 'replacing placeholders in source...', 1 );

        // returns
        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping replacements during dryrun...', 2 );
            return;
        }

        const replacementGlobs: ( string | string[] )[] = [
            '.github/**/*',
            [
                '.scripts/**/*',
                '!.scripts/vars/replacements.ts',
            ],
            'src/**/*',
            [
                'CHANGELOG.md',
                'jest.config.js',
                'LICENSE.md',
                'README.md',
            ],
        ];

        for ( const globs of replacementGlobs ) {
            this.args.debug && this.progressLog(
                `replacing in globs: ${ [ globs ].flat().map( s => `'${ s }'` ).join( ' ' ) }`,
                2,
            );

            for ( const o of pkgReplacements( this ) ) {

                this.replaceInFiles(
                    globs,
                    o.find,
                    o.replace,
                    this.args.debug ? 3 : 2,
                );
            }
        }
    }

    protected async commit() {
        this.progressLog( 'commiting any new changes...', 1 );

        const gitCmd = `git add @releases/*.zip dist docs CHANGELOG.md README.md && git commit -a --allow-empty -m "[${ this.datestamp() }] release: ${ this.pkgVersion }"`;

        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping git commit during dryrun...', 2 );

            this.args.debug && this.fns.nc.varDump( { gitCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 3 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {

            this.args.debug && this.fns.nc.varDump( { gitCmd }, {
                clr: this.clr,
                depth: 2 + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            this.fns.nc.cmd( gitCmd );
            this.fns.nc.cmd( `git tag -a -f ${ this.pkgVersion } -m "release: ${ this.pkgVersion }"` );
            this.fns.nc.cmd( `git push --tags || echo ''` );

            this.verboseLog( 'pushing to origin...', 2 );
            this.fns.nc.cmd( 'git push' );
        }
    }

    protected async github() {
        this.progressLog( 'publishing to github...', 1 );


        this.verboseLog( 'updating repo metadata...', 2 );
        const repoUpdateCmd = `gh repo edit ${ this.fns.nc.cmdArgs( {
            description: this.pkg.description,
            homepage: this.pkg.homepage,
        }, false, false ) }`;

        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping git commit during dryrun...', 3 );

            this.args.debug && this.fns.nc.varDump( { repoUpdateCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 4 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {
            this.fns.nc.cmd( repoUpdateCmd );
        }


        this.verboseLog( 'creating github release...', 2 );

        const releaseAttachment = `"${ this.releasePath.replace( /\/*$/g, '' ) + '.zip' }#${ this.pkg.name }@${ this.pkgVersion }"`;

        const releaseCmd = `gh release create ${ this.pkgVersion } ${ releaseAttachment } ${ this.fns.nc.cmdArgs( {
            draft: true,
            'notes-file': '.releasenotes.md',
            title: `${ this.pkgVersion } — ${ this.datestamp() }`,
        }, false, false ) }`;

        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping github release during dryrun...', 3 );

            this.args.debug && this.fns.nc.varDump( { releaseCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 4 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {

            this.args.debug && this.fns.nc.varDump( { releaseCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 3 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            this.fns.nc.cmd( releaseCmd );
        }
    }

    protected async tidy() {
        this.progressLog( 'tidying up...', 1 );

        if ( !this.args.dryrun ) {
            this.verboseLog( 'resetting release notes...', 2 );
            this.fns.fs.writeFile( '.releasenotes.md', [
                '',
                '### Breaking',
                '- ',
                '',
                '### Added',
                '- ',
                '',
                '### Changed',
                '- ',
                '',
                '### Fixed',
                '- ',
                '',
                '### Removed',
                '- ',
                '',
                '',
            ].join( '\n' ), { force: true } );
        }
    }
}