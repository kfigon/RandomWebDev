const doShopping = () => new Promise((res, rej)=> res('got stuff'));
const cook = () => new Promise((res, rej)=> res('cooking good'));
const eat = () => new Promise((res, rej)=> res('eating stuff'));

const logResult = (data) =>  console.log('=========\nreceived:', data);

// or wait till all done with .all()
doShopping()
    .then((data) =>{
        logResult(data);
        console.log('done with first, second');
        return cook();
    })
    .then((data) =>{
        logResult(data);
        console.log('done with second');
        return eat();
    })
    .then((data) => {
        logResult(data);
        console.log('all done');
    })
    .catch(err => console.log('in case of error', err)); 
    // will catch all above
    // we can set catch above and continue with then()

    // .finally() - will run regarding of outcomes
console.log('starting this stuff!');
