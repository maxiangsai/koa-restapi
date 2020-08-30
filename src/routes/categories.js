'use strict';

const Router = require('koa-router');
const router = Router();
const CategoryCtrl = require('../controllers/category');
const categoryValidation = require('../validations/category');
const { validate, auth } = require('../middlewares');

router.prefix('/categories');

/** 获取分类列表 */
router.get('/', CategoryCtrl.getList);

// /** 新增分类 */
router.post('/', auth, validate(categoryValidation.createCategory), CategoryCtrl.create);

// /** 更新分类 */
router.patch('/:id', auth, validate(categoryValidation.update), CategoryCtrl.update);

// /** 删除分类 */
router.delete('/:id', auth, validate(categoryValidation.delete), CategoryCtrl.remove);

module.exports = router;
