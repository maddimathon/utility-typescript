/**
 * @since ___PKG_VERSION___
 * 
 * @packageDocumentation
 */
/**
 * @package @maddimathon/utility-typescript@___CURRENT_VERSION___
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

type TestLangs = "de" | "en" | "fr";

type TestLangLocales = TestLangs | "de-AT" | "de-CH" | "de-DE" | "de-DE"
    | "en-AU" | "en-AU" | "en-CA" | "en-GB" | "en-IE" | "en-IN" | "en-IN"
    | "en-NZ" | "en-US" | "en-ZA" | "fr-BE" | "fr-CA" | "fr-CH" | "fr-FR";

export type T_LangLocaleCode = [
    Test.Expect<Test.Exactly<LangLocaleCode, LangLocaleCode<LangCode>>>,
    Test.Expect<Test.Exactly<TestLangLocales, LangLocaleCode<TestLangs>>>,

    Test.ExpectNot<Test.Exactly<LangLocaleCode, LangLocaleCode<TestLangs>>>,
];