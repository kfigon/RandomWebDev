// npm init
// npm tsc --init
// nowa sekcja do scripts - build. Tam "tsc"

//run -> npm run-script build
// jest sporo pluginow jak np. ts-node-dev. Live reload

import foo = require('./mymodule');

console.log('hello from TS!');
class Foo {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    foo() : string {
        return 'foo' + this.value;
    }

    x = () : number => {
        return this.value;
    }
}


const x = new Foo(123);
console.log(x.foo());
console.log(x.x());
console.log(foo(4));