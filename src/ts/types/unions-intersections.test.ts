/**
 * @since 2.0.0-alpha
 * 
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-typescript@___CURRENT_VERSION___
 * @license MIT
 */

import type * as Test from './test.js';
import type { MergeObjects, MergeObjectsReplace, MergeObjectsUnion, UnionToIntersection } from './unions-intersections.js';

type Obj1 = {
    a: string;
    b: number[];
    c: number;
};

type Obj2 = {
    a: 12;
    b: string[];
    d: boolean;
};

type Obj_1_2_Merged = {
    a: string | 12;
    b: number[] | string[];
    c: number;
    d: boolean;
};

type Obj_1_2_MergedReplace = {
    a: 12;
    b: string[];
    c: number;
    d: boolean;
};

type Test = MergeObjects<Obj1, Obj2>;

export type T_UnionToIntersection = [

    Test.Expect<Test.Exactly<MergeObjects<{}, {}>, {}>>,
    Test.Expect<Test.Exactly<MergeObjects<Obj1, Obj2>, Obj_1_2_Merged>>,

    Test.Expect<Test.Exactly<MergeObjectsReplace<Obj1, Obj2>, Obj_1_2_MergedReplace>>,

    Test.Expect<Test.Exactly<MergeObjectsUnion<{ a: string; } | { b: number; }>, { a: string; } & { b: number; }>>,
    Test.ExpectNot<Test.Exactly<MergeObjectsUnion<{ a: string; } | number>, { a: string; } & number>>,
    Test.ExpectNot<Test.Exactly<MergeObjectsUnion<2 | number>, number>>,

    // UPGRADE - try to make this return string type instead
    Test.Expect<Test.Exactly<UnionToIntersection<'a' | 'b'>, never>>,
    Test.Expect<Test.Exactly<UnionToIntersection<{ a: string; } | { b: number; }>, { a: string; } & { b: number; }>>,
    Test.Expect<Test.Exactly<UnionToIntersection<{ a: string; } | number>, { a: string; } & number>>,
    Test.Expect<Test.Exactly<UnionToIntersection<2 | number>, number>>,

    Test.ExpectNot<Test.Exactly<UnionToIntersection<{ a: string; } | { b: number; }>, never>>,
];