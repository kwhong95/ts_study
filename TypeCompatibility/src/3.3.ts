export {};

interface Person {
  name: string;
  age?: number;
}

interface Product {
  name: string;
  age: number;
}

const obj = {
  name: 'mike'
}

const person: Person = obj;
const product: Product = obj; 