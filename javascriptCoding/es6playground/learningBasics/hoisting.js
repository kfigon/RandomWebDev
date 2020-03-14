const globalFoo = 2;

const asd = fun(4);
console.log(asd);

// this will work, because js moves all funs to the top before running.
// globals works as in other languages
function fun(a) {
    return a+globalFoo;
}


//  undefined, not an error
console.log(variable);
var variable = 123;

//  error
// console.log(variable2);
// let variable2 = 123;