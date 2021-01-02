# 타입 추론
> 정적 타입의 단점 : 타입 정의에 대한 시간과 노력 필요 : 생산성 저하  
TypeScript 경우 다양한 경우에 대해 타입 추론을 제공해주기 때문에  
꼭 필요한 경우에만 타입 정의를 할 수 있다.

## 1. let 변수 & const 변수의 타입 추론
```ts
let v1 = 123;
let v2 = 'abc';
v1 = 'a'; // error
v2 = 456; // error
```
> 선언한 당시의 타입을 추론하여 타입 정의가 이루어지기 때문에  
Js 코드와 똑같이 코드를 작성해도 타입 정의가 이루어진다.

```ts
const v1 = 123;
const v2 = 'abc';
let v3: typeof v1 = 234; // error
```
> let 변수인 경우엔 재할당이 가능하므로 융통성 있게 타입이 결정됨  
반면에 const 변수는 값이 변하지 않기 때문에 let 변수보다 엄격하게 타입이 결정됨

## 2. Array & Object 의 타입 추론
```ts
const arr1 = [10, 20, 30];
// 비구조화 할당
const [n1, n2, n3] = arr1;
arr1.push('a'); // error

const obj = { id: 'abcd', age: 123, language: 'korean' };
const { id, age, language } = obj;
console.log(id === age); // error
```

## 3. Interface의 타입 추론
```ts
interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface American extends Person {
  liveInNewYork: boolean;
}

const p1: Person = { name: 'mike', age: 23 };
const p2: Korean = { name: 'mike', age: 25, liveInSeoul: true };
const p3: American = { name: 'mike', age: 27, liveInNewYork: false };
const arr1 = [p1, p2, p3];
const arr2 = [p2, p3];
```
> 여러 인터페이스를 배열 안에 통합할 때는 타입 또한 여러가지 타입을  
하나로 통하는 과정을 거친다. 다른 타입으로 할당 가능한 타입은 제거됨
1. arr1의 p2, p3는 둘다 Person에 할당 가능하기 때문에  
제거되고 Person만 남는다. : `Person[]`
2. arr2는 p2, p3는 서로 할당이 불가능 하기에 유니온 타입으로 따로 지정된다.  
: (Korean | American)[]

## 4. Function 의 타입 추론
```ts
function func1(a = 'abc', b = 10) {
  return `${a} ${b}`;
}
func1(3, 6); // error
const v1: number = func1('a', 1); // error

function func2(value: number) {
  if(value < 10){
    return value;
  } else {
    return `${value} is too big`;
  }
}
```
> 함수처럼 내부에 타입 지정이 많은 경우엔 알아서 타입 추론이  
이루어지기 때문에 편하게 코드를 작성할 수 있다.
