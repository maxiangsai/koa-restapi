'use strict';

const router = require('koa-router')();
const postCtrl = require('../controllers/post');

router.prefix('/posts');

/** 获取文章列表 */
router.get('/', postCtrl.getList);

/** 获取文章详情 */
router.get('/:id', postCtrl.get);

/** 新增文章 */
router.post('/', postCtrl.create);

/** 更新文章 */
router.patch('/:id', postCtrl.update);

/** 删除文章 */
router.delete('/', postCtrl.remove);

module.exports = router;
