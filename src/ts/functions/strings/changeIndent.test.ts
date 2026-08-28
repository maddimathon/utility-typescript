/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import { describe, expect, test } from '@jest/globals';

import { changeIndent } from './changeIndent.js';

const json_2 = `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "alwaysStrict": true,
    "composite": true,
    "declaration": true,
    "declarationMap": false,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedDeclarations": true,
    "isolatedModules": true,
    "module": "ES2022",
    "noErrorTruncation": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "../../dist/ts/",
    "preserveSymlinks": true,
    "pretty": true,
    "removeComments": false,
    "resolveJsonModule": true,
    "rootDir": "./",
    "skipLibCheck": true,
    "sourceMap": false,
    "strict": true,
    "strictBindCallApply": true,
    "strictBuiltinIteratorReturn": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "target": "ES2017",
    "useUnknownInCatchVariables": true,
    "verbatimModuleSyntax": true
  },
  "exclude": [
    "./node_modules/**/*"
  ],
  "include": [
    "../../src/ts/**/*",
    "./src/ts/**/*"
  ]
}`;

const json_4 = `{
    "$schema": "https://json.schemastore.org/tsconfig",
    "compilerOptions": {
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "alwaysStrict": true,
        "composite": true,
        "declaration": true,
        "declarationMap": false,
        "exactOptionalPropertyTypes": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedDeclarations": true,
        "isolatedModules": true,
        "module": "ES2022",
        "noErrorTruncation": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitAny": true,
        "noImplicitOverride": true,
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noPropertyAccessFromIndexSignature": true,
        "noUncheckedIndexedAccess": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "outDir": "../../dist/ts/",
        "preserveSymlinks": true,
        "pretty": true,
        "removeComments": false,
        "resolveJsonModule": true,
        "rootDir": "./",
        "skipLibCheck": true,
        "sourceMap": false,
        "strict": true,
        "strictBindCallApply": true,
        "strictBuiltinIteratorReturn": true,
        "strictFunctionTypes": true,
        "strictNullChecks": true,
        "strictPropertyInitialization": true,
        "target": "ES2017",
        "useUnknownInCatchVariables": true,
        "verbatimModuleSyntax": true
    },
    "exclude": [
        "./node_modules/**/*"
    ],
    "include": [
        "../../src/ts/**/*",
        "./src/ts/**/*"
    ]
}`;

const css_2 = `:root {
  font-weight: 400;
  line-height: var(--line-height-400, 1.6875);
  background: var(--sys-clr-background, Canvas);
  color: var(--sys-clr-text, CanvasText);
}
@media (max-width: 24.99em) {
  :root {
    hyphens: auto;
  }
}`;

const css_4 = `:root {
    font-weight: 400;
    line-height: var(--line-height-400, 1.6875);
    background: var(--sys-clr-background, Canvas);
    color: var(--sys-clr-text, CanvasText);
}
@media (max-width: 24.99em) {
    :root {
        hyphens: auto;
    }
}`;

const scss_2 = `@mixin snippet-support-focus-ring {
  %focus-ring--fallback {
    /* %focus-ring--fallback */
    @include snippet-focus-ring;
  }

  %focus-ring--where {
    /* %focus-ring--where */
    @include snippet-focus-ring;
  }

  %focus-ring--visible {
    /* %focus-ring--visible */
    @include snippet-focus-ring;
  }

  %focus-ring {
    /* %focus-ring */
    @include snippet-focus-ring;
  }
}`;

const scss_4 = `@mixin snippet-support-focus-ring {
    %focus-ring--fallback {
        /* %focus-ring--fallback */
        @include snippet-focus-ring;
    }

    %focus-ring--where {
        /* %focus-ring--where */
        @include snippet-focus-ring;
    }

    %focus-ring--visible {
        /* %focus-ring--visible */
        @include snippet-focus-ring;
    }

    %focus-ring {
        /* %focus-ring */
        @include snippet-focus-ring;
    }
}`;

describe( 'changeIndent', () => {
    test( 'empty test', () => {
        expect( changeIndent( '', 2, 4 ) ).toBe( '' );
    } );

    test( 'json test 2 => 4', () => expect( changeIndent( json_2, 2, 4 ) ).toBe( json_4 ) );
    test( 'json test 4 => 2', () => expect( changeIndent( json_4, 4, 2 ) ).toBe( json_2 ) );

    test( 'css test 2 => 4', () => expect( changeIndent( css_2, 2, 4 ) ).toBe( css_4 ) );
    test( 'css test 4 => 2', () => expect( changeIndent( css_4, 4, 2 ) ).toBe( css_2 ) );

    test( 'scss test 2 => 4', () => expect( changeIndent( scss_2, 2, 4 ) ).toBe( scss_4 ) );
    test( 'scss test 4 => 2', () => expect( changeIndent( scss_4, 4, 2 ) ).toBe( scss_2 ) );
} );