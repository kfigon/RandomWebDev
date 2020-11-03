// updating in immutable way - destructuring and spread operator for creating new objs
const meal = {
    id: 1,
    description: "breakfast"
};

const updatedMeal = {
    ...meal, // spread operator - copies all (shallow)
    calories: 600,
    description: "brunch"
};
console.log(updatedMeal);

// destructuring, same names are required
const {description, calories} = updatedMeal;
// console.log(description);
// console.log(calories);

// spread will collect rest of properties
const {id, ...mealWithoutId} = updatedMeal;
console.log(mealWithoutId);


// arrays:
const data = [1,2,3,4];
const updateData = [123, ...data];
console.log('updated with spread: ' +updateData); // 123, 1,2,3,4
console.log('map: ' +data.map(x => 2*x));
console.log('reduce: ' +data.reduce((accumulated, current) => accumulated+current));
console.log('reduce z initem: ' +data.reduce((accumulated, current) => accumulated+current, 50));
console.log('\n');

// oceny:
// >= 90 -> A
// >= 80 -> B
// >= 70 -> C
// >= 60 -> D
// >= 50 -> E
// < 50 -> F
const mapToGrade = (score) => {
    if(score >= 90) return 'A';
    else if(score >= 80) return 'B';
    else if(score >= 70) return 'C';
    else if(score >= 60) return 'D';
    else if(score >= 50) return 'E';
    else return 'F';
}

const procenty = [60,55,80,90,99,92,75,72];
console.log('procenty: ' +procenty);
console.log('oceny: ' +procenty.map(mapToGrade));
console.log('srednia: ' +procenty.reduce((a,b) => a+b)/procenty.length);

// ============ sumarizeGrades - reduce
function groupByGrade(acc, score) {
    const {A=0,B=0,C=0,D=0,E=0,F=0} = acc; // unpack grades with defaults
    if (score >= 90) return {...acc, A: A+1};
    else if (score >= 80) return {...acc, B: B+1};
    else if (score >= 70) return {...acc, C: C+1};
    else if (score >= 60) return {...acc, D: D+1};
    else if (score >= 50) return {...acc, E: E+1};
    else return {...acc, F: F+1};
}
const defaultAccumulator = {};
console.log('podsumowanie ocen:');
console.log(procenty.reduce(groupByGrade, defaultAccumulator));


// higher order function
// fun that takes another function as param or returns a function


//========== currying (using closure) and partial application
// A curried function is a function that takes multiple arguments one at a time - using closure
function greeting(greeting, name) {
    return `${greeting} ${name}`;
}
// but how to apply that to list of people?
// how to prepopulate function with argument?
const friends = ['Nate', 'Jim', 'Bob', 'Foo'];

// predefine using lambda - specialized application
const greet = friend => greeting('Hi there', friend); // return a function result with closured param friend

// or return a function
function greet2(greeting){
    return function(name) {
        return `${greeting} ${name}`;
    }
}

const greet2Lambda = (greeting) => (name) => `${greeting} ${name}`;

console.log(friends.map(greet)); //[ 'Hi there Nate', 'Hi there Jim', 'Hi there Bob', 'Hi there Foo' ]
// partial application
console.log(friends.map(greet2('Yo my man'))); //[ 'Yo my man Nate', 'Yo my man Jim', 'Yo my man Bob', 'Yo my man Foo' ]
console.log(friends.map(greet2Lambda('Yo my man'))); //[ 'Yo my man Nate', 'Yo my man Jim', 'Yo my man Bob', 'Yo my man Foo' ]
console.log(greet2Lambda('hi there')('bob'));
console.log('\n');

// currying - creating functions
// partial application - using functions with prepopulated data

// partial application without currying - using helper high order function
// keep in mind order of params!

const add = (a,b) => a+b;
const partial = (fun, param) => (otherParam) => fun(param, otherParam);
const add3 = partial(add, 3);
console.log(add3(2));


// pure functions - have input params, no state, no side effects, returns something only based on input
// impure functions (procedures)

// impure:
let cnt = 0;
function inc() {
    cnt++;
}

// pure
function increment(counter) {
    return counter + 1;
}


// ================== function composition
// use curry to compose functions
const compose = (fun1, fun2) => (arg) => fun2(fun1(arg));
const slice = (apple) => 'sliced '+ apple
const bake = (slicedApple) => 'baked '+ slicedApple
const makePie = compose(bake, slice);
const pie = makePie('apple');
console.log(pie);
console.log('\n');

// solve that using composition:
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
const wordList = lorem.split(' ');
const wordCount = wordList.length;
console.log('word count: ' + wordCount);

const split = (splitter) => (word) => word.split(splitter);
const count = (words) => words.length;
console.log('word count composed: ' + compose(split(' '), count)(lorem));