export {};

interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
function print(value: Product | Product) {
  if (value instanceof Person) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}