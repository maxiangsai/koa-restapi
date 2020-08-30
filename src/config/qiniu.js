'use strict';

const qiniu = require('qiniu');
const { QINIU: { ak, sk } } = require('./index');
// 创建上传凭证
const bucket = 'blog';
const EXPIRES = 9000; // 1小时
const mac = new qiniu.auth.digest.Mac(ak, sk);

// 构建上传策略
function uptoken(key) {
  const options = {
    scope: `${bucket}:${key}`,
    expires: EXPIRES
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
}

module.exports = uptoken;
