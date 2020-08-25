'use strict';

const jwt = require('koa-jwt');
const { JWT: { secret } } = require('../config');

module.exports = jwt({
  secret
}).unless({
  method: 'GET',
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  path: [/^\/users\/login/, /^\/users\/register/]
});
