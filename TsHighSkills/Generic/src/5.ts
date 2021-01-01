export {};
// A extends B : A가 B에 할당 가능해야 한다.
function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity('a');
// identity([]);
// identity(true);
