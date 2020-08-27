'use strict';

const Post = require('../models/post');
const httpStatus = require('http-status');

/**
 * 创建文章
 */
exports.create = async (ctx) => {
  const post = new Post(ctx.request.body);
  const data = await post.save();
  ctx.body = {
    code: 1,
    data
  };
};

/**
 * 更新文章
 */
exports.update = async (ctx) => {
  const { id, ...rest } = ctx.request.body;
  const data = await Post.findByIdAndUpdate(id, rest, { new: true });
  ctx.body = {
    code: 1,
    data
  };
};

exports.get = async ctx => {
  const post = await Post.get(ctx.params.id);
  if (post) {
    ctx.body = {
      code: 1,
      data: post
    };
  } else {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: 0,
      message: '文章不存在'
    };
  }
};

/**
 * 获取文章列表
 * @param {*} ctx
 * @param {*} next
 */
exports.getList = async ctx => {
  const { page, pageSize, state = 1 } = ctx.query;
  const data = await Post.list(
    { state },
    { page, pageSize }
  );
  ctx.body = {
    code: 1,
    data
  };
};

/**
 * 删除文章
 * @param {*} ctx
 * @param {*} next
 */
exports.remove = async (ctx) => {
  const { body } = ctx.request;
  await Post.findByIdAndRemove(body.id);
  ctx.body = {
    code: 1,
    data: null
  };
};
