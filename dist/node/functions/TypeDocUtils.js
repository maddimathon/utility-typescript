/**
 * @since 2.0.0-beta.5.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.5.draft
 * @license MIT
 */
/**
 * Utilities for working with TypeDoc.
 *
 * @since 2.0.0-beta.5.draft
 */
export var TypeDocUtils;
(function (TypeDocUtils) {
    // UPGRADE
    // /**
    //  * Takes the result of a TypeDoc JSON run and converts it to symbol link
    //  * mappings to be used by dependees.
    //  *
    //  * @since 2.0.0-beta.5.draft
    //  */
    // export function generateSymbolLinkMappings(): void { }
    /**
     * @since 2.0.0-beta.5.draft
     */
    let Mappings;
    (function (Mappings) {
        /**
         * @since 2.0.0-beta.5.draft
         */
        Mappings.global = {
            Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
            'Error.cause': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause',
            'Error.name': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name',
            'Object.entries': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries',
            'Object.fromEntries': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries',
            Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
        };
        /**
         * @since 2.0.0-beta.5.draft
         */
        Mappings.sass = {
            CustomFunction: 'https://sass-lang.com/documentation/js-api/types/customfunction/',
            Logger: 'https://sass-lang.com/documentation/js-api/interfaces/logger-1/',
            NodePackageImporter: 'https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/',
            Options: 'https://sass-lang.com/documentation/js-api/interfaces/options/',
            SassBoolean: 'https://sass-lang.com/documentation/js-api/classes/sassboolean/',
            SassCalculation: 'https://sass-lang.com/documentation/js-api/classes/sasscalculation/',
            SassColor: 'https://sass-lang.com/documentation/js-api/classes/sasscolor/',
            SassFunction: 'https://sass-lang.com/documentation/js-api/classes/sassfunction/',
            SassList: 'https://sass-lang.com/documentation/js-api/classes/sasslist/',
            SassMap: 'https://sass-lang.com/documentation/js-api/classes/sassmap/',
            SassMixin: 'https://sass-lang.com/documentation/js-api/classes/sassmixin/',
            SassNumber: 'https://sass-lang.com/documentation/js-api/classes/sassnumber/',
            SassString: 'https://sass-lang.com/documentation/js-api/classes/sassstring/',
            StringOptions: 'https://sass-lang.com/documentation/js-api/interfaces/stringoptions/',
            Value: 'https://sass-lang.com/documentation/js-api/classes/value/',
        };
        /**
         * Mappings for typescript types and global JS objects.
         *
         * @since 2.0.0-beta.5.draft
         */
        Mappings.typescript = {
            Awaited: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype',
            Capitalize: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
            ConstructorParameters: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype',
            Exclude: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers',
            Extract: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union',
            InstanceType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype',
            Lowercase: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
            NoInfer: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype',
            NonNullable: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype',
            Omit: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
            OmitThisParameter: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype',
            Parameters: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype',
            Partial: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
            Pick: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys',
            Record: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
            Required: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype',
            ReturnType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype',
            ThisParameterType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype',
            ThisType: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype',
            Uncapitalize: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
            Uppercase: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types',
        };
        /**
         * Mappings dependees can use for this library.
         *
         * @since 2.0.0-beta.5.draft
         */
        // TODO - finish
        Mappings.utilityTypescript = {
            arrayUnique: 'https://maddimathon.github.io/utility-typescript/arrayUnique.html',
            deleteUndefinedProps: 'https://maddimathon.github.io/utility-typescript/deleteUndefinedProps.html',
            hasIterator: 'https://maddimathon.github.io/utility-typescript/hasIterator.html',
            isObjectEmpty: 'https://maddimathon.github.io/utility-typescript/isObjectEmpty.html',
            mapFlatten: 'https://maddimathon.github.io/utility-typescript/mapFlatten.html',
            mapFlattenAsync: 'https://maddimathon.github.io/utility-typescript/mapFlattenAsync.html',
            mapToObject: 'https://maddimathon.github.io/utility-typescript/mapToObject.html',
            mapToObjectAsync: 'https://maddimathon.github.io/utility-typescript/mapToObjectAsync.html',
            mergeArgs: 'https://maddimathon.github.io/utility-typescript/mergeArgs.html',
            mergeArgsAsync: 'https://maddimathon.github.io/utility-typescript/mergeArgsAsync.html',
            typeOf: 'https://maddimathon.github.io/utility-typescript/typeOf.html',
            MessageMaker: 'https://maddimathon.github.io/utility-typescript/MessageMaker.html',
            'MessageMaker.BulkMsgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/MessageMaker/BulkMsgs.html',
            'MessageMaker.Colour': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/MessageMaker/Colour.html',
            'MessageMaker.MsgArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/MessageMaker/MsgArgs.html',
            'MessageMaker.BulkMsgArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/MessageMaker/BulkMsgArgs.html',
            MiniConsole: 'https://maddimathon.github.io/utility-typescript/MiniConsole.html',
            VariableInspector: 'https://maddimathon.github.io/utility-typescript/VariableInspector.html',
        };
        /**
         * Mappings dependees can use for this library's node module.
         *
         * @since 2.0.0-beta.5.draft
         */
        // TODO - finish
        Mappings.utilityTypescript_node = {
            NodeConsole: 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeConsole.html',
            NodeFiles: 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles.html',
            'NodeFiles.Args': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles/Args.html',
            'NodeFiles.CopyFileArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles/CopyFileArgs.html',
            'NodeFiles.ReadDirArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles/ReadDirArgs.html',
            'NodeFiles.ReadFileArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles/ReadFileArgs.html',
            'NodeFiles.WriteFileArgs': 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/node/NodeFiles/WriteFileArgs.html',
        };
        /**
         * Mappings dependees can use for this library's types module.
         *
         * @since 2.0.0-beta.5.draft
         */
        // TODO - finish
        Mappings.utilityTypescript_types = {
            Classify: 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/types/Classify.html',
            RecursivePartial: 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/types/RecursivePartial.html',
            RecursiveRequired: 'file:///Users/maddi/%E2%80%94%20Local%20Files/Coding%20-%20Local/utility-typescript/docs/types/RecursiveRequired.html',
        };
    })(Mappings = TypeDocUtils.Mappings || (TypeDocUtils.Mappings = {}));
})(TypeDocUtils || (TypeDocUtils = {}));
