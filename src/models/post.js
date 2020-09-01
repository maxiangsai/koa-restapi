'use strict';

const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

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

  description: {
    type: String,
    default: ''
  },

  cover: {
    type: String,
    required: true
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
  get(id) {
    return this.findById(id)
      .populate({
        path: 'categories',
        select: 'id name'
      }).catch(() => {});
  },

  async list(filter = { }, options = {}) {
    const pageSize = parseInt(options.pageSize, 10) || 10;
    const page = parseInt(options.page, 10) || 1;
    const skipCount = (page - 1) * pageSize;

    const countPromise = this.countDocuments(filter).exec();
    const docsPromise = this.find(filter)
      .skip(skipCount)
      .limit(pageSize)
      .populate({ path: 'categories', select: 'id name' })
      .sort({ _id: -1 })
      .exec();

    const [total, list] = await Promise.all([countPromise, docsPromise]);
    const totalPage = Math.ceil(total / pageSize);
    return Promise.resolve({ total, totalPage, list });
  }
};

PostSchema.plugin(toJSON);

module.exports = mongoose.model('Post', PostSchema);
