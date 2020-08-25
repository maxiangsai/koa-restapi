'use strict';

const jwt = require('jsonwebtoken');
const { JWT: { secret, options } } = require('../config');

exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    userId: user.id
  }, secret, options);
  return token;
};
