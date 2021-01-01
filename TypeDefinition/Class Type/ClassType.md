# Class Type

## 1. 클래스 작성 방법
```ts
class Person {
  name: string;
  age: name = 0;
  // 객체가 생성될 때 호출
  constructor(name: string, age: number) {
    // 맴버 변수 초기화
    this.name = name;
    this.age = age;
  }
  // 메서드
  sayHello() {
    console.log('안녕하세요');
  }
}
``` 

### 1.1 클래스 상속을 이용하기
```ts
class Person {
  sayHello() {
    console.log('안녕하세요');
  }
}

class Programmer extends Person {
  fixBug() {
    console.log('버그 수정 완료');
  }
}

const programmer = new Programmer();
programmer.fixBug(); // 버그 수정 완료
programmer.sayHello(); // 안녕하세요
```

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    console.log(`안녕하세요 저는 ${this.name} 입니다.`);
  }
}

// Person 클래스를 상속받아 아래 두 클래스를 생성

class Programmer extends Person {
  constructor(name: string) {
    // 자식 클래스에서 contructor 작성 시 반드시 super 호출!
    super(name); // 부모 클래스의 constructor가 호출
  }
  // method override
  sayHello() {
    super.sayHello(); // 부모의 SayHello 메서드 호출
    console.log('저는 프로그래머 입니다.');
  }
}

class Doctor extends Person {
  constructor(name: string) {
    super(name);
  }
  sayHello() {
    super.sayHello();
    console.log('저는 의사입니다.');
  }
}

const programmer = new Programmer('홍길동');
programmer.sayHello();
// 안녕하세요 저는 홍길동 입니다.
// 프로그래머 입니다. 
```

- 클래스의 맴버 변수와 메서드는 **접근 범위**를 설정할 수 있음
  + `public(Default)` : 외부와 상속받는 쪽 모두 노출
  + `protected`: 외부에는 노출하지 않지만 상속 받는 쪽에만 노출
  + `private` : 외부와 상속받는 쪽 모두 노출하지 않음  
    -> 변수나 메서드 앞에 '#을 붙혀 설정 가능하다.

- 접근 범위 설정 키워드나 readonly 같은 것을 사용하면  
  자동으로 맴버 변수로 설정이 된다
```ts
class Person {
  constructor (public name: string, public age: number) {}
}

const person = new Person('홍길동', 23);
console.log(person.name, person.age);
```

## 2. Getter와 Setter 정의하기
```ts
class Person {
  private _name: string = '';

  get name(): string {
    console.log('getter called');
    return this._name;
  }

  set name(newName: string) {
    if (newName.length > 10) {
      throw new Error('최대 길이를 넘었습니다');
    }
    this._name = newName;
  }
}

let person = new Person();
person.name = '홍길동'; // getter 호출
console.log(person.name); // 홍길동
person.name = 'asdf asdf asfd'; // setter 호출
```

## 3. 정적 맴버 변수와 정적 메서드 정의하기(static)
```ts
class Person {
  static adultAge = 20;
  constructor(public name: string, public age: number) {}
  sayHello() {
    console.log(`안녕하세요 저는 ${this.name} 입니다`);
    console.log(
      Person.getIsAdult(this.age) ? '저는 성인이 아닙니다' : '저는 성인입니다',
    );
  }
  static getIsAdult(age: number) {
    return Person.adultAge <= age;
  }
}

const person = new Person('홍길동', 23);
person.sayHello();
console.log(`성인 판단 기준 나이: ${Person.adultAge}`);  
```

## 4. 추상 클래스 정의하기(abstract)
```ts
// 추상 클래스 생성
abstract class Person {
  constructor(public name: string) {}
  sayHello() {
    console.log(`안녕하세요 저는 ${this.name} 입니다`);
  }
  // 추상 메서드 생성
  abstract sayHello2(): void;
}

class Programmer extends Person {
  sayHello() {
    super.sayHello();
    console.log('저는 프로그래머 입니다.');
  }
  // 상속 받는 쪽에서 반드시 메서드 정의가 필요하다.
  sayHello2() {
    console.log('반갑습니다~! 저는 프로그래머 입니다.');
  }
}

const person = new Person('김삿갓'); //TypeError : 추상 클래스는 객체 생성 불가
const programmer = new Programmer('홍길동)'
programmer.sayHello();
programmer.sayHello2();