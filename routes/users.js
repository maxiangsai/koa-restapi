'use strict';

const userCtrl = require('../controllers/user');
const router = require('koa-router')();

router.prefix('/users');
/**
 * 获取用户信息
 */
router.get('/:id', userCtrl.get);
router.post('/', userCtrl.create);

router.post('/login', userCtrl.login);

router.get('/bar', async (ctx) => {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
