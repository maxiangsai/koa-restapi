'use strict';

const Router = require('koa-router');
const router = Router();
const CategoryCtrl = require('../controllers/category');
const categoryValidation = require('../validations/category');
const { validate, auth } = require('../middlewares');

router.prefix('/categories');

/** 获取分类列表 */
router.get('/', CategoryCtrl.getList);

// /** 新增文章 */
router.post('/', auth, validate(categoryValidation.createCategory), CategoryCtrl.create);

// /** 更新文章 */
router.patch('/:id', auth, validate(categoryValidation.update), CategoryCtrl.update);

// /** 删除文章 */
router.delete('/:id', auth, validate(categoryValidation.delete), CategoryCtrl.remove);

module.exports = router;
