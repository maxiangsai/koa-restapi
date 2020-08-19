'use strict';

const User = require('../models/user');
const httpStatus = require('http-status');
const { sign } = require('jsonwebtoken');

exports.get = async ctx => {
  const {
    username, password, access, avatar
  } = await User.get(ctx.params.id);
  console.log(username, password);
};

exports.create = async (ctx) => {
  const { body: { username, password } } = ctx.request;
  try {
    const user = new User({
      username,
      password
    });
    const savedUser = await user.save();
    ctx.body = {
      code: 1,
      data: savedUser
    };
  } catch (error) {
    ctx.throw(error);
  }
};

/**
 * 用户登录
 */
exports.login = async (ctx) => {
  const { body: { username, password } } = ctx.request;
  console.log(ctx.request.body);
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) {
    ctx.throw(httpStatus.NOT_FOUND, '用户不存在');
  }

  User.decryptPwd(password, user.password)
    .then(() => {
      ctx.body = {
        code: 1,
        data: sign(user)
      };
    })
    .catch(err => {
      console.log('错误', err);
      ctx.throw(err);
    });
};
