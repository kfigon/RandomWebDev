// const obj: object - bad

// tutaj tylko typy ktore musi miec, jak ma wiecej - lipa
const obj: {name: string, val: number, foo: (a:number)=>string} = {
    name: 'foo',
    val: 123,
    foo(a: number){
        return a.toString();
    }
};

// type alias
type MyResults = {name: string, age: number};

const myRes : MyResults = {
    age: 123,
    name: 'asd'
};

// union/literal type
// taka wartosc lub druga. Innych nie wpusci
// string | number - tez mozna
type Mode = 'asd' | 'foo';

enum MyMode {CONSOLE, ALERT};