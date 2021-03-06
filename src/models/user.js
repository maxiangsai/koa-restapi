'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { roles } = require('../config/roles');
const { toJSON } = require('./plugins');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // validate(value) {
    //   if (!value.match(/[a-zA-Z0-9]/)) {
    //     throw new Error('Password必须为字母或数字');
    //   }
    // },
    private: true
  },
  avatar: {
    type: String,
    default: 'http://img.ydman.cn/avatar.jpg'
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  }
}, {
  timestamps: true
});

UserSchema.statics = {
  /**
   * 根据用户id查找用户
   * @param {number} id
   */
  get(id) {
    return this.findById(id)
      .catch(() => {});
  },

  /**
   * 解密
   * @param {*} inputPwd
   */
  decryptPwd(inputPwd, password) {
    return bcrypt.compare(inputPwd, password)
      .then(isMatch => {
        if (isMatch) {
          return Promise.resolve();
        }
        const err = new APIError(httpStatus.BAD_REQUEST, '用户名或者密码错误!', true);
        return Promise.reject(err);
      });
  }
};

UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * 保存用户信息前进行密码加密
 */
const saltRounds = 10;
UserSchema.pre('save', function preSave(next) {
  const user = this;
  bcrypt.genSalt(saltRounds, async (error, salt) => {
    if (error) throw error;
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(toJSON);

module.exports = mongoose.model('User', UserSchema);
