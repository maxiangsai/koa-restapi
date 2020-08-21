'use strict';

const Category = require('../models/category');

exports.getList = async (ctx) => {
  const list = await Category.list();
  ctx.body = {
    code: 1,
    data: list
  };
};

exports.create = async ctx => {
  const { body } = ctx.request;

  const isExist = await Category.isExist(body);
  if (isExist) ctx.throw(400, '该分类已存在');

  const category = new Category(body);
  const data = await category.save();
  ctx.body = {
    code: 1,
    data
  };
};

exports.update = async (ctx) => {
  const { id, ...rest } = ctx.request.body;
  const data = await Category.findByIdAndUpdate(id, rest, { new: true });
  ctx.body = {
    code: 1,
    data
  };
};

exports.remove = async ctx => {
  const { body } = ctx.request;
  await Category.findByIdAndRemove(body.id);
  ctx.body = {
    code: 1,
    data: null
  };
};
