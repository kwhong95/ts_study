export {};

interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface American extends Person {
  liveInNewYork: boolean;
}

const p1: Person = { name: 'mike', age: 23 };
const p2: Korean = { name: 'mike', age: 25, liveInSeoul: true };
const p3: American = { name: 'mike', age: 27, liveInNewYork: false };
const arr1 = [p1, p2, p3];
const arr2 = [p2, p3];
