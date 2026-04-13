---
title: Changelog
category: Docs
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


## **2.0.0-beta.2** — 2026-03-04

### Removed
- Removed abstract class AbstractConfigurableClass

### Moved & Renamed
- Moved node exports to their own entry point
- Moved type exports to their own entry point
- Removed namespaces (Types, classes, functions) from main exports
- Removed Json, Debug, Objects namespaces from types export

### Added
- New functions (mostly brought over from
  [utility-sass](https://github.com/maddimathon/utility-sass) and
  [design-system-utilities](https://github.com/maddimathon/design-system-utilities)):
    - {@link hasIterator}
    - {@link makeNumber}
    - {@link makeNumberAsync}
    - {@link mapToObject}
    - {@link mapToObjectAsync}
    - {@link objectFlatten}
    - {@link objectFlattenAsync}
    - {@link objectKeySort}
    - {@link objectKeySortAsync}
    - {@link objectMap}
    - {@link objectMapAsync}


## **2.0.0-beta.1** — 2025-10-31

Some quick updates needed for other libraries.

### Added
- Added {@link isObjectEmpty} function
- Added {@link mergeArgsAsync} function
- Added mergeArrays param to {@link mergeArgs} and {@link mergeArgsAsync} (default false)

### Fixed
- Fixed the display of Map and Set in {@link VariableInspector} (temp ugly fix)


## **2.0.0-beta** — 2025-06-09

External testing complete, upgrading to beta.


## **2.0.0-alpha.1** — 2025-06-09

### Fixed
- Added {@link NodeFiles.exists} checks to {@link NodeFiles.copyFile}, 
  {@link NodeFiles.mkdir}, {@link NodeFiles.readDir}, {@link NodeFiles.readFile}
- Fixed {@link NodeFiles.mkdir} to be recursive by default


## **2.0.0-alpha** — 2025-06-09

### Renamed & Moved
- {@link AbstractBuildStage.runStage} changed name to {@link AbstractBuildStage.runSubStage}
- Meta type namespace was changed to Debug
- NodeFiles methods:
    - {@link NodeFiles.deleteFiles} → {@link NodeFiles.delete}
    - {@link NodeFiles.writeFiles} → {@link NodeFiles.write}
- NodeFiles types:
    - {@link NodeFiles.Args.copyFileArgs} → {@link NodeFiles.Args.copyFile}
    - {@link NodeFiles.Args.readDirArgs} → {@link NodeFiles.Args.readDir}
    - {@link NodeFiles.Args.readFileArgs} → {@link NodeFiles.Args.readFile}
    - {@link NodeFiles.Args.writeFileArgs} → {@link NodeFiles.Args.writeFile}
- The following type namespaces’ contents are now global: 
    - Arrays, Functions, Node, StringLiterals

### Removed
- Removed distinguishArrays option from {@link typeOf} and removed {@link typeOf} args
  completely (now empty)
- compileTypescript() method from {@link AbstractStage} (in build scripts)
- abstractArgs() static method from {@link AbstractConfigurableClass}
- abstractArgs() static method from {@link AbstractBuildStage}
- NodeFunctions class removed
- Functions class removed
- Types:
    - mergeArgs namespace
    - MergeObjects
    - Node namespace (now had no contents)
    - NodeConsole.CmdErrorHandler

### Misc. Breaking
- {@link NodeConsole.prompt} is now an instance of {@link NodeConsole_Prompt} and not a method

### Added
- {@link AbstractConfigurableClass} method - {@link AbstractConfigurableClass.valueOf}
- {@link NodeFiles} methods (untested):
    - {@link basename}
    - {@link copyFile}
    - {@link dirname}
    - {@link exists}
    - {@link getStats}
    - {@link isDirectory}
    - {@link isFile}
    - {@link isSymLink}
    - {@link mkdir}
    - {@link readDir}
- Additional {@link NodeConsole_Prompt} and {@link NodeConsole_Error} classes
- Basic testing for {@link NodeConsole.prompt} (including types)
- Added cmd method to {@link AbstractStage} (in build scripts) - better error handling
- Types:
    - Json namespace with common schemas - TsConfig, PackageJson
    - {@link Classify} (with tests)
    - {@link RecursiveRequired} (with tests)
    - {@link KeysOptional} & {@link KeysRequired} (with tests)
    - {@link PartialExcept} & {@link RecursivePartialExcept} (with tests)
    - {@link RequiredPartially} & {@link RecursiveRequiredPartially} (with tests)

### Changed
- {@link NodeConsole} - Better errors and error handling (incluing prompt timeouts and
  <kbd>cntl<kbd> + <kbd>C<kbd>)
- Added constructor params optional param to {@link AnyClass} type
- Improved documentation
- Improved {@link Classify} type

### Fixed
- Corrected vulnerable outdated inherited dependencies — cross-spawn, lodash,
  minimatch
- {@link MessageMaker} - default node painter now checks for the existance of
  process.stdout.getColorDepth function
- Added tests {@link Test} types namespace


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
- {@link AbstractBuildStage} new method - {@link AbstractBuildStage.isSubStageIncluded}


## **0.4.0** — 2025-05-04

### Added
- Added {@link AbstractBuildStage} - and updated build scripts accordingly
- Added object type - {@link MergeObjects} - allows prettier types for merged objects
  (e.g., in mergeArgs())

### Changed
- Moved {@link AbstractStage} (build script) properties to {@link AbstractBuildStage} - fns,
  stages
- Moved {@link AbstractStage} (build script) methods to {@link AbstractBuildStage} -
  {@link AbstractBuildStage.buildArgs}, {@link AbstractBuildStage.msgArgs}, 
  {@link AbstractBuildStage.progressLog}, {@link AbstractBuildStage.run}, 
  {@link AbstractBuildStage.runStage}, {@link AbstractBuildStage.startEndNotice}, 
  {@link AbstractBuildStage.verboseLog}

### Fixed
- Slight improvements to {@link mergeArgs} typing

### Removed
- Removed replace-in-files-cli dependency and updated {@link AbstractStage} with custom
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


