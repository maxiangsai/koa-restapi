'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { DB } = require('../src/config');

let mongoServer;

function setUpMongoDB() {
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(mongoUri, DB.options);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

  afterAll(async ()=> {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany()));
  });
}

module.exports = setUpMongoDB;
