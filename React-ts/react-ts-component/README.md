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

## 2. Ref 