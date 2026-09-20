/**
 * @since 0.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@2.0.0-beta.6
 * @license MIT
 */
/**
 * Turns the given slug into a string with only a-z, 0-9, and hyphens.
 *
 * @category Functions – String
 *
 * @param input  String to convert.
 *
 * @return  Slug version of the input string.
 *
 * @since 0.1.0
 * @since 2.0.0-beta.3 — Added optional args param.
 *
 * @source
 */
export function slugify(input, args = {}) {
    const { allowRepeatDashes = false, allowUnderscores = false, } = args;
    const allowRepeatUnderscores = args.allowRepeatUnderscores ?? allowRepeatDashes;
    let slug = input.toLowerCase();
    // replace accented letters
    slug = slug.replace(/(À|Á|Â|Ä|Ã|Æ|Å|Ā|à|á|â|ä|ã|æ|å|ā)/gi, 'a');
    slug = slug.replace(/(È|É|Ê|Ë|Ē|Ė|Ę|è|é|ê|ë|ē|ė|ę)/gi, 'e');
    slug = slug.replace(/(Î|Ï|Í|Ī|Į|Ì|î|ï|í|ī|į|ì)/gi, 'i');
    slug = slug.replace(/(Ô|Ö|Ò|Ó|Œ|Ø|Ō|Õ|ô|ö|ò|ó|œ|ø|ō|õ)/gi, 'o');
    slug = slug.replace(/(Û|Ü|Ù|Ú|Ū|û|ü|ù|ú|ū)/gi, 'u');
    slug = slug.replace(/(Ñ|Ń|ñ|ń)/gi, 'n');
    // change ampersands to 'and'
    slug = slug.replace(/(\s)&+(\s)/gi, '$1and$2');
    // remove non-letters & non-digits (except spaces & some punctuation, 
    // which will become dashes)
    slug = slug.replace(/[^\s|a-z|\d|\n|\-|–|—|_|\:|\;|\/]+/gi, '');
    // and now everything else is a dash!
    if (allowUnderscores) {
        slug = slug.replace(/[^\d|a-z|_]+/gi, '-');
    }
    else {
        slug = slug.replace(/[^\d|a-z]+/gi, '-');
    }
    // remove leading/trailing "whitespace"
    slug = slug.replace(/(^[\n|\s|\-|_]+|[\n|\s|\-|_]+$)/gi, '');
    // remove multi-dashes
    if (!allowRepeatDashes) {
        slug = slug.replace(/-+/gi, '-');
    }
    // remove multi-underscores
    if (allowUnderscores && !allowRepeatUnderscores) {
        slug = slug.replace(/_+/gi, '_');
    }
    return slug;
}
