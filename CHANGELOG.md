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


## **2.0.0-alpha** — 2025-06-09

### Renamed & Moved
- AbstractBuildStage.runStage() changed name to runSubStage()
- Meta type namespace was changed to Debug
- NodeFiles methods:
    - deleteFiles() → delete()
    - writeFiles() → write()
- NodeFiles types:
    - NodeFiles.Args.copyFileArgs → NodeFiles.Args.copyFile
    - NodeFiles.Args.readDirArgs → NodeFiles.Args.readDir
    - NodeFiles.Args.readFileArgs → NodeFiles.Args.readFile
    - NodeFiles.Args.writeFileArgs → NodeFiles.Args.writeFile
- The following type namespaces’ contents are now global: 
    - Arrays, Functions, Node, StringLiterals

### Removed
- Removed distinguishArrays option from typeOf() and removed typeOf args
  completely (now empty)
- compileTypescript() method from AbstractStage (in build scripts)
- abstractArgs() static method from AbstractConfigurableClass
- abstractArgs() static method from AbstractBuildStage
- NodeFunctions class removed
- Functions class removed
- Types:
    - mergeArgs namespace
    - MergeObjects
    - Node namespace (now had no contents)
    - NodeConsole.CmdErrorHandler

### Misc. Breaking
- NodeConsole.prompt is now an instance of NodeConsole_Prompt and not a method

### Added
- AbstractConfigurableClass method - valueOf()
- NodeFiles methods (untested):
    - basename()
    - copyFile()
    - dirname()
    - exists()
    - getStats()
    - isDirectory()
    - isFile()
    - isSymLink()
    - mkdir()
    - readDir()
- Additional NodeConsole_Prompt and NodeConsole_Error classes
- Basic testing for NodeConsole.prompt (including types)
- Added cmd method to AbstractStage (in build scripts) - better error handling
- Types:
    - Json namespace with common schemas - TsConfig, PackageJson
    - Classify (with tests)
    - RecursiveRequired (with tests)
    - KeysOptional & KeysRequired (with tests)
    - PartialExcept & RecursivePartialExcept (with tests)
    - RequiredPartially & RecursiveRequiredPartially (with tests)

### Changed
- NodeConsole - Better errors and error handling (incluing prompt timeouts and
  <kbd>cntl<kbd> + <kbd>C<kbd>)
- Added constructor params optional param to AnyClass type
- Improved documentation
- Improved Classify type

### Fixed
- Corrected vulnerable outdated inherited dependencies — cross-spawn, lodash,
  minimatch
- MessageMaker - default node painter now checks for the existance of
  process.stdout.getColorDepth function
- Added tests Test types namespace


## **1.0.0** — 2025-05-10

First full release!

### Breaking
- Changed ts output directory from `dist/js` to `dist`


## **0.4.4** — 2025-05-10

### Fixed
- Some exports for subpaths were missing the `js/` subfolder in `dist/`
- Release script was replacing the placeholders in the replacement script


## **0.4.3** — 2025-05-08

### Changed
- Minor build script improvements

### Fixed
- Fixed @inquirer/prompts dependency (was erroneously in devDependencies)
- Snapshot stage's files weren't limited to files only, which slowed it
  significantly


## **0.4.2** — 2025-05-04

### Added
- AbstractBuildStage new method - isSubStageIncluded()


## **0.4.0** — 2025-05-04

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


## **0.3.0** — 2025-05-04

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


## **0.2.0** — 2025-05-02

### Added
- NodeFiles class for paths & files within node
- NodeFiles methods - changeBaseName(), pathRelative(), pathResolve(), uniquePath()

### Changed
- Removed minimize in Build script — seemed to be causing occasaional issues


## **0.1.2** — 2025-05-02

Final quick fix and test to package publishing.


## **0.1.1** — 2025-05-02

Trying to fix npm publish workflow.


## **0.1.0** — 2025-05-02

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


