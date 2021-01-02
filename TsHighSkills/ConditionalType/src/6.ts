export {};

type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = StringPropertyNames<Person>;

// interface Person2 {
//   name: 'name';
//   age: never; 제외 되는 부분
//   nation: 'nation';
// }

type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T2 = StringProperties<Person>;