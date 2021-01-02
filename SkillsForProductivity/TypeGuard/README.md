# 타입 가드
> 자동으로 타입의 범위를 좁혀주는 기능  

## 1. 타입 가드로 범위를 좁히는 기능
```ts
function print(value: number | string) {
  if (typeof value === 'number') {
    console.log((value as number).toFixed(2));
  } else {
    console.log((value as string).trim());
  }
}
```
> 위 코드의 as 와 같은 타입 단언 코드를 피할 수 있어 생산성에 좋다.
- `as`는 개발자가 강제로 타입을 주입하는 것
  + 꼭 필요한 경우가 아니면 자제하는 것이 좋음
  + 코드 변경시 버그의 위험이 있음
- 위 `typeof`는 Ts에서의 타입 정의 영역이 아닌 값의 영역에서  
사용한것이고, 오른쪽에 있는 값의 타입을 문자열로 반환해 준다.(타입 가드)

## 2. Class - instanceof 키워드 
> instanceof : 값의 영역에서 사용하는 기능  
왼쪽의 값이 오른쪽 클래스의 객체인지 검사
```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {

  }
}

class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {

  }
}

function print(value: Person | Product) {
  console.log(value.name);
  if(value instanceof Person) { // 타입 가드 동작 부분
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

### 인터페이스에서는 ?
```ts
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
function print(value: Product | Product) {
  if (value instanceof Person) { // error
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```
> interface는 타입을 위한 코드이기 때문에 컴파일 후에는 다 제거됨  
`instance of`는 실제 컴파일 후에 돌아가는 코드이기 때문에 에러가 발생한다.  
즉, 생성사자 클래스 함수만 사용이 가능하다.

## 3. 인터페이스를 구별하기 위한 한 가지 방법
> Discriminated Union: 식별 가능한 유니온 타입을 이용한다.
```ts
interface Person {
  type: 'a';
  name: string;
  age: number;
}
interface Product {
  type: 'b';
  name: string;
  price: number;
}
function print(value: Person | Product) {
  if (value.type === 'a') {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```
```ts
function print(value: Person | Product) {
  switch (value.type) {
    case 'a':
      console.log(value.age);
      break;
    case 'b':
      console.log(value.price);
      break
  }
}
```
> 특히, Switch 문에서 사용하기 좋다.

## 4. 타입을 검사하는 함수를 작성하는 방법
```ts
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}

function isPerson(x: Person | Product): x is Person {
  return (x as Person).age !== undefined;
}

function print(value: Person | Product) {
  if (isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```
> 위처럼 함수로 Person과 Product를 속성값을 비교하여 분리해줄 수 있다.

```ts
function print (value: Person | Product) {
  if('age' in value) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```
> 함수 작성이 번거롭다면, `in` 키워드를 활용해서 작성할 수 있다.