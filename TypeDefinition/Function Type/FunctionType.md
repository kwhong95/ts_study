# Function Type
## 1. Function TS 활용 구조
```ts
function getText(name: string, age: number): string {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    return `name: ${nameText}, age: ${ageText}`;
}
```
> 함수의 타입을 다음과 같이 정의할 수 있다
-  매개변수 오른쪽에 :(콜론)을 입력 후 타입을 정의하며 반환 타입은 괄호를 닫고 콜론 입력 후 타입을 정의한다

```ts
const getText: (name: string, age: number) => string = function (name, age) {
    return '';
}
```
> 화살표 기호를 활용한 함수 구현
- 함수를 구현하는 코드에는 따로 타입을 정의할 필요가 없다.


## 2. Optional Parameters
> 매개변수 이름 오른쪽에 ?(물음표)를 입력하면 `선택 매개변수`(Optional Parameters)가 된다
```ts
function getText(name: string, age: number, language?: string): string {
    const nameText = name.substr(0, 10);
    const ageText = age >= 35 ? 'senior' : 'junior';
    const languageText = language ? language.substr(0, 10) : '';
    return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}
getText('mike', 23, 'ko');
getText('mike', 23);
getText('mike', 23, 123);
```
1. `language?: string` : string + undefined 
2. 선택 매개변수 오른쪽에 필수 매개변수를 작성하면 컴파일 에러가 발생한다.
 - 함수를 호출할 떄 입력하는 두 번째 인수가 두 번째 인수를 가르키는지 세 번째 인수를 가르키는지 알 수 없기 때문이다.
 - 해결 방법: `language: string | undefined` 이렇게 작성한다.

## 3. 매개변수의 Default 값을 설정한 함수
```ts
function getText(name: string, age: number = 15, language = 'korean'): string {
    return '';
}
console.log(getText('mike'));
console.log(getText('mike',23));
console.log(getText('jone', 36, 'english'));
```
1. language의 경우는 따로 타입 정의를 하지 않은 이유는 Default 값을 string 타입으로 입력했기 때문에 자동으로 string으로 정의된다.
2. Default 값을 사용할 시 자동으로 그 매개변수는 **Optional Parameter**가 된다.
3. 위 로그 출력처럼 모두 사용 가능하다.

## 4. Rest Parameter 활용하기
```ts
function getText(name: string, ...rest: number[]): string {
    return '';
}

console.log(getText('mike', 1, 2, 3));
```
1. 첫번쨰 정의한 파라미터를 제외한 모든 매개변수를 rest 매개변수에 담는다.
2. rest 파라미터는 항상 배열로 정의한다.