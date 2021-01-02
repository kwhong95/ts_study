export {};

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;

interface Person {
  name: string;
  age: number;
}
type T1 = Overwrite<Person, { age: string; nation: string }>;
const p: T1 = {
  name: 'mike',
  age: '23',
  nation: 'korean',
};
