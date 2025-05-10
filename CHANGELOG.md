---
title: Changelog
---

# Utility TypeScript Changelog

All notable changes to this project will be documented in this file after/on
each release.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to 
[Semantic Versioning](https://semver.org/spec/v2.0.0.html), i.e.:
> Given a version number [MAJOR].[MINOR].[PATCH], increment the:
> - [MAJOR] version when you make incompatible changes
> - [MINOR] version when you add backwards-compatible functionality
> - [PATCH] version when you make backwards-compatible bug fixes


<!--CHANGELOG_NEW-->


## **1.0.0** -- 2025-05-10

First full release!

### Breaking
- Changed ts output directory from `dist/js` to `dist`


## **0.4.4** -- 2025-05-10

### Fixed
- Some exports for subpaths were missing the `js/` subfolder in `dist/`
- Release script was replacing the placeholders in the replacement script


## **0.4.3** -- 2025-05-08

### Changed
- Minor build script improvements

### Fixed
- Fixed @inquirer/prompts dependency (was erroneously in devDependencies)
- Snapshot stage's files weren't limited to files only, which slowed it
  significantly


## **0.4.2** -- 2025-05-04

### Added
- AbstractBuildStage new method - isSubStageIncluded()


## **0.4.0** -- 2025-05-04

### Added
- Added AbstractBuildStage - and updated build scripts accordingly
- Added object type - MergeObjects - allows prettier types for merged objects
  (e.g., in mergeArgs())

### Changed
- Moved AbstractStage (build script) properties to AbstractBuildStage - fns,
  stages
- Moved AbstractStage (build script) methods to AbstractBuildStage -
  buildArgs(), msgArgs(), progressLog(), run(), runStage(), startEndNotice(),
  verboseLog()

### Fixed
- Slight improvements to mergeArgs() typing

### Removed
- Removed replace-in-files-cli dependency and updated AbstractStage with custom
  implementation
- Removed start npm scripts
- Removed browser-sync dev dependency


## **0.3.0** -- 2025-05-04

### Breaking
- Removed BuildFunctions
- Moved BuildFunctions.releasePath and BuildFunctions.pkgVersion to
  AbstractStage
- Moved BuildFunctions methods to AbstractStage - copyFiles(), datestamp(),
  datetimestamp(), glob(), timestamp()
- Moved BuildFunctions.implodeWithIndent() to MessageMaker
- Moved BuildFunctions.cmd() to NodeConsole

### Added
- NodeFiles methods - deleteFiles(), readFile(), writeFile()
- NodeConsole (beta) method - cmdArgs()

### Changed
- NodeFiles.uniquePath() - slight performance improvements

### Fixed
- Minor build script improvements

### Removed
- Removed minify, prettify, catchErrCLI methods from AbstractStage (build
  scripts) - was unused
- Removed hangingIndent methods from BuildFunctions (build scripts) - was
  protected


## **0.2.0** -- 2025-05-02

### Added
- NodeFiles class for paths & files within node
- NodeFiles methods - changeBaseName(), pathRelative(), pathResolve(), uniquePath()

### Changed
- Removed minimize in Build script -- seemed to be causing occasaional issues


## **0.1.2** -- 2025-05-02

Final quick fix and test to package publishing.


## **0.1.1** -- 2025-05-02

Trying to fix npm publish workflow.


## **0.1.0** -- 2025-05-02

**Initial release; everything is new!**
- Set up the template from
  [template-npm-library](https://github.com/maddimathon/template-npm-library)
- Complete build scripts and system, including stages: Compile, Build, Test,
  Document, Snapshot, Package, Release
    - Publishes package to NPM (via GitHub workflow), updates GitHub repo meta,
      and creates a GitHub release
- Automated documentation via TypeDoc
- Testing with Jest and custom utility types

### Classes
- `./abstract` - AbstractConfigurableClass
- Some untested beta classes:
    - Functions, MessageMaker, VariableInspector
    - `./node` - NodeConsole, NodeFunctions

### Functions
- `./arrays` - arrayUnique()
- `./objects` - mergeArgs()
- `./regex` - escRegExp(), escRegExpReplace()
- `./strings` - slugify(), softWrapText(), timestamp(), toTitleCase()
- typeOf()

### Types
- Type submodules: `Arrays`, `Functions`, `Meta`, `Node`, `Objects`,
  `StringLiterals`, `Test`
- Some simple utility types


