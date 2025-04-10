<!--README_HEADER-->
# Utility TypeScript @ tmpl-1.1.0-draft
<!--/README_HEADER-->

<!--CURRENT_DESC-->
TypeScript utilities (types, functions, classes) to use in various node/npm projects.
<!--/CURRENT_DESC-->

Probably not best to use in production/client-side without a bundler (and
including only the required exports) to avoid bulk and inefficiency.

<a href="___CURRENT_URL___/modules.html" class="button">See the exports</a>



## Install

```sh
npm i -D github:maddimathon/utility-typescript
```


## Development

This library is maintained by [Maddi Mathon](https://www.maddimathon.com).


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

To include the source code in documentation, add the `@source` block tag.

#### Unit Testing

Unit tests are written in the source but run after compile and minimize (via
`Build` or `Test` script).  Tests should be written in a file with the same path
but with `.test` added before the extension — e.g., `myFunction.ts` is tested by
`myFunction.test.ts`.

#### TypeScript

Every subdirectory should have its own `index.ts` that re-exports the contents
of its files.