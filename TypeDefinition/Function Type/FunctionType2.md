# 타입스크립트에서 This의 타입을 정의하는 방법 ( 반드시 JS This 를 숙지할 것 )

## 1. TS 에서 this를 정의하는 방법
> this의 타입을 맨 앞에서 정의할 수 있음, 매개변수는 두 번째 인자부터 적용
```ts
function getParam(this: string, index: number): string {
  const params = this.split(',');
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split(',')[index];
}
```
> JS에 내장된 타입에 기능을 주입하고 싶을 때
```ts
interface String {
  getParam(this.string, index: number): string;
}

String.prototype.getParam = getParam;
console.log('asdf, 1234, ok'.getParam(1));
```
> `interface`는 나중에 자세히 다뤄볼 예정  

- **Object에서의 활용 예제**
```ts
interface Object {
  getShortKeys(this: object): string[];
}

Object.prototype.getShortKeys = function () {
  return Object.keys(this).filter(key => key.length <= 3);
};

const obj = {
  a: 1,
  bb: 2,
  ccc: 3,
  dddd: 4,
};
console.log(obj.getShortKeys());
```
- add 함수 작성하기
```
--------------요구 사항 ------------------
두 매개변수가 모두 문자열이면 문자열을 반환한다.
두 매개변수가 모두 숫자이면 숫자를 반환한다.
두 매개변수를 서로 다른 타입으로 입력하면 안 된다.
----------------------------------------
```
- **함수 오버로드 사용하기**
```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
  if(typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else {
    const result = Number(x) + Number(y);
    return result.toString();
  }
}
const v1: number = add(1, 2);
console.log(add(1, '2')); // X
```

- Named Parameters로 작성하는 방법
```ts
function getText({
  name,
  age = 15,
  language,
} : {
  name: string;
  age?: number;
  language?: string;
}): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : ; 'junior';
  return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
```
- **다른 곳에서도 사용하고 싶은 경우**
```ts
interface Param {
  name: string;
  age?: number;
  language?: string;
};

function getText({ name, age = 15, language }: Param): string {
  ...
}
```