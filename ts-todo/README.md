# TypeScript를 이용하여 ToDoApp 만들기

## 1. 프로젝트 소개
### 1. index.ts
```ts
console.log('hello world');
```
- 콘솔에 출력을 해주는 부분
- `npm install`로 먼저 필요한 패키지를 설치한다.
  
### 2. input.ts
```ts
import readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function waitForInput(msg: string) {
  return new Promise(res =>
    readlineInterface.question(msg, name => {
      res(name);
    })
  );
}
```
- `readline` : `node module`
  - 키보드 입력을 처리하기 위해 사용함
  - 표준 입출력을 이용함
  - `waitForInput: Function`을 이용해 사용자 입력을 받음
    + Promise를 반환함
    + 사용자가 키보드를 입력하면 Promise 값으로 넣어줌

### 3. util.ts 
```ts
export function getIsVaildEnumValue(enumObject: any, value: number | string) {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
}
```
- `getIsVaildEnumValue: Function`
  + 어떤 enum에 특정 value가 있는지 검사함

### 4. package.json
```json
{
  "dependencies": {
    "@types/node": "^14.6.0",
    "chalk": "4.1.0",
    "nodemon": "^2.0.4",
    "ts-node": "9.0.0",
    "typescript": "4.0.2"
}
```
- @types/node: readline 같은 모드 모듈은 이 패키지에 있는 타입 정보를 활용함
- chalk: 커맨드라인에서 출력되는 텍스트에 폰트 스타일을 적용하기 위해서 사용함
- nodemon & ts-node: 개발 모드에서 편하게 개발하기 위함
  + script 부분의   
  `"start": "nodemon --watch '*.ts' --exec 'ts-node' src/index.ts",`  
  이 부분을 살펴보면  
  먼저 nodemon을 실행해서(watch 모드: 파일이 수정될 때마다 뒤에 있는 것을 실행)  
  ts 확장자를 가진 파일이 수정될 때마다 뒤에있는 명령어를 실행해줌(--exec)
  + `ts-node`: ts 코드를 js로 컴파일하지 않아도 바로 ts파일을 입력으로 받아 실행해줌
- `npm run build`를 실행해주면 `dist`파일에 Js 파일로 컴파일됨
  + start: 개발할 때 사용하는 것
  + build: 실제 사용자에게 전달할 때 js로 컴파일하고 최종적으로는 노드를 실행하는 것