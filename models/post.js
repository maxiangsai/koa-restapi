'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  description: String,

  cover: {
    type: String,
    default: 'http://img.ydman.cn/img_1.jpg'
  },

  categories: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },

  state: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

PostSchema.statics = {
  async get(id) {
    const post = await this.findById(id)
      .populate({
        path: 'categories',
        select: 'id name'
      });
    if (post) {
      return post;
    }
    throw new Error(404);
  },

  async list({
    page = 1,
    pageSize = 10,
    state = 1
  } = {}) {
    const skipCount = (page - 1) * pageSize;
    const searchFn = this.find({
      state
    }).skip(skipCount).limit(Number(pageSize)).populate({
      path: 'categories',
      select: 'id name'
    })
      .sort({ _id: -1 });

    const [total, list] = await Promise.all([this.count({}), searchFn]);
    return Promise.resolve({ total, list });
  }
};

module.exports = mongoose.model('Post', PostSchema);
