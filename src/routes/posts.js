'use strict';

const Router = require('koa-router');
const router = Router();
const postCtrl = require('../controllers/post');
const postValidation = require('../validations/post');
const { validate, auth } = require('../middlewares');

router.prefix('/posts');

/** 获取文章列表 */
router.get('/', validate(postValidation.getPosts), postCtrl.getList);

/** 获取文章详情 */
router.get('/:id', validate(postValidation.getPost), postCtrl.get);

/** 新增文章 */
router.post('/', auth, validate(postValidation.createPost), postCtrl.create);

/** 更新文章 */
router.patch('/:id', auth, validate(postValidation.updatePost), postCtrl.update);

/** 删除文章 */
router.delete('/:id', auth, validate(postValidation.deletePost), postCtrl.remove);

module.exports = router;
