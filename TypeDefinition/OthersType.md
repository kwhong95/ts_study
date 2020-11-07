# 또 디른 타입 정의
## 1. undefined & null
```ts
let v1: undefined = undefined;
let v2: null = null;
v1 = 123; // Error!

// 보통 사용하는 경우 -> 다른 타입과 함께 사용
let v3: number | undefined = undefined;
v3 = 123;
```
```js
console.log('typeof undefined =>', typeof undefined);
console.log('typeof null =>', typeof null); 
[실행 결과]
typeof undefined => undefined 
typeof null => object
```
> JS 에서는 null도 object로 표현됨

## 2. 숫자와 문자의 리터럴 타입 정의
```ts
let v1: 10 | 20 | 30;
v1 = 10;
v1 = 15; // error!

let v2: '경찰관' | '소방관';
v2 = '의사'; // error!
```
> 각각의 변수에 할당 가능한 값을 지정할 수도 있음!

## 3. any
```ts
let value: any;
value = 123;
value = '456';
value = () => {};
```
- 실제로 타입을 알 수 없는 경우
- 타입 지정이 안된 외부 패키지 사용시
> 단, any 타입을 남발하면 TS의 사용의미가 퇴색...

## 4. function - void, never
```ts
function f1(): void {
    console.log('hello');
}
function f2(): never {
    throw new Error('some error');
}
function f3(): never {
    while (true) {
        //...
    }
}
```
- `void` : 이무값도 반환하지 않고 종료되는 함수
- `never` : 항상 예외가 발생해서 비정상적으로 종료되거나 무한루프 때문에 종료되지 않는 함수(거의 사용하지 않음)

## 5. Object
```ts
let v: object;
v = { name: 'abc' };
console.log(v.prop1); //error
```
- 객체의 속성에 대한 정보가 없기 때문에  
특정 속성값에 접근하면 *타입에러 발생*
- 속성 정보를 포함한 타입 정의를 위해서는  
`인터페이스`를 사용해야함

## 6. union & intersection Type
```ts
let v1: (1 | 3 | 5) & (3 | 5 | 7);
v1 = 3;
v1 = 1; //error!
```
- 위처럼 여러 타입의 교집합과 합집합 표현 가능

## 7. Type Keyword
```ts
type Width = number | string;
let width: Width;
width = 100;
width = '100px';
```
- `type 키워드`를 이용해 타입에 별칭 부여 가능