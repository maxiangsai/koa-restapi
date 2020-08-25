'use strict';

const Router = require('koa-joi-router');
const Joi = Router.Joi;
const router = Router();
const CategoryCtrl = require('../controllers/category');

router.prefix('/categories');

/** 获取分类列表 */
router.get('/', CategoryCtrl.getList);

// /** 新增文章 */
router.post('/', { validate: { continueOnError: true, type: 'form', body: { name: Joi.string().required() } } }, CategoryCtrl.create);

// /** 更新文章 */
router.patch('/:id', CategoryCtrl.update);

// /** 删除文章 */
router.delete('/:id', CategoryCtrl.remove);

module.exports = router;
