// run it with node


// init module - npm init. creates package.json
// npm install odpali wszystko
// zrobilem npm install node-fetch - sciagnelo node_module
// npm install dociagnie wszystko do jsona

// do sekcji scripts mozna dodac np. 
// "build": "tsc" - typescript przy buildzie
// npm run-script build


// modules:
const bar = require('./someModule').bar;
const foo = require('./someModule').foo;
const fetch = require('node-fetch');

console.log("hello!");

bar();
foo();

fetch('https://www.google.com')
.then(val => {
    console.log('is request ok? ' + val.ok);
})