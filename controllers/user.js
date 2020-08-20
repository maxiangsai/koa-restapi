'use strict';

const User = require('../models/user');
const httpStatus = require('http-status');
const { sign } = require('../utils/token');

exports.get = async ctx => {
  const {
    username, access, avatar
  } = await User.get(ctx.params.id);
  ctx.body = {
    code: 1,
    data: { username, access, avatar }
  };
};

exports.getList = async ctx => {
  const list = await User.find({});
  ctx.body = {
    code: 1,
    data: list
  };
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
  const user = await User.findOne({ username });
  if (!user) {
    ctx.throw(httpStatus.NOT_FOUND, '用户不存在');
  }

  try {
    await User.decryptPwd(password, user.password);
  } catch (error) {
    ctx.throw(error);
  }
  ctx.body = {
    code: 1,
    data: sign(user)
  };
};
