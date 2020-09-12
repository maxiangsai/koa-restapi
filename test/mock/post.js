'use strict';

const mongoose = require('mongoose');
const faker = require('faker');
const Post = require('../../src/models/post');

const postOne = {
  _id: mongoose.Types.ObjectId(),
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  description: faker.lorem.words(),
  cover: faker.image.imageUrl(),
  state: 1
};

const postTwo = {
  _id: mongoose.Types.ObjectId(),
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
  description: faker.lorem.words(),
  cover: faker.image.imageUrl(),
  state: 0
};

const insertPost = async (posts) => {
  await Post.insertMany(posts);
};

module.exports = {
  postOne,
  postTwo,
  insertPost
};
