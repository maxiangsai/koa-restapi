'use strict';

const jwt = require('jsonwebtoken');
const { SECRET, EXPIRESIN } = process.env;

exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    userId: user.id
  }, SECRET, {
    expiresIn: EXPIRESIN
  });
  return token;
};
