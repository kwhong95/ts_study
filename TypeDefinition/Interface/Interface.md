# 인터페이스란 ?
> Java와 같은 언어에서 필요한 메서드를 정의하는 용도로 사용

## 1. 객체 타입 정의하기
```ts
interface Person {
  name: string;
  age: number;
}
const p1: Person = { name: 'mike', age: 23 };
const p2: Person = { name: 'mike', age: 'ten' }; // Type error
```

### 1.1  **선택 속성**
```ts
interface Person {
  name: string;
  age?: number; // 선택 속성
}
const p1: Person = { name: 'mike' }; // age가 없어도 ㄱㅊ
```

### 1.2 **`readonly` 키워드를 이용한 속성 정의**
> readonly는 속성 값을 변경할 수 없음!!
```ts
interface Person {
  readonly name: string;
  age?: number;
}
const p1: Person = {
  name: 'mike',
};
p1.name = 'jone'; // Type Error
```
```ts
const p2 = {
  name: 'mike',
  birthday: '1997-01-01',
};
const p3: Person = p2;
```
1. p2 객체 안에 birthday 속성 값이 있지만 Person 안에는 존재하지 않음
2. 하지만 p2를 Person 타입에 입력할 수 있음
3. 이는 p3 타입이 p2 타입을 포함하는 더 큰 타입이기 떄문 (자세한건 추후에 다룸)

### 1.3 **인덱스 타입**
> 인터페이스에서 속성의 이름을 구체적으로 정의하지 않고  
값의 타입만 정의하는 것
```ts
interface Person {
  readonly name: string;
  [key: string]: string | number;
}
const p1: Person = {
  name: 'mike',
  birthday: '1997-01-01',
  age: 25, // TypeError!
};
```
> Js에서는 속성이름에 숫자와 문자열 사용가능  
속성 이름에 숫자를 사용하면 내부적으로 문자열로 변환하여 사용한다.

> 따라서, Ts에서는 숫자인 속성 이름의 값이  
문자열인 속성 이름의 값으로 할당 가능한지 검사

```ts
interface YearPriceMap {
 [year: number]: A;
 [year: string]: B;
}
```
> 위의 숫자의 값 A는 B로 할당 가능해야 한다  
속성 이름이 숫자인 것은 내부적으로 문자열로 변환되어 사용되기 때문

```ts
interface YearPriceMap {
  [year: number]: number;
  [year: string]: string | number;
}

const yearMap: YearPriceMap = {};
yearMap[1998] = 1000;
yearMap[1998] = 'abc'; // Type Error!
yearMap['2000'] = 1234;
yearMap['2000'] = 'million';
```
> 위처럼 숫자열로 된 속성에는 숫자를 입력할 수 있지만  
문자열을 입력하려고 하면 에러가 발생하고  
문자열로 된 속성은 숫자열 문자열 모두 입력이 가능하다

## 2. 함수 타입 정의하기

```ts
interface GetText {
  (name: string, age: number): string;
}
//type GetText = (name: string, age: number) => string;

const getText: GetText = function (name, age) {
  const nameText = name.substr(0, 10);
  const getText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}`;
};
```
> 인터페이스로 정의한 부분과 아래 주석 부분이 같은 내용이다

### 2.1 Js에서는 **함수도 속성값**을 가질 수 있다
```ts
interface GetText {
  (name: string, age: number): string;
  totalCall?: number;
}
const getText: GetText = function (name, age) {
  if (getText.totalCall !== undefined) {
    getText.totalCall += 1;
    console.log(`totalCall: ${getText.totalCall}`);
  }
  return '';
};
getText.totalCall = 0;
getText('', 0); // totalCall: 1
getText('', 0); // totalCall: 2
```

## 3. 인터페이스로 클래스로 구현하기

```ts
interface Person {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}

class SomePerson implements Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  isYoungThan(age: number) {
    return this.age < age;
  }
}
```
## 4. 인터페이스를 확장하여 새로운 인터페이스 구현하기
```ts
interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  isLiveInSeoul: boolean;
}

interface Korean {
  name: string;
  age: number;
  isLiveInSeoul: boolean;
} // 위 두개의 인터페이스로 이와 같은 인터페이스로 확장한 것!
```
### 4.1 여러개의 인터페이스 확장하기 
```ts
interface Person {
  name: string;
  age: number;
}

interface Programmer {
  favoriteProgrammingLanguage: string;
}

interface Korean extends Person, Programmer {
  isLiveInSeoul: boolean;
} // 위 두개의 속성 값 또한 내장되어 있음
```
## 4.2 기호(&)를 활용하기
```ts
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
type PP = Person & Product; // & : 교차타입
const pp: PP = {
  name: 'a',
  age: 23,
  price: 1000,
};
``` 