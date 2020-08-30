'use strict';

const Router = require('koa-router');
const router = new Router();

const { auth } = require('../middlewares');
const uploadToken = require('../config/qiniu');

router.prefix('/upload');

router.post('/', auth, async (ctx) => {
  const token = uploadToken(ctx.query.key);
  ctx.body = {
    code: 1,
    data: token
  };
});

module.exports = router;
