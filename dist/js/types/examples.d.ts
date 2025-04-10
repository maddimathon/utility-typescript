/**
 * @package @maddimathon/template-npm-library@tmpl-1.1.0
 * @since tmpl-1.1.0
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/template-npm-library@tmpl-1.1.0
 * @license MIT
 */
/**
 * An example type for testing TypeDoc and similar systems.
 *
 * @category Category B
 *
 * @privateRemarks
 * Notes not included in the documentation.
 */
export type ExampleType = "hello";
/**
 * An example type for testing TypeDoc and similar systems.
 *
 * @category Category B
 * @interface
 */
export type ExampleObjectType = {
    one: string;
    comment: "this type alias gets converted to an interface by TypeDoc";
};
/**
 * An example interface for testing TypeDoc and similar systems.
 *
 * @category Category A
 */
export interface ExampleInterface {
    method: () => void;
    optionalProp?: null | number | string;
    stringProp: string;
}
//# sourceMappingURL=examples.d.ts.map