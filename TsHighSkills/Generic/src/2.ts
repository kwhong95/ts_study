export {};

function makeArray(defaultValue: number, size: number): number[];
function makeArray(defaultValue: string, size: number): string[];
function makeArray(
  defaultValue: number | string,
  size: number | string,
): Array<number | string> {
  const arr: Array<number | string> = [];
  for (let i = 0; i < size; i ++) {
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeArray(1, 10);
const arr2 = makeArray('empty', 10);
