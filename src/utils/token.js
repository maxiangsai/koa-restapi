'use strict';

const jwt = require('jsonwebtoken');
const { JWT: { secret, options } } = require('../config');

exports.sign = (user) => {
  const token = jwt.sign({
    userId: user._id,
    username: user.username
  }, secret, options);
  return token;
};
