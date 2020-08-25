'use strict';

const Router = require('koa-joi-router');
const Joi = Router.Joi;
const router = Router();
const postCtrl = require('../controllers/post');

router.prefix('/posts');

/** 获取文章列表 */
router.get('/', { validate: { continueOnError: true, query: { page: Joi.number(), pageSize: Joi.number() } } }, postCtrl.getList);

/** 获取文章详情 */
router.get('/:id', postCtrl.get);

/** 新增文章 */
router.post('/', { validate: { continueOnError: true, type: 'form', body: { title: Joi.string().required(), content: Joi.string().required(), state: Joi.number() } } }, postCtrl.create);

/** 更新文章 */
router.patch('/:id', { validate: { continueOnError: true, type: 'json', body: { title: Joi.string().required(), content: Joi.string().required(), state: Joi.number() } } }, postCtrl.update);

/** 删除文章 */
router.delete('/:id', postCtrl.remove);

module.exports = router;
