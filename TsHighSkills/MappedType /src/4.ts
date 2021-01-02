export {};

interface Person {
  name: string;
  age: number;
}

type T1 = Person['name'];
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type T2 = Partial<Person>;
type T3 = Readonly<Person>;