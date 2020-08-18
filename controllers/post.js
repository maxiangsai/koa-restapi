'use strict';

const Post = require('../models/post');

/**
 * 创建文章
 */
exports.create = async (ctx) => {
  try {
    const post = new Post(ctx.request.body);
    const data = await post.save();
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.throw(error);
  }
};

/**
 * 更新文章
 */
exports.update = async (ctx) => {
  const { id, ...rest } = ctx.request.body;
  try {
    const data = await Post.findByIdAndUpdate(id, rest, { new: true });
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.get = async ctx => {
  try {
    const data = await Post.get(ctx.params.id);
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.throw(error);
  }
};

/**
 * 获取文章列表
 * @param {*} ctx
 * @param {*} next
 */
exports.getList = async (ctx) => {
  try {
    const { page, pageSize, state } = ctx.query;
    const { total, list } = await Post.list({ page, pageSize, state });
    ctx.body = {
      code: 1,
      data: {
        total,
        list
      }
    };
  } catch (error) {
    ctx.throw(error);
  }
};

/**
 * 删除文章
 * @param {*} ctx
 * @param {*} next
 */
exports.remove = async (ctx) => {
  try {
    const { body } = ctx.request;
    await Post.findByIdAndRemove(body.id);
    ctx.body = {
      code: 1,
      data: null
    };
  } catch (error) {
    ctx.throw(error);
  }
};
