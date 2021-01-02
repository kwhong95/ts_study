export {};

type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string | number>;
type T2 = IsStringType<string> | IsStringType<number>;

type Array2<T> = Array<T>;
type T3 = Array2<string | number>;
