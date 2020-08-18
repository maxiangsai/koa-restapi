'use strict';

const router = require('koa-router')();

router.prefix('/users');

router.get('/', async (ctx) => {
  ctx.body = 'this is a users response!';
});

router.get('/bar', async (ctx) => {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
