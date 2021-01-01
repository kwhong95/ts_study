function func1(a: number, b: number | string) {
  const v1: number | string = a;
  const v2: number = b; // Error 1
}
function func2(a: 1 | 2) {
  const v1: 1 | 3 = a; // Error 2
  const v2: 1 | 2 | 3 = a;
}