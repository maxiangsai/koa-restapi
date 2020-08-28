'use strict';

const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

CategorySchema.statics = {
  isExist(body) {
    return this.findOne(body)
      .catch((err) => {
        console.log(err);
      });
  },

  async list() {
    return this.find({})
      .sort({
        _id: -1
      }).exec();
  }
};

CategorySchema.plugin(toJSON);

module.exports = mongoose.model('Category', CategorySchema);
