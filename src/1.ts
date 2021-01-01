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