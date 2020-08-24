'use strict';

const users = require('./users');
const posts = require('./posts');
const categories = require('./categories');

module.exports = app => {
  app.use(users.middleware());
  app.use(posts.middleware());
  app.use(categories.middleware());
};
