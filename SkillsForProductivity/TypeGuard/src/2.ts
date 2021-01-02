export {};

class Person {
  name!: string;
  age!: number;
  constructor(name: string, age: number) {
  }
}

class Product {
  name!: string;
  price!: number;
  constructor(name: string, price: number) {

  }
}

function print(value: Person | Product) {
  console.log(value.name);
  if(value instanceof Person) { //error
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}