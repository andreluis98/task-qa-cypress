const express = require('express');
const UserRepository = require('./userRepository');
const { MongoClient } = require('mongodb');
const mongo = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    exposedHeaders: 'X-Total-Count'
}));
let client;

const isValidObjectId = (id) => {
    return mongo.ObjectId.isValid(id) && new mongo.ObjectId(id).toString() === id;
};

const createRepository = () => {
    const dsn = 'mongodb://root:root@localhost/?retryWrites=true&writeConcern=majority';
    client = new MongoClient(dsn);
    const collection = client.db('users_db').collection('users');
    return new UserRepository(collection);
};

const normalizeUser = (user) => {
    user.id = user._id;
    delete user._id;
    return user;
}

// listar os usuarios (R - read)
app.get('/users', async (req, res) => {
    const repository = createRepository();
    await client.connect();
    const users = await repository.findAll();
    res.setHeader('X-Total-Count', users.length);
    res.json(users.map(normalizeUser));
    client.close();
});

//Detalhar um usuario (R - Read)
app.get('/users/:id', async (req, res) => {
    if (req.params.id === '0') {
        res.status(404).json({
            error: 404,
            message: 'UserNotFound'
        });
    } else {
        const repository = createRepository();
        await client.connect();
        const users = await repository.find(req.params.id);
        res.json(normalizeUser(users));
        client.close();
    }
});

//Cadastrar um novo usuario (C- Create)
app.post('/users', async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(406).send({
            error: 406,
            message: 'ContentTypeNotSupported'
        });
        return;
    }

    const user = req.body;
    const repository = await createRepository();
    await client.connect();
    const users = await repository.create(user);
    res.status(201).json(normalizeUser(users));
    client.close();
});

//Editar um usuario (U - Update)
app.put('/users/:id', async (req, res) => {
    if(req.params.id === '0'){
        res.status(404).json({
            error: 404,
            message: 'EventNotFound'
    });
        return;
    }else {
        const repository = createRepository();
        await client.connect();
        const users = await repository.update(req.params.id, req.body);
        res.json(normalizeUser(users));
        client.close();
    }
});

//Remover um usuario (D - Delete)
app.delete('/users/:id', async (req, res) => {
    if(req.params.id === '0'){
        res.status(404).json({
            error: 404,
            message: 'EventNotFound'
    });
        return;
    }
    const repository = createRepository();
    await client.connect();
    await repository.delete(req.params.id);
    res.status(204).send();
    client.close();  
});

//Remover todos os usuario (D - Delete)
app.delete('/users', async (req, res) => {
    const repository = createRepository();
    await client.connect();
    await repository.deleteAll();
    res.status(204).send();
    client.close();  
});

module.exports = app;