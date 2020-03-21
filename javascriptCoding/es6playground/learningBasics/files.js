// included in node
const fs = require('fs');
const readline = require('readline');

// read all
// fs.readFile('sum.js', (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// read line by line
const readInterface = readline.createInterface({
    input: fs.createReadStream('sum.js')
})

readInterface.on('line', line => {
    console.log(line);
    console.log('===');
});