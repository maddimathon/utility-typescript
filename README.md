---
title: ReadMe
---

<!--README_HEADER-->
# Utility TypeScript @ 1.0.0-draft
<!--/README_HEADER-->

<!--README_DESC-->
TypeScript utilities (types, functions, classes) to use in various node/npm projects.
<!--/README_DESC-->

Probably not best to use in production/client-side without a bundler (and
including only the required exports) to avoid bulk and inefficiency.

The library aims to be pretty configurable, but it's definitely targeted towards
my personal needs/preferences rather than developers in general.



## Install

```sh
npm i -D github:maddimathon/utility-typescript
```


## Use

For an overview of all exported items, including types, see the documentation below.

<!--README_DOCS_CTA-->
<a href="https://maddimathon.github.io/utility-typescript" class="button" target="_blank">Read Documentation</a>
<!--/README_DOCS_CTA-->


### Exports & Entry Points

There are four defined entry points, including the root, though it should be
possible to target individual files (carefully and at your own risk, paths may
change without being considered a breaking change). The root entry point exports
the other entry points as modules.

```ts
import {
    type Types,
    classes,
    functions,
} from '@maddimathon/utility-typescript';

import type { ... } from '@maddimathon/utility-typescript/types';

import { ... } from '@maddimathon/utility-typescript/classes';
import { ... } from '@maddimathon/utility-typescript/functions';
```


## Development

This library is maintained by [Maddi Mathon](https://www.maddimathon.com) and is
currently unlikely to accept other contributions.


### Coding Practices

Each file that defines items/exports should limit its exports to one item and
its associated types, if applicable.  Occasionally (and judiciously), it may
make more sense to define a small number of closely-related items in the same
file.

#### Documentation

Documentation is good and helpful.  The docs website for this package is mostly
auto-generated from block comments and typing in the source.  Keeping the readme
and changelog up to date is also important.

##### TypeDoc

Documentation for the included JavaScript is generated from the TypeScript types
and block comments in the source.  Every new addition should be thoroughly
documented from the start.

To include the source code in documentation, add the `@source` block tag (uses
[typedoc-plugin-inline-sources](https://www.npmjs.com/package/typedoc-plugin-inline-sources)).

#### Unit Testing

Unit tests are written in the source but run after compile and minimize (via
`Build` or `Test` script).  Tests should be written in a file with the same path
but with `.test` added before the extension — e.g., `myFunction.ts` is tested by
`myFunction.test.ts`.

#### TypeScript

Every subdirectory should have its own `index.ts` that re-exports the contents
of its files.



## License

This mini-library uses the [MIT license](LICENSE.md).  Please read and understand
the license — I promise it’s short!