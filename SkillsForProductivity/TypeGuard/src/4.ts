export {};

// discriminated union

interface Person {
  type: 'a';
  name: string;
  age: number;
}
interface Product {
  type: 'b';
  name: string;
  price: number;
}
function print(value: Person | Product) {
  if (value.type === 'a') {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}