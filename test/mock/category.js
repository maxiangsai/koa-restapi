'use strict';

const mongoose = require('mongoose');
const faker = require('faker');
const { Category } = require('../../src/models');

const categoryOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.word()
};

const categoryTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.lorem.word()
};

const insertCategory = async (categories) => {
  await Category.insertMany(categories);
};

module.exports = {
  categoryOne,
  categoryTwo,
  insertCategory
};
