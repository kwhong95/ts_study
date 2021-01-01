export {};

interface Person {
  name: string;
  age: number;
}

function swapProperty<T extends Person, K extends keyof Person>(
  p1: T,
  p2: T,
  key: K,
): void {
  const temp = p1[key];
  p1[key] = p2[key];
  p2[key] = temp;
}

interface Product {
  name: string;
  price: number;
}

const p1: Product = {
  name: '시계',
  price: 1000,
};
const p2: Product = {
  name: '자전거',
  price: 2000,
};
swapProperty(p1, p2, 'name');