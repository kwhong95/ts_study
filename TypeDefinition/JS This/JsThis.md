# JavaScript This 이해하기( Very Important!! )

## 1. Js에서의 This 활용
- **add 함수 : 화살표 함수**
```js
function Counter() {
  this.value = 0;
  this.add = amount => {
    this.value += amount;
  }
}

const counter = new Counter();
console.log(counter.value); // 0
counter.add(5);
console.log(counter.value); // 5
add(5);
console.log(counter.value); // 10
```

-  **add 함수 : 일반 함수**
```js
function Counter2() {
  this.value = 0;
  this.add = function (amount) {
    this.value += amount;
    console.log(this === global); // false, true
  };
}

const counter2 = new Counter2();
console.log(counter2.value); // 0
counter2.add(5);             
console.log(counter2.value); // 5
const add2 = counter2.add; 
add2(5);
console.log(counter2.value); // 5
```
> 일반 함수를 사용할 시 두 번째 add2 함수를 사용할 때  
this가 가리키는 것이 counter2가 아닌 global을 가르키기 때문에  
출력 결과가 이렇게 나타난다.

- **객체에서 활용하는 경우**
```js
/* 일반 함수 */
const counter3 = {
  value: 0,
  add: function (amount) {
    this.value += amount;
  },
};
console.log(counter3.value); // 0
counter3.add(5);
console.log(counter3.value); // 5
add3(5);
console.log(counter3.value); // 5

/* 화살표 함수 */
const counter3 = {
  value: 0,
  add: (amount) => {
    this.value += amount;
  },
};
console.log(counter3.value); // 0
counter3.add(5);
console.log(counter3.value); // 0
add3(5);
console.log(counter3.value); // 0
```
> 위 화살표 함수 예제를 보면  
위 화살표 함수를 감싸고 있는 일반 함수가 없기 때문에  
항상 전역 객체를 가리키게 되고  
즉, 아무리 add를 실행해도 객체 안의 value 값은 증가하지 않는다.