# 조건부 타입(Conditional Type)
> 입력된 제네릭 타입에 타입을 결정할 수 있는 기능
```ts
// T extends U ? X : Y

type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string>; // yes
type T2 = IsStringType<number>; // no
```
> 주석 내용이 조건부 타입의 문법임  
제네릭으로 입력된 어떤 타입 T가 U에 할당 가능하다면  
X라는 타입을 설정하고 불가능하다면 Y라는 타입을 설정한다

## 1. 유니온 타입과 함께 조건부 타입 설정하기
```ts
type IsStringType<T> = T extends string ? 'yes' : 'no';
type T1 = IsStringType<string | number>;
type T2 = IsStringType<string> | IsStringType<number>;

type Array2<T> = Array<T>;
type T3 = Array2<string | number>;
```
> 조건부 타입에 유니온 타입을 사용할 경우에는  
각각의 타입을 조건부 타입에 적용한 다음 각각 유니온 타입을 묶어주는 형태

## 2. Exclude & Extract - 내장 타입
```ts
type T1 = number | string | never;
type Exclude<T, U> = T extends U ? never : T;
type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>;
type T3 = Exclude<string | number | (() => void), Function>;
type Extract<T, U> = T extends U ? T : never;
type T4 = Extract<1 | 3 | 5 | 7, 1 | 5 | 9>;
```
1. never 라는 타입은 제거가 된다. - 조건부 타입에서 자주 사용
2. Exclude는 각각 속성을 적용하여 할당 가능하면 제거한다.
- 즉, T2는 할당 가능한 것을 제외한 3, 7이 설정됨
3. T3는 Function에 할당 가능한 부분을 제외한 string과 number가 설정됨
4. Extract는 반대로 할당 가능한 부분만 선택된다.
- 즉, T4는 1, 5만 설정된다.

## 3. ReturnType(반환 타입) 예제
```ts
type ReturnType<T> = T extends (...arg: any[]) => infer R ? R : any;
type T1 = ReturnType<() => string>;
function f1(s: string): number {
  return s.length;
}
type T2 = ReturnType<typeof f1>;
```
> ReturnType: T가 함수일때 함수의 반환 타입을 뽑아준다.
1. T가 함수에 할당 가능한 타입이면 R(함수의 반환 타입)을 사용한다
- `infer`: (타입 추론) 함수 반환 타입을 R에 담을 수 있게 됨
2. T1은 함수의 반환 타입이 string이기 때문에 string이 설정된다
3. T2는 f1이라는 함수의 반환 타입을 설정한다.
- f1은 실제 값이기 때문에 typeof를 통해 f1의 반환 타입을 가져온다.

## 4. 키워드 : infer 살펴보기
> 중첩 사용이 가능하다!
```ts
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...arg: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
type T0 = Unpacked<string>;
type T1 = Unpacked<string[]>;
type T2 = Unpacked<() => string>;
type T3 = Unpacked<Promise<string>>;
type T4 = Unpacked<Promise<string>[]>;
type T5 = Unpacked<Unpacked<Promise<string>[]>>;
```
> Unpacked ? 입력된 T의 타입이 어떤 값의 배열이면 그 배열의 아이템(타입)을 사용한다. - 결정된 값이 아니기 때문에 infer를 사용함
1. T가 배열이 아닐 경우 아래 조건으로 이동한다.
 - T가 함수에 할당 가능한 타입이라면 함수의 반환 타입을 사용한다.
 - T가 Promise에 할당 가능한 타입이라면 Promise의 값인 U를 사용한다.
 - 위의 경우를 만족하지 않으면 T 자기 자신을 사용한다.
2. 정의된 T0 ~ 5 까지의 반환 값은?
 - T0 : string (자기 자신)
 - T1 : string (배열 아이템 타입)
 - T2 : string (함수 반환 타입)
 - T3 : string (Promise 값)
 - T4 : Promise<string> (배열 아이템 타입)
 - T5 : 첫번째는 배열 조건에 따라서 Promise<string> 할당  
        두번째는 Promise 조건에 따라서 최종적으로 string이 반환

## 5. 조건부 타입을 활용한 몇 가지 유틸리티 타입 생성하기
```ts
// 인터페이스에서 값이 문자열인 속성 이름을 추출하는 유틸리티 타입
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = StringPropertyNames<Person>;

// 위 T1을 생성함으로 인해 만들어지는 타입
// interface Person2 {
//   name: 'name';
//   age: never; string이 아니므로 never 할당
//   nation: 'nation';
// }

// 위 유틸리티로 설정된 데이터의 타입을 객체 형식으로 설정
type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T2 = StringProperties<Person>;
```
1. T1은 값이 문자열인 속성 이름만 추출하기에 `'name' | 'nation'`으로 설정
2. T2는 `{ name: string, nation: string }`으로 설정

## 6. Omit - 내장 타입
```ts
type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = Omit<Person, 'nation' | 'age'>
```
> Person 타입에서 입력한 속성을 제거한다.
- T1은 그 입력한 속성을 제외한  `{ name: string }` 만 남게 된다.

## 7. Overwrite - 내장 타입 X
```ts
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;

interface Person {
  name: string;
  age: number;
}
type T1 = Overwrite<Person, { age: string; nation: string }>;
const p: T1 = {
  name: 'mike',
  age: '23',
  nation: 'korean',
};
```
> Overwrite ? 두 인터페이스를 입력 받아 T라는 인터페이스를 베이스로 하여  
U라는 인터페이스를 T로 덮어쓰기 하겠다.
1. T와 U의 속성중에서 중복을 방지하기 위해 겹치는 부분을 제거함 : Exclude<...>
2. 1번 과정을 거친 속성들을 Mapped Type으로 새로운 객체 타입을 만든다.
3. 새로운 객체를 U와 교집합 한다.