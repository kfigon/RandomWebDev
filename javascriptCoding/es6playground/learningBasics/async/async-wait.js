// syntactic sugar for promises

const oldWay = () => new Promise((resolve, reject) => resolve('hooray!'));
// async function newWay(){}
// wrap all content in promise
const newWay = async () => setTimeout(()=> console.log('fii'),2000);

// await - mark for promise to get result. make async as `sync`. Nie jest
// synchronicznie, pod spodem to promisy

// catch wtedy trzeba zrobic try{}catch(){}


// oldWay()
// .then(data => console.log('worked', data))
// .catch(err => console.log('error', err));

newWay()
.then(data => console.log('worked'))
.catch(err => console.log('error', err));