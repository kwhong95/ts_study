# 맵드 타입 (Mapped Type)
> 인터페이스가 있을 때 그 속성을 모두 optional(선택속성)으로  
바꾸거나 readonly(불러오기만 가능한 속성)으로 바꾸는 것 등의
기능을 한다.

## 1. 사용 방법
```ts
type T1 = { [K in 'prop1' | 'prop2']: boolean };
```
1. 맵드 타입으로 만든 타입은 객체이기 때문에 중괄호({...})가 보이고  
안에 대괄호([...])가 있는데 이것은 key 부분을 나타낸다.
2. 맵드 타입은 `in` 이라는 키워드를 사용한다.
3. 그 오른쪽의 두개의 문자열이 전체 객체의 속성으로 만들어진다.
4. 그리고 두 속성은 boolean 타입으로 지정한다.

# 2. 입력된 인터페이스의 모든 속성을 바꾸는 기능
```ts
interface Person {
  name: string;
  age: number;
}

type MakeBoolean<T> = { [P in keyof T]?: boolean };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;
```
> T의 모든 속성에 대해서 boolean 타입이며 선택 속성으로 설정

```ts
interface Person {
  name: string;
  age: number;
}

type T1 = Person['name'];
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type T2 = Partial<Person>;
type T3 = Readonly<Person>;
```
> T의 모든 속성값을 나열해주고 모든 속성에 대해서 readonly를 설정  
 오른쪽에 `T[P]`를 선언함으로써 값의 타입은 변화를 주지 않음
 그리고 아래(Partial)에는 모든 속성을 불러오고 선택 속성으로 설정하며  
 위와 똑같이 값의 타입은 변화를 주지 않음 

> 결론은, 맵드타입은 함수처럼 사용하는 것처럼 사용 할 수 있고  
일종의 유틸리티 타입인 셈이다.

## 3. Pick - Mapped Type

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

interface Person {
  name: string;
  age: number;
  language: string;
}
type T1 = Pick<Person, 'name' | 'language'>;
```
> 입력된 K 속성들로 이루어진 인터페이스를 생성하는 것  
T1: Person이라는 T에는 Person을 할당하고 K에는 name과 languager  
속성을 입력해서 T1은 name과 language만 선택함

## 4. Record - Mapped Type
```ts
interface Person {
  name: string;
  age: number;
  language: string;
}

type Record<K extends string, T> = { [P in K]: T };
type T1 = Record<'p1' | 'p2', Person>;

```
> Record는 문자열로 이루어진 와 T를 입력 받고  
T1: p1과 p2 속성으로 이루어진 인터페이스를 생성하고 값의 타입은 Person이다.

## 5. Mapped Type을 이용하여 enum 타입 활용도 높히기
```ts
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const FRUIT_PRICE: { [key in Fruit]: number } = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 2000,
}
```
> 새로운 값을 할당할 경우 에러가 발생하기 때문에  
eunm 객체를 생성할 때 실수를 방지해 생산성을 높일 수 있음