"use strict";
function foo(num) {
    var out = '';
    for (var i = 0; i < num; i++) {
        out += '!';
    }
    return out;
}
module.exports = foo;
