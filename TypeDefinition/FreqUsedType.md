# 타입 정의하기

## 자주 사용하는 타입 표현법
1. 숫자 타입 지정
```ts
const size: number = 123;
```
2. boolean 타입 지정
```ts
const isBig: boolean = size >= 100;
```
3. string 타입 지정
```ts
const msg: string = isBig ? '크다' : '작다'
```
4. 배열 타입 지정
```ts
const values: number[] = [1, 2, 3];
// 다른 표현 방식
const values2: Array<number> = [1, 2, 3];
values.push('a');// 타입을 number로 지정했으므로 문자열을 넣으면 Type Error!
```
5. Tuple 타입 지정
```ts
const data: [string, number] = [msg, size]; //긱 인덱스별 타입 정의
data[0].substr(1);
data[1].substr(1); // number 타입에는 substr 이라는 메서드가 없으므로 Error!!
```

6. JS에서는 불가능한 풍부한 타입 지정 가능
```js
console.log('typeof 123 =>', typeof 123);
console.log('typeof "abc" =>', typeof 'abc');
console.log('typeof [1, 2, 3] =>', typeof [1, 2, 3]);

[실행 결과]
typeof 123 => number
typeof "abc" => string
typeof [1, 2, 3] => object
```
- JS 에서는 Array 타입은 없고 모두 object로 인식
> TS 사용시 Array 타입을 관리할 수도 있고 안의 원소의 타입도 정의할 수 있음 이처럼 풍부하게 타입 지정이 가능한 장점이 명확함