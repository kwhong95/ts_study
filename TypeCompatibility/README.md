# 타입 호환성
> 어떤 타입을 다른 타입으로 취급해도 되는가?

> 정적 타입의 중요성 :  
컴파일 타임에 호환되지 않는 타입을 찾아낸다!  
어떤 변수가 다른 변수에 할당 가능하기 위해서는  
해당 변수의 타입이 다른 쪽 변수에 할당 가능해야 한다.  
할당 가능을 판단할 때는 타입이 가질 수 있는 값의 집합인 셈이다.

## 1. 변수에 값을 할당할 때 할당 가능하지 않기 때문에 발생하는 *에러*
```ts
function func1(a: number, b: number | string) {
  const v1: number | string = a;
  const v2: number = b; // Error 1
}
function func2(a: 1 | 2) {
  const v1: 1 | 3 = a; // Error 2
  const v2: 1 | 2 | 3 = a;
}
```
- Error 1.  
숫자와 문자열로 이루어진 값의 집합이 숫자로만 이루어진 집합보다 크기 때문에  
더 큰 값의 집합을 더 작은 값의 집합으로 넣을 수 없음!(할당 불가능)
- Error 2.
마찬가지로, 1과 2로 이루어진 값의 집합을 1과 3으로 이루어진 집합에  
할당할 수 없다.

## 2. 호환성 집합 관계
<img width="492" alt="스크린샷 2021-01-01 오후 8 35 36" src="https://user-images.githubusercontent.com/70752848/103437965-fecfa000-4c70-11eb-8512-891f34f187de.png">

> 위처럼 숫자열과 문자열은 서로 호환될 수 없다.

<img width="492" alt="스크린샷 2021-01-01 오후 8 38 07" src="https://user-images.githubusercontent.com/70752848/103437991-481fef80-4c71-11eb-88c6-e2e123d89de5.png">

> 숫자열과 문자열로 이루어진 집합에 숫자열의 할당은 가능하다.  
반대로는 당연히 불가능하다.

## 3. Ts는 값 자체의 타입보다는 값이 가진 내부 구조를 기반해서 호환성 검사를 한다.(Structural Typing)

```ts
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  age: number;
}
const person: Person = { name: 'mike', age: 23 };
const product: Product = person;
```
> Person과 Product는 타입 이름은 다르지만  
내부 구조가 같기 때문에 서로 할당이 가능하다.

## 3.1 인터페이스의 할당 조건
|인터페이스 A가 인터페이스 B로 할당 가능하기 위한 조건|
| --- |
|1. B에 있는 모든 필수 속성의 이름이 A에도 존재해야 한다.|
|2. 같은 속성 이름에 대해, A의 속성이 B의 속성에 할당 가능해야 한다.|

## 3.2 할당 가능한 조건에 대해서 깊게 살펴보기
  > 속성이 많을수록 타입에 더 많은 제약을 가하는 것이고  
  이것은 해당 타입의 집합이 작아지는 것을 의미한다.
```ts
interface Person {
  name: string;
}
interface Product {
  name: string;
  age: number;
}
const obj = { name: 'mike', age: '23' , city: 'abc' };
let person: Person = obj;
let product: Product = obj; // Type Error!
```
- Product의 age에 number를 할당했기 때문에  
obj의 문자열 age를 할당 할수 없다.
- `product = person` : person은 product로 할당 불가능 
- `person = product`: product는 person으로 할당 가능

```ts
interface Person {
  name: string;
  age?: number;
}

interface Product {
  name: string;
  age: number;
}

const obj = {
  name: 'mike'
}

const person: Person = obj;
const product: Product = obj; // Type Error!
```
- Person의 age가 선택속성이므로 Person은 Product에 할당 가능하지 않다.
- Person 값의 집합은 Product 값의 집합보다 크기 때문
- obj의 객체 경우 이 객체는 Person에는 할당이 가능하나 Product에는 불가능하다.

```ts
interface Person {
  name: string;
  age: number;
  gender: string;
}

interface Product {
  name: string;
  age: number | string;
}
const person: Person = {
  name: 'mike',
  age: 23,
  gender: 'male',
};
const product: Product = person;
```
- 이번 경우에는 Productr가 더 큰 집합이므로 person이 Product에 할당 가능하다.

<img width="492" alt="스크린샷 2021-01-01 오후 11 01 49" src="https://user-images.githubusercontent.com/70752848/103439993-609a0500-4c85-11eb-8653-56e18534ada4.png">

## 4. 함수의 타입 호환성
> 다음은 함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건이다  
1. A의 매개변수 개수가 B의 매개변수 개수보다 적어야 한다.
2. 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 한다.
3. A의 반환값은 B의 반환값으로 할당 가능해야 한다.

> 또한, 함수는 호출하는 시점에 문제가 없어야 할당 가능하다.
```ts
type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => number | string;
let f1 : F1 = (a, b) => `${a} ${b.length}`;
let f2 : F2 = (a, b) => `${a} ${b}`;
let f3 : F3 = a => `${a}`;
let f4 : F4 = a => (a < 10 ? a: 'too big');

// 1번 조건 Check!
f1 = f3;
f3 = f1; // Type Error!

// 2번 조건 Check!
f1 = f2;
f2 = f1; // Type Error!

// 3번 조건 Check!
f4 = f3;
f3 = f4; // Type Error!
```