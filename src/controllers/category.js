'use strict';

const Category = require('../models/category');
const httpStatus = require('http-status');

exports.getList = async (ctx) => {
  const list = await Category.list();
  ctx.body = {
    code: 1,
    data: {
      list
    }
  };
};

exports.create = async ctx => {
  const { body } = ctx.request;

  const isExist = await Category.isExist(body);
  if (isExist) {
    ctx.status = httpStatus.BAD_REQUEST;
    ctx.body = {
      code: 0,
      message: '该分类已存在'
    };
  } else {
    const category = new Category(body);
    const data = await category.save();
    ctx.body = {
      code: 1,
      data
    };
  }
};

exports.update = async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const category = await Category.findById(id);
  if (category) {
    Object.assign(category, body);
    await category.save();
    ctx.body = {
      code: 1,
      data: category
    };
  } else {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: 0,
      message: '该分类不存在'
    };
  }
};

exports.remove = async ctx => {
  const { id } = ctx.params;
  const category = await Category.findById(id);
  if (category) {
    await category.remove();
    ctx.body = {
      code: 1,
      data: category
    };
  } else {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: 0,
      message: '该分类不存在'
    };
  }
};
