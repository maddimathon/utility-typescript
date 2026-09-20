/**
 * @since 2.0.0-beta.6
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
/**
 * Utilities for working with TypeDoc.
 *
 * @since 2.0.0-beta.6
 */
export declare namespace TypeDocUtils {
    /**
     * @since 2.0.0-beta.6
     */
    namespace Mappings {
        /**
         * @since 2.0.0-beta.6
         */
        const global: {
            Error: string;
            'Error.cause': string;
            'Error.name': string;
            'Object.entries': string;
            'Object.fromEntries': string;
            Promise: string;
            RegExp: string;
        };
        /**
         * @since 2.0.0-beta.6
         */
        const sass: {
            CustomFunction: string;
            Logger: string;
            NodePackageImporter: string;
            Options: string;
            SassBoolean: string;
            SassCalculation: string;
            SassColor: string;
            SassFunction: string;
            SassList: string;
            SassMap: string;
            SassMixin: string;
            SassNumber: string;
            SassString: string;
            StringOptions: string;
            Value: string;
        };
        /**
         * Mappings for typescript types and global JS objects.
         *
         * @since 2.0.0-beta.6
         */
        const typescript: {
            Awaited: string;
            Capitalize: string;
            ConstructorParameters: string;
            Exclude: string;
            Extract: string;
            InstanceType: string;
            Lowercase: string;
            NoInfer: string;
            NonNullable: string;
            Omit: string;
            OmitThisParameter: string;
            Parameters: string;
            Partial: string;
            Pick: string;
            Record: string;
            Required: string;
            ReturnType: string;
            ThisParameterType: string;
            ThisType: string;
            Uncapitalize: string;
            Uppercase: string;
        };
        /**
         * Mappings dependees can use for this library.
         *
         * @since 2.0.0-beta.6
         */
        const utilityTypescript: {
            arrayUnique: string;
            deleteUndefinedProps: string;
            hasIterator: string;
            isObjectEmpty: string;
            mapFlatten: string;
            mapFlattenAsync: string;
            mapToObject: string;
            mapToObjectAsync: string;
            mergeArgs: string;
            mergeArgsAsync: string;
            typeOf: string;
            MessageMaker: string;
            'MessageMaker.BulkMsgs': string;
            'MessageMaker.Colour': string;
            'MessageMaker.MsgArgs': string;
            'MessageMaker.BulkMsgArgs': string;
            MiniConsole: string;
            VariableInspector: string;
        };
        /**
         * Mappings dependees can use for this library's node module.
         *
         * @since 2.0.0-beta.6
         */
        const utilityTypescript_node: {
            NodeConsole: string;
            NodeFiles: string;
            'NodeFiles.Args': string;
            'NodeFiles.CopyFileArgs': string;
            'NodeFiles.ReadDirArgs': string;
            'NodeFiles.ReadFileArgs': string;
            'NodeFiles.WriteFileArgs': string;
        };
        /**
         * Mappings dependees can use for this library's types module.
         *
         * @since 2.0.0-beta.6
         */
        const utilityTypescript_types: {
            Classify: string;
            RecursivePartial: string;
            RecursiveRequired: string;
        };
    }
}
