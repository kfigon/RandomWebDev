const http = require('http');

http.createServer((request, response) => {
    response.write('hello from node!');
    response.end();
}).listen(8080);
// localhost:8080