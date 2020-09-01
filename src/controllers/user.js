'use strict';

const User = require('../models/user');
const { sign } = require('../lib/passport');
const httpStatus = require('http-status');

exports.get = async ctx => {
  const user = await User.get(ctx.params.id);
  if (user) {
    ctx.body = {
      code: 1,
      data: user
    };
  } else {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: 0,
      message: '该用户不存在'
    };
  }
};

exports.getUserInfo = async ctx => {
  ctx.body = {
    code: 1,
    data: ctx.state.user
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
  const { body } = ctx.request;
  try {
    const user = new User(body);
    const data = await user.save();
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.status = httpStatus.BAD_REQUEST;
    ctx.body = {
      code: 0,
      message: error.message
    };
  }
};

/**
 * 用户登录
 */
exports.login = async (ctx) => {
  const { body: { username, password } } = ctx.request;
  const user = await User.findOne({ username });
  if (!user) {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: 0,
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
      message: error.message
    };
  }
};
