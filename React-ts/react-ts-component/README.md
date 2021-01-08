# 리액트 컴포넌트와 타입스크립트 사용하기
## 1. Function Component

### 1.1 FC(Function Component) 유형 정의

```ts
type FC<P = {}> = FunctionComponent<P>;
```
> FC 유형을 사용할 구성 요소는 실제로 인터페이스이다.

```ts
interface FucntionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  PropTypes?: WeakVaildationMap<P>;
  contextTypes?: VaildationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```
> 함수 구성 요소가 P(Object) 유형을 사용한다.  
Children Props와 함께 전달되는 것을 볼 수 있다.

```ts
type PropsWithChildren<P> = P & { children?: ReactNode };
```
> 기본적으로 props를 받아 Type Refernce를 전달한다.

### 1.2 Props Example
> App.tsx
```ts
import React, { FC } from 'react'

type AppProps = {
  yourName: string;
}

const App: FC<AppProps> = ({ yourName }) => {
  return(
    <div className="App">
    // ...
    <p>Hello, {yourName}!</p>
    </div>
  )
}

export default App;
```
> 상위 컴포넌트에서 하위 컴포넌트로 props를 전달하는 예시이다
1. AppProps 타입 지정하기
2. App Component에 Prorps 전달하기
3. 사용하기

> index.tsx
```ts
// ...
<App yourName="Kyung Won" />
// ...
```
> 이렇게 해당 부모 컴포넌트에서 Props의 값을 전달하면 된다.

### 1.3 결과는?

<img width="796" alt="스크린샷 2021-01-08 오후 6 42 53" src="https://user-images.githubusercontent.com/70752848/104000796-1ca58380-51e2-11eb-9b86-12b45e2d7797.png">

### 1.4 Default Value 설정
```ts
const App: FC<AppProps> = ({ yourName = "KyungWon" })
```

> 이런식으로 default Value를 설정해서 사용할 수도 있음.

## 2. Class Component 
```ts
interface Compoent<P = {}, S = {}, SS = any> extends ComponentLifeCycle<P, S, SS> { }

class Component<P, S> {
  // ...
}
```
> 사실 Class Component보다 React Hook을 이용한 FC를 자주 사용하므로  
대충 맛만 보고 넘어가자.

```ts
type AppProps = {
  yourName?: string;
}

type AppState = {
  count: number;
}

class App extends React.Component<AppProps> {
  state: Appstate = {
    count: 0
  }

  handlePlusPress = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleMinusPress = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    return (
      <>
      // ...
      {this.state.count}
        <button onClick={this.handlePlusPress}>+</button>
        <button onClick={this.handleMinusPress}>-</button>     
      </>
    )
  }
}
```
