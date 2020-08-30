'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-router');
const { validate } = require('../middlewares');
const userValidation = require('../validations/user');
const router = Router();

router.prefix('/users');

router.get('/:id', validate(userValidation.getUser), userCtrl.get);
router.post('/register', validate(userValidation.createUser), userCtrl.create);
router.post('/login', validate(userValidation.login), userCtrl.login);

module.exports = router;
