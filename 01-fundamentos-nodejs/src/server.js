// const http = require('http'); // CommonJS => uso de require
import http from 'node:http'; // ESModule => uso de import


const users = [] // Stateful

const server = http.createServer((req, res) => {

    const { method, url } = req

    if (method == 'GET' && url == '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }
    
    if (method == 'POST' && url == '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        });

        return res
            .setHeader('Content-type', 'application/json')
            .writeHead(201)
            .end();
    }

    return res
        .writeHead(404)
        .end()
});

server.listen(3333);