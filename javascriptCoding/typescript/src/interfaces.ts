// for data classes, methods allowed - but you cannot use new
// na klasie mozna tez implements MyData, jak w javie

interface MyData {
    res: number;
    age: number;
    foo() : void;
}

const x: MyData = {
    age: 4,
    res: 123,
    foo() : void {
        console.log(this.age);
    }
};

x.foo();