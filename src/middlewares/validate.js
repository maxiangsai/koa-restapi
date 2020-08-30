'use strict';

const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const validate = (schema) => async (ctx, next) => {
  const req = ctx.request;
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  console.log(object);
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    ctx.status = httpStatus.BAD_REQUEST;
    ctx.body = {
      code: 0,
      message: errorMessage
    };
  } else {
    Object.assign(req, value);
    await next();
  }
};

module.exports = validate;
