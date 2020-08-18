'use strict';

const Category = require('../models/category');

exports.getList = async (ctx) => {
  try {
    const list = await Category.list();
    ctx.body = {
      code: 1,
      data: list
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.create = async ctx => {
  const { body } = ctx.request;
  if (!body.name) {
    ctx.throw(400, 'Bad Request');
  }

  const isExist = await Category.isExist(body);
  if (isExist) ctx.throw(400, '该分类已存在');

  try {
    const category = new Category(body);
    const data = await category.save();
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.update = async (ctx) => {
  const { id, ...rest } = ctx.request.body;
  try {
    const data = await Category.findByIdAndUpdate(id, rest, { new: true });
    ctx.body = {
      code: 1,
      data
    };
  } catch (error) {
    ctx.throw(error);
  }
};

exports.remove = async ctx => {
  try {
    const { body } = ctx.request;
    await Category.findByIdAndRemove(body.id);
    ctx.body = {
      code: 1,
      data: null
    };
  } catch (error) {
    ctx.throw(error);
  }
};
