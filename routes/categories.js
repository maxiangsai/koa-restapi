'use strict';

const router = require('koa-router')();
const CategoryCtrl = require('../controllers/category');

router.prefix('/categories');

/** 获取分类列表 */
router.get('/', CategoryCtrl.getList);

// /** 新增文章 */
router.post('/', CategoryCtrl.create);

// /** 更新文章 */
// router.patch('/:id', async ctx => {
//   ctx.body = {
//     title: '更新文章'
//   }
// })

// /** 删除文章 */
// router.delete('/', async ctx => {})

module.exports = router;
