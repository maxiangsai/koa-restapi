'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

CategorySchema.statics = {
  isExist(body) {
    return this.findOne(body)
      .exec();
  },

  list() {
    return this.find({})
      .sort({
        _id: -1
      });
  }
};

module.exports = mongoose.model('Category', CategorySchema);
