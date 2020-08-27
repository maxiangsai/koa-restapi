'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const User = require('../../src/models/user');

function hashedPassword(psw) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(psw, salt);
}

const password = 'password1';

const userOne = {
  _id: mongoose.Types.ObjectId(),
  username: faker.name.findName(),
  password,
  role: 'user'
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  username: faker.name.findName(),
  password,
  role: 'user'
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  username: faker.name.findName(),
  password,
  role: 'admin'
};

const insertUser = async (users) => {
  await User.insertMany(users.map(user => ({ ...user, password: hashedPassword(user.password) })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUser
};
