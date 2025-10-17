/*
 * @package @maddimathon/utility-js
 * @author Maddi Mathon (www.maddimathon.com)
 * 
 * @license MIT
 */

import { AbstractStage } from './abstracts/AbstractStage.js';
import { Package } from './Package.js';

import {
    pkgReplacements,
} from '../vars/replacements.js';

import { escRegExpReplace, softWrapText } from '../../src/ts/functions/index.js';
import { NodeConsole_Prompt } from 'src/ts/classes/node/index.js';


const releaseSubStages = [
    'changelog',
    'package',
    'replace',
    'commit',
    'github',
    'tidy',
] as const;


export class Release extends AbstractStage<Release.Stages, Release.Args> {



    /* LOCAL PROPERTIES
    * ====================================================================== */

    public subStages = releaseSubStages;

    public get ARGS_DEFAULT() {

        return {
            ...AbstractStage.ARGS_ABSTRACT,
            building: true,
            packaging: true,
            releasing: true,
        } as Release.Args;
    }



    /* CONSTRUCTOR
    * ====================================================================== */

    constructor ( args: Release.Args ) {
        args.releasing = true;
        super( args, 'purple' );
    }



    /* LOCAL METHODS
    * ====================================================================== */

    protected async runSubStage( stage: Release.Stages ) {
        await this[ stage ]();
    }

    public async startEndNotice( which: "start" | "end" | string ): Promise<void> {

        const depth = this.args[ 'log-base-level' ] ?? 0;

        let linesIn = 2;

        let linesOut = ( this.args.debug || this.args.verbose )
            ? 1
            : ( which === 'start' ? 1 : 0 );

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
            0,
            {
                bold: true,
                clr: this.clr,

                linesIn,
                linesOut,

                joiner: '',
            },
        );

        if ( which === 'start' ) {

            const promptArgs: Omit<NodeConsole_Prompt.Config, "message"> = {

                default: false,

                msgArgs: {
                    clr: this.clr,
                    depth: depth + 1,
                    maxWidth: null,
                },

                styleClrs: {
                    highlight: this.clr,
                },

                timeout: 3600000, // an hour?
            };

            this.args.dryrun = await this.nc.prompt.bool( {
                ...promptArgs,

                message: `Is this a dry run?`,
                default: !!this.args.dryrun,
            } );

            // corrects package number
            const inputVersionMessage = 'What version is being released?';

            const inputVersionIndent: string = ' '.repeat(
                ( depth * this.nc.msg.args.msg.tab.length )
                + inputVersionMessage.length
                + 11
            );

            const inputVersion = ( await this.nc.prompt.input( {
                ...promptArgs,
                message: inputVersionMessage,

                default: this.pkg.version,
                validate: ( value ) => (
                    value.trim().match( /^\d+\.\d+\.\d+(\-((alpha|beta)(\.\d+)?|\d+\.\d+\.\d+))?(\+[^\s]+)?$/gi )
                        ? true
                        : softWrapText(
                            'The version should be in [MAJOR].[MINOR].[PATCH] format, optionally suffixed with `-alpha[.#]`, `-beta[.#]`, another valid version code, or metadata prefixed with `+`.',
                            Math.max( 20, ( this.nc.msg.args.msg.maxWidth ?? 80 ) - inputVersionIndent.length )
                        ).split( /\n/g ).join( '\n' + inputVersionIndent )
                ),
            } ) ?? '' ).trim();

            if ( inputVersion !== this.pkg.version ) {

                const currentPkgJson: string = this.fs.readFile( 'package.json' );

                this.pkg.version = inputVersion;

                this.fs.write(
                    'package.json',
                    currentPkgJson.replace(
                        /"version":\s*"[^"]*"/gi,
                        escRegExpReplace( `"version": "${ inputVersion }"` )
                    ),
                    { force: true }
                );
            }

            // returns if prep questions fail
            if ( !this.args.dryrun && this.isSubStageIncluded( 'changelog' ) ) {

                // returns
                if (
                    ! await this.nc.prompt.bool( {
                        ...promptArgs as NodeConsole_Prompt.BoolConfig,
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
            + `## **${ this.pkg.version }** — ${ this.datestamp() }`
            + '\n\n'
            + this.fs.readFile( '.releasenotes.md' ).trim()
            + '\n\n\n';

        // returns
        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping changelog updates during dryrun...', 1 );

            this.args.debug && this.nc.varDump( { newChangeLogEntry }, {
                clr: this.clr,
                depth: 2 + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            return;
        }

        this.fs.write( 'CHANGELOG.md', (
            this.fs.readFile( 'CHANGELOG.md' )
                .replace( newEntryRegex, escRegExpReplace( newChangeLogEntry ) )
        ), { force: true } );
    }

    protected async package() {

        const pkg = new Package( {
            ...this.args as Package.Args,

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

            this.args.debug && this.nc.varDump( { gitCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 3 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {

            this.args.debug && this.nc.varDump( { gitCmd }, {
                clr: this.clr,
                depth: 2 + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            this.cmd( gitCmd );
            this.cmd( `git tag -a -f ${ this.pkg.version } -m "release: ${ this.pkgVersion }"` );
            this.cmd( `git push --tags || echo ''` );

            this.verboseLog( 'pushing to origin...', 2 );
            this.cmd( 'git push' );
        }
    }

    protected async github() {
        this.progressLog( 'publishing to github...', 1 );


        this.verboseLog( 'updating repo metadata...', 2 );
        const repoUpdateCmd = `gh repo edit ${ this.nc.cmdArgs( {
            description: this.pkg.description,
            homepage: this.pkg.homepage,
        }, false, false ) }`;

        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping repo updates during dryrun...', 3 );

            this.args.debug && this.nc.varDump( { repoUpdateCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 4 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {
            this.cmd( repoUpdateCmd );
        }


        this.verboseLog( 'creating github release...', 2 );

        const releaseAttachment = `"${ this.releasePath.replace( /\/*$/g, '' ) + '.zip' }#${ this.pkg.name }@${ this.pkgVersion }"`;

        const releaseCmd = `gh release create ${ this.pkgVersion } ${ releaseAttachment } ${ this.nc.cmdArgs( {
            draft: true,
            'notes-file': '.releasenotes.md',
            title: `${ this.pkgVersion } — ${ this.datestamp() }`,
        }, false, false ) }`;

        if ( this.args.dryrun ) {
            this.verboseLog( 'skipping github release during dryrun...', 3 );

            this.args.debug && this.nc.varDump( { releaseCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 4 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

        } else {

            this.args.debug && this.nc.varDump( { releaseCmd }, {
                clr: this.clr,
                depth: ( this.args.verbose ? 3 : 2 ) + ( this.args[ 'log-base-level' ] ?? 0 ),
                maxWidth: null,
            } );

            this.cmd( releaseCmd );
        }
    }

    protected async tidy() {
        this.progressLog( 'tidying up...', 1 );

        if ( !this.args.dryrun ) {
            this.verboseLog( 'resetting release notes...', 2 );
            this.fs.write( '.releasenotes.md', [
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

export namespace Release {

    export type Args = AbstractStage.Args<Release.Stages> & Package.Args & {

        'only-pkg'?: Package.Stages | Package.Stages[];
        'without-pkg'?: Package.Stages | Package.Stages[];
    };

    export type Stages = typeof releaseSubStages[ number ];
}