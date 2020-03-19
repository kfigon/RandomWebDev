// standalone does not work in node, works in browser
// for node need npm install node-fetch

// jsonplaceholder - mozna pobierac dowolnego jsona

const fetch = require('node-fetch');


fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => {
     console.log(json);
     return json;
  });
