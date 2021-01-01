export {};

interface Person {
  name: string;
}
interface Product {
  name: string;
  age: number;
}
const obj = { name: 'mike', age: '23' , city: 'abc' };
let person: Person = obj;
let product: Product = obj;
// product = person;
// person = product;