export {};

type ReturnType<T> = T extends (...arg: any[]) => infer R ? R : any;
type T1 = ReturnType<() => string>;
function f1(s: string): number {
  return s.length;
}
type T2 = ReturnType<typeof f1>;