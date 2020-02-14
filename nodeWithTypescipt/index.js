"use strict";
// npm init
// npm tsc --init
// nowa sekcja do scripts - build. Tam "tsc"
Object.defineProperty(exports, "__esModule", { value: true });
//run -> npm run-script build
// jest sporo pluginow jak np. ts-node-dev. Live reload
var foo = require("./mymodule");
console.log('hello from TS!');
var Foo = /** @class */ (function () {
    function Foo(value) {
        var _this = this;
        this.x = function () {
            return _this.value;
        };
        this.value = value;
    }
    Foo.prototype.foo = function () {
        return 'foo' + this.value;
    };
    return Foo;
}());
var x = new Foo(123);
console.log(x.foo());
console.log(x.x());
console.log(foo(4));
