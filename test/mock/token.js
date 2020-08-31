'use strict';

const { sign } = require('../../src/lib/passport');
const { userOne } = require('./user');

const userOneToken = sign(userOne);

module.exports = {
  userOneToken
};
