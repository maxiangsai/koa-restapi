'use strict';

const Joi = require('@hapi/joi');
const { objectId } = require('./custom');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required()
  })
};

const getCategories = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    pageSize: Joi.number().integer()
  })
};

const get = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  })
};

const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    name: Joi.string().required()
  })
};

const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  getCategories,
  createCategory,
  get,
  update,
  deleteCategory
};
