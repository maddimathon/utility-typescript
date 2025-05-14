/**
 * Utility types for build process scripts.
 * 
 * @package @maddimathon/utility-typescript
 * @author Maddi Mathon (www.maddimathon.com)
 */

import { GlobOptions } from 'glob';

import pkg from '../../package.json';

export type PackageJson = typeof pkg;