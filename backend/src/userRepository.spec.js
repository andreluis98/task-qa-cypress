// userRepository.spec.js
const UserRepository = require('./userRepository');
const { MongoClient } = require('mongodb');
const mongo = require('mongodb');

describe('UserRepository', () => {
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

    test('Procurar por um usuário', async () => {
        const newUser = await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });

        const user = await repository.find(newUser._id.toString());

        expect(user).toEqual(expect.objectContaining({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com'
        }));
    });

    test('Listar todos os usuários', async () => {
        await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: 'password@123'
        });

        const users = await repository.findAll();

        expect(users.length).toBe(1);
        expect(users[0]).toEqual(expect.objectContaining({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com'
        }));
    });

    test('Criar um novo usuário', async () => {
        const newUser = {
            name: 'Ana Beatriz',
            email: 'ana.beatriz@pucminas.com',
            password: 'password@123'
        };

        const user = await repository.create(newUser);

        expect(user).toEqual(expect.objectContaining(newUser));
    });

    test('Atualizar um usuário', async () => {
        const newUser = await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: '123456789'
        });

        const updatedData = {
            name: 'Andre Ferreira',
            email: 'andre.ferreira@pucminas.com'
        };

        const result = await repository.update(newUser._id.toString(), updatedData);

        expect(result.modifiedCount).toBe(1);

        const updatedUser = await repository.find(newUser._id.toString());
        expect(updatedUser).toEqual(expect.objectContaining(updatedData));
    });

    test('Remover um usuário', async () => {
        const newUser = await repository.create({
            name: 'Andre Luis',
            email: 'andre.luis@pucminas.com',
            password: '123456789'
        });

        const result = await repository.delete(newUser._id.toString());

        expect(result.deletedCount).toBe(1);

        const deletedUser = await repository.find(newUser._id.toString());
        expect(deletedUser).toBeNull();
    });
});
