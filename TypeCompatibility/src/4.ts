export {};

type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => number | string;
let f1 : F1 = (a, b) => `${a} ${b.length}`;
let f2 : F2 = (a, b) => `${a} ${b}`;
let f3 : F3 = a => `${a}`;
let f4 : F4 = a => (a < 10 ? a: 'too big');

// 매개변수 개수가 많은 경우
f1 = f3;
f3 = f1; // Type Error!

f1 = f2;
f2 = f1; // Type Error!

f4 = f3;
f3 = f4; // Type Error!