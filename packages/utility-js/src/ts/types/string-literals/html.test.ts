/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-js@___CURRENT_VERSION___
 * @license MIT
 */

import type { Test } from '../test.js';

import type {
    LangCode,
    LangLocaleCode,
} from './html.js';

type TestLangs = "de" | "en" | "fr";

type TestLangLocales = TestLangs | "de-AT" | "de-CH" | "de-DE" | "de-DE"
    | "en-AU" | "en-AU" | "en-CA" | "en-GB" | "en-IE" | "en-IN" | "en-IN"
    | "en-NZ" | "en-US" | "en-ZA" | "fr-BE" | "fr-CA" | "fr-CH" | "fr-FR";

type TestLangLocale_WithParam = LangLocaleCode<"de" | "en" | "fr">;

export type T_LangLocaleCode = [
    Test.Expect<Test.Exactly<LangLocaleCode, LangLocaleCode<LangCode>>>,
    Test.Expect<Test.Exactly<TestLangLocales, LangLocaleCode<TestLangs>>>,
    Test.Expect<Test.Exactly<TestLangLocales, TestLangLocale_WithParam>>,

    Test.ExpectNot<Test.Exactly<LangLocaleCode, LangLocaleCode<TestLangs>>>,
];