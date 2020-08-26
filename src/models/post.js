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
  timestamps: true,
  versionKey: false
});

PostSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate({
        path: 'categories',
        select: 'id name'
      }).catch(() => {});
  },

  async list(options = {}, filter = {}) {
    const { state = 1 } = options;

    const pageSize = parseInt(options.pageSize, 10) || 10;
    const page = parseInt(options.page, 10) || 1;
    const skipCount = (page - 1) * pageSize;

    const countPromise = this.countDocuments(filter).exec();
    const docsPromise = this.find({ state }).skip(skipCount).limit(Number(pageSize)).populate({ path: 'categories', select: 'id name' })
      .sort({ _id: -1 });

    const [total, list] = await Promise.all([countPromise, docsPromise]);
    const totalPage = Math.ceil(total / pageSize);
    return Promise.resolve({ total, totalPage, list });
  }
};

module.exports = mongoose.model('Post', PostSchema);
