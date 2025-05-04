/**
 * Utility types for build process scripts.
 * 
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 */

import { GlobOptions } from 'glob';

import pkg from '../../package.json';

export * from '../../src/ts/types/index.ts';

export abstract interface ArgsObject<Value = ArgsSingleValue> {
    [ key: number | string ]: ArgsObject<Value> | Value | ( ArgsObject<Value> | Value )[];
};

export type ArgsSingleValue =
    | boolean
    | Function
    | Intl.DateTimeFormatOptions
    | GlobOptions
    | number
    | null
    | string
    | undefined;

export type ColourSlug =
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "blue"
    | "purple"
    | "pink"
    | "grey"
    | "white"
    | "black";

export type PackageJson = typeof pkg;