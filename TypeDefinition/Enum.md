# Enum Type
## 1. 구조
```ts
enum Fruit {
    Apple,
    Banana,
    Orange,
}
const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana;
```
- JS에는 존재하지 않은 타입
- Fruit 의 안에 있는 아이템들은 각각 타입으로 사용이 가능하다
- `v1`
    + `Type = Fruit`
    + `Value = Fruit.Apple`
- `v2`
    + `Type = Fruit.Apple | Fruit.Banana`
    + `Value = Fruit.Banana`

## 2. Enum의 사용 방법 & 활용 예제
> Enum은 값을 할당하지 않을 경우
>> 자동으로 0이 할당됨
```ts
enum Fruit {
    Apple,
    Banana = 5,
    Orange
}
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
[실행 결과]
0, 5, 6
```
- Enum의 원소에는 숫자 또는 문자열을 할당할 수 있음
    + 명시적으로 값을 할당하지 않으면 이전 원소의 1만큼 증가한 값이 할당됨
- 즉, Apple은 값이 할당되지 않았으므로 0이 할당되고  
Banana는 5라는 값을 할당했고  
Orange는 값이 할당되지 않았으므로 이전 원소인 Banana의 값 5에서 +1이 된 6이 할당됨
- 컴파일을 실행하면 어떻게 출력될까?
```js
"use strict";
var Fruit;
(function (Fruit) {
    Fruit[Fruit["Apple"] = 0] = "Apple";
    Fruit[Fruit["Banana"] = 5] = "Banana";
    Fruit[Fruit["Orange"] = 6] = "Orange";
})(Fruit || (Fruit = {}));
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
```
- Fruit라는 변수를 선언해 객체를 할당하고  
그안에 값을 넣어준 형태이다.
- 구조를 보면 enum의 각 원소는 이름과 값이  
양방향으로 맵핑된다.
  
```ts
enum Fruit {
    Apple,
    Banana = 5,
    Orange,
}
console.log(Fruit.Banana);
console.log(Fruit['Banana']);
console.log(Fruit[5]);
[실행 결과]
5
5
Banana
```
- 해당 객체를 런타임에 사용할 수도 있음
- `첫 번째 로그`: Fruit 객체의  
Banana 속성값을 출력하고 있음
- `두 번째 로그`: 첫 번째 로그와 같은 기능
- `세 번째 로그`: Fruit의 5번 인덱스에 있는  
값을 출력하고 있음
  
> 문자열 활용 예제를 살펴보자!

```ts
enum Language {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}
```
> 위 문자열 예제를 컴파일 하면
```js
"use strict";
var Language;
(function (Language) {
    Language["Korean"] = "ko";
    Language["English"] = "en";
    Language["Japanese"] = "jp";
})(Language || (Language = {}));
```
- Fruit 예제와 다르게 단방향 매핑이 됨
> 즉, 숫자를 할당하면 양방향 매핑이 되지만
>> 문자열을 할당하면 단방향 매핑이 된다

## 3. Enum 구조를 활용한 유틸리티 함수
> Enum 객체에 특정 Value가 있는지 검사하는 함수
```ts
function getIsValidEnumValue(enumObject: any, value: number | string) {
    return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
}
```
1. Enum 객체 안에 있는 모든 키 값을 뽑아낸다
2. 마지막엔 Enum 객체안에 입력된 value가 있는지 검사한다
3. 중간에 `.filter`를 하는 이유는 양방향 매핑 때문
- 양방향 매핑 필터링
```ts
enum Some {
    key1 = 1
}
```
> 위를 컴파일 하면 숫자를 할당했으므로 양방향 매핑이 됨
```js
Some['key1'] = 1;
//Some[1] = 'key1';
```
- 위 주석 부분이 필터링으로 인해서 지워짐
    + value에 1 입력시 true 
    + value에 key1 입력시 false

### 위 코드들을 조합해서 실행해보면!
``` ts
function getIsValidEnumValue(enumObject: any, value: number | string) {
    return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
}
enum Fruit {
    Apple,
    Banana = 5,
    Orange,
}
enum Language {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}
console.log('1 in Fruit:', getIsValidEnumValue(Fruit, 1));
console.log('5 in Fruit:', getIsValidEnumValue(Fruit, 5));
console.log('Orange in Fruit:', getIsValidEnumValue(Fruit, 'Orange'));
console.log('ko in Language:', getIsValidEnumValue(Language, 'ko'));
console.log('Korean in Language:', getIsValidEnumValue(Language, 'Korean'));

[실행 결과]
1 in Fruit: false
5 in Fruit: true
Orange in Fruit: false
ko in Language: true
Korean in Language: false
```
## 4. Enum은 컴파일 후에도 객체가 남는다!
> 객체가 남기에 번들 파일의 크기가 불필요하게 커질 수 있음
>> 그래서, enum 객체에 접근하지 않는다면 `const enum`을 활용하자
```ts
const enum Fruit {
    Apple,
    Banana,
    Orange,
}
const fruit: Fruit = Fruit.Apple;

const enum Language {
    Korean = 'ko',
    English = 'en',
    Japanese = 'jp',
}
const lang: Language = Language.Korean;
```
> 위 코드를 컴파일하면
```js
"use strict";
const fruit = 0 /* Apple */;
const lang = "ko" /* Korean */;
```
> 위 코드를 보면 실제 사용한 값만 노출됨
>> 사용하지 않는 enum 객체가 생성되지 않기에 번들 파일의 크기를 줄일 수 있음
>>> 하지만 당연하게도 const enum를 사용하면 앞서 사용한 유틸리티 함수를 사용할 수 없다!