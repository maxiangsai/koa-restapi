'use strict';

const Joi = require('@hapi/joi');
const { objectId } = require('./custom');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin')
  })
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  })
};

const getUsers = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

// const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId)
//   }),
//   body: Joi.object()
//     .keys({
//       username: Joi.string(),
//       password: Joi.string()
//     })
//     .min(1)
// };

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  deleteUser
};
