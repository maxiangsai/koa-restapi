'use strict';

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: ['airbnb-base/legacy'],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'max-classes-per-file': ['error', 2],
    'max-len': ['error', 140]
  }
};
