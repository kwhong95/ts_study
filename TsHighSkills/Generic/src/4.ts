export {};

class Stack<D> {
  private items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    // pop은 number 또는 undefine 반환 가능
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
// v1은 pop의 설정이 적용됨
const v1 = numberStack.pop();
const stringStack = new Stack<string>();
stringStack.push('a');
const v2 = stringStack.pop();

// number 의 스택이라는 타입 정의
let myStack: Stack<number>;
myStack = numberStack;
myStack = stringStack; // string 타입의 스택은 사용할 수 없음