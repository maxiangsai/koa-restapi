'use strict';

const { sign } = require('../../src/utils/token');
const { userOne } = require('./user');

const userOneToken = sign(userOne);

module.exports = {
  userOneToken
};
