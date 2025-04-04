// const http = require('http'); // CommonJS => uso de require
import http from 'node:http'; // ESModule => uso de import
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js';
import {Database} from "./database.js";

const users = [] // Stateful
const database = new Database('users');

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        const users = database.select('users');
        return res
            .end(JSON.stringify(users))
    }
    
    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user);

        return res
            .writeHead(201)
            .end();
    }

    return res
        .writeHead(404)
        .end()
});

server.listen(3333);