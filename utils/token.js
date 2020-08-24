'use strict';

const jwt = require('jsonwebtoken');
const { JWT: { secret, expiresIn } } = require('../config');

exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    userId: user.id
  }, secret, {
    expiresIn
  });
  return token;
};
