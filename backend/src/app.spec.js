// app.spec.js
const app = require('./app');
const request = require('supertest')(app);
const UserRepository = require('./userRepository');
const { MongoClient } = require('mongodb');
const mongo = require('mongodb');

describe('User API', () => {
    let client;
    let collection;
    let repository;

    beforeAll(async () => {
        const dsn = 'mongodb://root:root@localhost/?retryWrites=true&writeConcern=majority';
        client = new MongoClient(dsn);
        collection = client.db('users_db').collection('users');
        repository = new UserRepository(collection);
        await client.connect();
    });

    afterAll(() => {
        client.close();
    });

    beforeEach(async () => {
        await collection.deleteMany({});
    });

    test.only('Listar todos os usuários', async () => {
        await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });

        const response = await request.get('/users')
            .expect('Content-type', /application\/json/);

        expect(response.ok).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body).toStrictEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Andre Luis',
                email: 'andre.luis@pucminas.com'
            })
        ]));
    });

    test('Detalhar um usuário', async () => {
        const newUser = await repository.create({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password@123'
        });

        const response = await request.get(`/users/${newUser._id}`)
            .expect('Content-type', /application\/json/);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            _id: newUser._id.toString(),
            name: 'Jane Doe',
            email: 'jane.doe@example.com'
        });
    });

    test('Detalhar um usuário que não existe retorna 404', async () => {
        const response = await request.get('/users/123')
            .expect('Content-type', /application\/json/);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            error: 404,
            message: 'UserNotFound'
        });
    });

    test('Criar um novo usuário', async () => {
        const newUser = {
            name: 'Sam Smith',
            email: 'sam.smith@example.com',
            password: 'password@123'
        };

        const response = await request.post('/users')
            .send(newUser)
            .expect('Content-type', /application\/json/);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newUser));
        expect(response.body._id).toBeDefined();
    });

    test('Atualizar um usuário existente', async () => {
        const newUser = await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });

        const updatedData = {
            name: 'John Updated',
            email: 'john.updated@example.com'
        };

        const response = await request.put(`/users/${newUser._id}`)
            .send(updatedData)
            .expect('Content-type', /application\/json/);

        expect(response.statusCode).toBe(200);

        const updatedUser = await repository.find(newUser._id.toString());
        expect(updatedUser).toEqual(expect.objectContaining(updatedData));
    });

    test('Atualizar um usuário inexistente retorna 404', async () => {
        const response = await request.put('/users/123')
            .send({
                name: 'Non Existing',
                email: 'non.existing@example.com'
            })
            .expect('Content-type', /application\/json/);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            error: 404,
            message: 'UserNotFound'
        });
    });

    test('Remover um usuário existente', async () => {
        const newUser = await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });

        const response = await request.delete(`/users/${newUser._id}`)
            .expect(204);

        const deletedUser = await repository.find(newUser._id.toString());
        expect(deletedUser).toBeNull();
    });

    test('Remover um usuário inexistente retorna 404', async () => {
        const response = await request.delete('/users/123')
            .expect(404);

        expect(response.body).toEqual({
            error: 404,
            message: 'UserNotFound'
        });
    });
});
