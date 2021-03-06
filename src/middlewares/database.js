'use strict';

const debug = require('debug')('app:mongoose');
const mongoose = require('mongoose');
const { NODE_ENV, DB } = require('../config');

module.exports = () => {
  if (NODE_ENV !== 'test') {
    mongoose
      .connect(DB.uri, DB.options)
      .then(() => {
        debug(`MongoDB connected on ${NODE_ENV} mode, at ${DB.uri}`);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  }

  return function (ctx, next) {
    return next();
  };
};
