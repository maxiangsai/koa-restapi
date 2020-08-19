'use strict';

const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const { SECRET } = process.env;

// 验证token获取userId
const tokenVerify = async (ctx, next) => {
  console.log(ctx.state);
  const token = ctx.get('Authorization');
  if (!token) {
    const err = new APIError(httpStatus.BAD_REQUEST, 'token不能为空!', true);
    ctx.throw(err);
  }
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET);
  } catch (error) {
    const err = new APIError(httpStatus.BAD_REQUEST, 'token已失效!', true);
    ctx.throw(err);
  }
  ctx.state.user = {
    userId: decoded.userId,
    username: decoded.username
  };
  next();
};

module.exports = tokenVerify;
