'use strict';

const {
  NODE_ENV = 'development',
  PORT = 3000,
  MONGODB_URI,
  JWT_SECRET = 'sc3l9o4',
  JWT_EXPIRES_IN = '7d',
  QINIU_AK,
  QINIU_SK
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,

  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
  IS_TEST: NODE_ENV === 'test',

  DB: {
    uri: MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  JWT: {
    secret: JWT_SECRET,
    options: {
      expiresIn: JWT_EXPIRES_IN
    }
  },

  CORS: {
    origin: '*'
  },

  QINIU: {
    ak: QINIU_AK,
    sk: QINIU_SK
  }
};
