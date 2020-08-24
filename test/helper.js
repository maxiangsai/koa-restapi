'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { DB } = require('../config');

let mongoServer;

before(async () => {
  try {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, DB.options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

after(async ()=> {
  await mongoose.disconnect();
  await mongoServer.stop();
});
