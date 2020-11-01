function foo() {
    console.log("foo from module");
}

function bar() {
    console.log("bar from module");
}

module.exports.foo = foo;
module.exports.bar = bar