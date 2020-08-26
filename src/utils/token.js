'use strict';

const jwt = require('jsonwebtoken');
const { JWT: { secret, options } } = require('../config');

exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    password: user.password
  }, secret, options);
  return token;
};
