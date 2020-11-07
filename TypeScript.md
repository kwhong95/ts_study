# TypeScript란?
## 1. TS vs JS
### 1.1 TypeScript
- `Static Type` (정적 타입 언어)
> JS의 모든 언어를 지원하면서 정적 타입을 지원
- `Compile Time`
> 변수의 타입이 컴파일 타임에 결정

### 1.2 JavaScript
- `Dynamic Type` (동적 타입 언어)
- `Run Time`
> 변수의 타입은 런타임에 

### 1.3 정적 vs 동적 타입언어
| 정적 타입 언어 | 동적 타입 언어 |
| --- | --- |
| 진입 장벽이 높다 | 진입 장벽이 낮다 |
| 코드의 양이 많을 때 생산성이 높다 | 코드의 양이 적을 때 생산성이 높다 |
| 타입 오류가 컴파일 시 발견된다 | 타입 오류가 런타임 시 발견된다 |
- 정적 타입 언어
    + 변수를 선언할 때 타입의 고민을 해야함
    + 코드의 양이 많을수록 생산성이 높음
    + 왜? 타입 오류를 즉각 잡아주기 때문
- 동적 타입 언어
    + 타입을 고려하지 않아도 되어 쉽다
    + 하지만, 타입 오류가 런타임시 발견되어 생산성이 낮아지고 사용자에게 버그가 노출될 확률이 높음

### 1.4 타입스크립트의 특징
1. MicroSoft에서 개발
2. Big Ecosystem
    - 다른 경쟁 언어에 비해 큰 생태계를 지님
3. IDE(VS Code)
    - MS에서 개발중인 VScode와 궁합이 잘맞음
4. DefinitelyTyped
    - 깃헙 저장소에 포함되어 있음
    - 왠만한 라이브러리들과 호환 가능함

## 2. 타입스크립트를 사용하는 이유: 높은 생산성
```js
const mike = {friends: ['june', 'james']};
const totalFriends = mike.friendList.lenngth;
```
> 위 예시를 보면 속성 이름을 잘못 입력한 것을 알 수 있다.
- **JS 경우**
    + 에러가 나지 않음
    + 사용자에게 에러가 전달되거나
    + 런타임 후에나 에러를 캐치할 수 있음
- **TS 경우**
    + 타입 에러를 즉각 캐치해줌
    + 즉, 개발 시 생산성을 높일 수 있음
  
```js
const total = product.;
```
- JS에서는 product 객체의 타입을 모름
    + 즉, product뒤에 .(dot)을 입력해도 별다른 정보를 알려주지 않음
    + 개발 시, 속성이름을 전부 알고 있어야함 모를 시엔 이곳 저곳 코드를 뒤져봐야 함
```ts
interface Product {
    //...
};
let product: Product = {} as Product;

const totalParts = product.;
```
- TS에서는 IDE가 product의 타입을 알고있음
    + .(dot)을 입력하면 product의 속성 이름을 나열해줌
    + 개발 시, 속성 이름을 모르고 있어도 자체적으로 속성 값을 보여줌
    + 그래서, 편하게 속성을 입력할 수 있고 생산성이 높아짐
  
### 리펙토링이 편리함
1. 객체의 속성 이름을 변경할 시
- 같은 타입을 가진 속성 이름만 변경이 가능함
- JS는 이름만 같으면 전부 수정하여 다른 타입을  
수정할 위험이 있음
2. 코드가 서로 타입으로 연결이 되어 있음
- 코드 이동이 간편함
- Command + 클릭 으로 코드에 관련된 속성을  
바로 파악할 수 있음

> 결론은! 생산성이 높아짐

## 3. 타입스크립트 설치 ~ 컴파일
1. 프로젝트 폴터를 생성
2. package.json 생성
```
npm init -y
```
3. 타입스크립트 설치
```
npm install typescript
```
4. 타입스크립트 설정 파일 생성(tsconfig.json)
```
npx tsc --init
```
```json
{
    "target": "es5", // es5로 컴파일 하겠다. 다른 모듈들도 다양하게 존재함
    "strict": true, // 다양한 strict 옵션이 존재함
}
```
5. src 폴더 생성
6. `1.ts` 파일 생성
```ts
const v1: number | string = 123;
const v2 = () => console.log('123');
```
7. 컴파일 실행
```
npx tsc
```
8. js 파일이 자동 생성됨
- 컴파일 결과
```js
"use strict";
const v1 = 123;
const v2 = () => console.log('123');
```
> tsconfig.json 에서 target을 es6로 변경함

- 위처럼 타입에 대한 정보는 제외하고 컴파일 됨
    + 타입 정보는 JS 엔진에선 파싱이 불가능

### 더욱 간편하게 컴파일 결과 확인하기
1. VScode의 `Code Runner` 활용하기
- 설치 후, 출력을 원하는 부분의 코드 드래그!
- Control + Option + N 
- Output에 실행 결과 똭!

2. TS의 플레이라운드 사이트 이용하기
- [이곳으로!!!](http://www.typescriptlang.org/play)