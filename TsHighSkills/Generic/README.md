# 제네릭(Generic) 이란?
> 타입 정보가 동적으로 결정되는 타입  
같은 규칙을 여러 타입에 적용할 수 있기 때문에  
타입 코드를 작성할 때 발생할 수 있는 중복 코드를 제거할 수 있다.

## 1. 필요한 타입에 따라 함수를 호출하는 방법
```ts
function makeNumberArray(defaultValue: number, size: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

function makeStringArray(defaultValue: string, size: number): string[] {
  const arr: string[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);
```

## 2. 함수 오버로드(overload) 를 사용한 경우 - 숫자와 문자열만 필요한 경우
```ts
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
```
> 이 경우 한가지 문제점 발생!  
필요한 타입이 늘어나면 타입을 하나씩 추가해야 하는 번거로움이 있다.

## 3. @ 제네릭 사용하기 @
> 함수 이름 오른쪽에 <> 로 입력 가능  
미리 타입의 정보를 설정해놓는 것이 아닌  
동적으로 호출시에 입력해서 설정할 수 있음
```ts
function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
const arr1 = makeArray<number>(1, 10);
const arr2 = makeArray<string>('empty', 10);

// 지정해주지 않아도 알아서 타입을 판단하여 설정 가능
const arr3 = makeArray(1, 10);
const arr4 = makeArray('empty', 10);
const arr5 = makeArray(true, 10);
```

## 4. 제네릭은 데이터의 타입에 다양성을 부여해주기 때문에 자료 구조시에 많이 사용된다.
```ts
class Stack<D> {
  private items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    // pop은 number 또는 undefine 반환 가능
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
// v1은 pop의 설정이 적용됨
const v1 = numberStack.pop();
const stringStack = new Stack<string>();
stringStack.push('a');
const v2 = stringStack.pop();

// number 의 스택이라는 타입 정의
let myStack: Stack<number>;
myStack = numberStack;
myStack = stringStack; // string 타입의 스택은 사용할 수 없음
```

## 5. 지금까지는 제네릭 타입에 아무 타입이나 입력이 가능했다.  
>하지만, 리액트와 같은 라이브러리의 API는 입력 가능한 값의 범위를 제한한다.  
예를 들어 리액트 속성값 전체는 객체 타입만 허용이 가능하다.  
이를 위해 Ts의 제네릭은 타입의 종류를 제한할 수 있는 기능을 제공힌다.

```ts
// A extends B : A가 B에 할당 가능해야 한다.
function identity<T extends number | string>(p1: T): T {
  return p1;
}
identity(1);
identity('a');
// identity([]); 불가능
// identity(true); 불가능
```
> 즉, T타입인 identity 함수는 number | string 만 할당 가능하다.

## 6. extends 키워드 사용 예제
> keyof 키워드는 뒤에 선언한 인터페이스의 모든 속성을 나열한 것이다.
```ts
interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  liveInSeoul: boolean;
}

// type T1 = keyof Person;
function swapProperty<T extends Person, K extends keyof Person>(
  p1: T,
  p2: T,
  key: K,
): void {
  const temp = p1[key];
  p1[key] = p2[key];
  p2[key] = temp;
}

const p1: Korean = {
  name: '홍길동',
  age: 23,
  liveInSeoul: true,
};
const p2: Korean = {
  name: '김삿갓',
  age: 31,
  liveInSeoul: false,
}
swapProperty(p1, p2, 'age');
```
> 즉, K는 name 또는 age에 할당 가능한 값이어야 한다.

```ts
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
swapProperty(p1, p2, 'name'); // Type Error!
```
> 잘못된 객체 타입을 입력하여 타입에러 발생  
p1은 Product 타입이기에 Person에 할당 가능하지 않기 때문에 에러가 발생한다.