// const i let - block scope - limited to {}
// var = function i global scope - limited to functions

const asd = "asd";

// works
function foo() {
    console.log('in function', asd);
};

// works, overriden
function foo2(){
    const asd = "sad";
    console.log('overriden asd:', asd);
}

// works
console.log('globally', asd);

foo();
foo2();
/////////////////

if(true) {
    var someVar = 'someVlaue';
}
// works! const/let wouldn't
console.log(someVar);

///////////////////

function someFoo() {
    var x = '123';
}
// won't work - function scope/global scope

// console.log(x);
