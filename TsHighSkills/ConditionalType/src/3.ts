export {};

type T1 = number | string | never;
type Exclude<T, U> = T extends U ? never : T;
type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>;
type T3 = Exclude<string | number | (() => void), Function>;
type Extract<T, U> = T extends U ? T : never;
type T4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>;
