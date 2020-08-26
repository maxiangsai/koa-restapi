'use strict';

const User = require('../models/user');
const { sign } = require('../utils/token');

exports.get = async ctx => {
  const user = await User.get(ctx.params.id);
  console.log(user);
  if (user) {
    const { username, access, avatar } = user;
    ctx.body = {
      code: 1,
      data: { username, access, avatar }
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      code: 0,
      data: null,
      message: '该用户不存在'
    };
  }
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
  console.log(password);
  const user = new User({
    username,
    password
  });
  try {
    await user.save();
    ctx.body = {
      code: 1,
      data: user
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * 用户登录
 */
exports.login = async (ctx) => {
  const { body: { username, password } } = ctx.request;
  const user = await User.findOne({ username });
  if (!user) {
    ctx.status = 404;
    ctx.body = {
      code: 0,
      data: null,
      message: '该用户未注册'
    };
    return;
  }

  try {
    await User.decryptPwd(password, user.password);
    ctx.body = {
      code: 1,
      data: sign(user)
    };
  } catch (error) {
    ctx.status = error.status;
    ctx.body = {
      code: 0,
      data: null,
      message: error.message
    };
  }
};
