'use strict';

/**
 * @extends 错误处理类
 */
class ExtendableError extends Error {
  constructor(status, message, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
  }
}

/**
 * @param {number} status
 * @param {string} message
 */
class APIError extends ExtendableError {
  constructor(status = 500, message = '服务器错误', isPublic = false) {
    super(status, message, isPublic);
  }
}

module.exports = APIError;
