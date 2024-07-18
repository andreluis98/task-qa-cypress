// userRepository.js
const mongo = require('mongodb');

class UserRepository {
    constructor(collection) {
        this.collection = collection;
    }

    async find(id) {
        return await this.collection.findOne({
            _id: new mongo.ObjectId(id)
        });
    }

    async findAll() {
        const result = await this.collection.find({});
        return result.toArray();
    }

    async create(user) {
        await this.collection.insertOne(user);
        return user;
    }

    async update(id, data) {
        const result = await this.collection.updateOne(
            { _id: new mongo.ObjectId(id) },
            { $set: data }
        );
        return result;
    }

    async delete(id) {
        const result = await this.collection.deleteOne({
            _id: new mongo.ObjectId(id)
        });
        return result;
    }

    async deleteAll(id){
        await this.collection.deleteMany({});
    }
}

module.exports = UserRepository;
