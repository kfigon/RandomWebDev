"use strict";
// npm init
// npm tsc --init
// nowa sekcja do scripts - build. Tam "tsc"
//run -> npm run-script build
// jest sporo pluginow jak np. ts-node-dev. Live reload
console.log('hello from TS!');
var Foo = /** @class */ (function () {
    function Foo(value) {
        this.value = value;
    }
    Foo.prototype.foo = function () {
        return 'foo' + this.value;
    };
    return Foo;
}());
var x = new Foo(123);
console.log(x.foo());
