const express = require('express');
const app = express();

const poorDb = [{ name: 'foo1', id: 0 },
    { name: 'foo2', id: 1 },
    { name: 'foo3', id: 2 }];

app.get('/', (req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(`<h2>Try http:GET /foo</h2>
                <h2>GET /foo/{id}</h2>`));
});

app.get('/foo', (req, resp) => {
    resp.json(poorDb);
});

app.get('/foo/:id', (req, resp) => {
    const id = req.params.id;
    resp.json(poorDb[id]);
});

app.listen(8080);