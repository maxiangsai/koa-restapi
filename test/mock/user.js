'use strict';

const bcrypt = require('bcryptjs');
const User = require('../../src/models/user');

const password = 'xxxxx';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  username: '111',
  password
};

const insertUser = async (user) => {
  await User.insert({ ...user, password: hashedPassword });
};

module.exports = {
  userOne,
  insertUser
};
