'use strict';

const Joi = require('@hapi/joi');
const { objectId } = require('./custom');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().required(),
    categories: Joi.array().items(Joi.required().custom(objectId)),
    state: Joi.number().integer().valid(0, 1)
  })
};

const getPosts = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    pageSize: Joi.number().integer()
  })
};

const getPost = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  })
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    description: Joi.string(),
    cover: Joi.string(),
    categories: Joi.array().items(Joi.required().custom(objectId)),
    state: Joi.number().integer().valid(0, 1)
  })
    .min(1)
};

const deletePost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
};
