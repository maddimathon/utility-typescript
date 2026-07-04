/**
 * @since 0.1.0
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from '../test.js';

import type {
    LangCode,
    LangLocaleCode,
} from './html.js';

type P__Langs = "de" | "en" | "fr";

type R__Locales = P__Langs | "de-AT" | "de-CH" | "de-DE" | "de-DE"
    | "en-AU" | "en-AU" | "en-CA" | "en-GB" | "en-IE" | "en-IN" | "en-IN"
    | "en-NZ" | "en-US" | "en-ZA" | "fr-BE" | "fr-CA" | "fr-CH" | "fr-FR";

export type T_LangLocaleCode = [
    // testing that the default type param is equivolent to LangCode
    Test.Expect<Test.Exactly<LangLocaleCode, LangLocaleCode<LangCode>>>,

    // testing restriction of the languages to return locales
    Test.Expect<Test.Exactly<LangLocaleCode<P__Langs>, R__Locales>>,

    // making sure that a type param actually alters the type
    Test.ExpectNot<Test.Exactly<LangLocaleCode, LangLocaleCode<"en">>>,
    Test.ExpectNot<Test.Exactly<LangLocaleCode, LangLocaleCode<P__Langs>>>,
];