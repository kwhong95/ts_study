# TypeScript를 이용하여 ToDoApp 만들기

## 1. 프로젝트 소개
### 1.1 index.ts
```ts
console.log('hello world');
```
- 콘솔에 출력을 해주는 부분
- `npm install`로 먼저 필요한 패키지를 설치한다.
  
### 1.2 input.ts
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

### 1.3 util.ts 
```ts
export function getIsVaildEnumValue(enumObject: any, value: number | string) {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
}
```
- `getIsVaildEnumValue: Function`
  + 어떤 enum에 특정 value가 있는지 검사함

### 1.4 package.json
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

## 2. 프로젝트 시작하기
### 2.1 메인함수 작성하기
```ts
import { waitForInput } from "./input";

async function main() {
  while(true) {
    console.clear();
    const key = await waitForInput('input command: ')
    console.log('key: ', key);
  }
}
main();
```
- `async await`를 활용해서 `waitForInput` 함수가 반환하는 Promise를
  key로 받아올 수 있음
- await 오른쪽에 Promise 객체가 오면 resolve 또는 reject가 될 때까지 기다림

### 2.2 Todo Class 생성하기
```ts
import { Priority } from './type';

export default class Todo {
  static nextId: number = 1;
  constructor(
    private title: string, 
    private priority: Priority,
    public id: number = Todo.nextId,
  ) {
    Todo.nextId++;
  }
}
```
- constructor의 매개변수에 접근 범위를 설정 해주면  
  각 변수들은 맴버 변수가 된다
- nextId 처럼 객체별로 데이터를 관리할 필요가 없기 때문에  
  static으로 정의함 (ClassName.Static)
- 다른 곳에서도 많이 사용할 타입정보는 `type.ts`에 따로 보관함
```ts
export enum Priority {
  High,
  Medium,
  Low,
}
```

### 2.3 App 상태 설정하기
```ts
const state: AppState = {
    todos: [
      new Todo('test1', Priority.High),
      new Todo('test2', Priority.Medium),
      new Todo('test3', Priority.Low),
    ]
}
```
- 메인 함수에 state를 설정하여 todo list를 추가할 상태를 설정함

### 2.4 Command Class 생성하기
```ts
export abstract class Command {
  constructor(public key: string, private desc: string) {}
  toString() {
    return `${this.key}: ${this.desc}`;
  }
  abstract async run(state: AppState): Promise<void>;
}
```
- 여기서 key는 키보드로 입력한 키를 의미하고 string 타입에 반응함
- 어떤 Command인지 설명해주는 desc라는 맴버변수를 가지고 있음
- 화면에 Command가 하는 일이 무언인지 설명해주기 위해서  
  `toString` 메서드를 정의함 - key와 desc를 반환함
- 키를 눌렀을 때 실행할 함수를 정의하기 위해 `run` 메서드 정의
  + AppState를 매개변수로 받음
  + 비동기 동작을 위해 async로 생성

### 2.5 모든 ToDo를 출력해주는 Command
```ts
export class CommandPrintTodos extends Command {
  constructor() {
    super('p', '모든 할 일 출력하기');
  }
  async run(state: AppState): Promise<void> {
    for (const todo of state.todos) {
      const text = todo.toString();
      console.log(text);
    }
    await waitForInput('press any key: ');
  }
}
```
- super 첫번째 매개변수인 'p'를 입력하면 모든 할 일 출략하기를 실행함
- async run은 모든 todo를 출력줌(state.todo 있는 모든 것!)
- await 아무 키나 입력 받기전까지 대기함

### 2.6 toString() 메서드 정의하기(Todo.ts)
```ts
toString() {
    return `${this.id}) 제목: ${this.title} (우선순위: ${this.priority})`;
}
```

### 2.7 모든 할 일 출력하는 Command 구현하기(index.ts)
```ts
const commands: Command[] = [new CommandPrintTodos()];
```
- 먼저, Command.ts에서 생성한 `Command`와 `CommandPrintTodos()`를  
  가져와서 변수로 생성함

```ts
for(const command of commands) {
  console.log(command.toString());
}
console.log();
const key = await waitForInput('input command: ');
console.clear();
const command = commands.find(item => item.key === key);
if(command) {
  await command.run(state);
}
```
- 정의한 commands의 각 command를 정의하고 콘솔에 `toString()` 메서드로 출력함
- 아무 키나 입력하면 콘솔을 한번 클리어 해줌
- 그러면, commands의 각 item들을 일치하는 키를 매치시키기고  
  `run(state)` 메서드를 통해 출력해준다.

### 2.8 출력 결과 확인
<img width="297" alt="스크린샷 2021-01-03 오후 2 20 36" src="https://user-images.githubusercontent.com/70752848/103472270-f8efd100-4dce-11eb-8fd5-c71ae571915a.png">

> input command에 p를 입력하면!

<img width="297" alt="스크린샷 2021-01-03 오후 2 22 15" src="https://user-images.githubusercontent.com/70752848/103472283-1a50bd00-4dcf-11eb-9727-8032d1099078.png">


> App State에 임시로 세팅한 List들이 출력됨!