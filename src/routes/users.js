'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-router');
const { validate, auth } = require('../middlewares');
const userValidation = require('../validations/user');
const router = Router();

router.get('/users/:id', validate(userValidation.getUser), userCtrl.get);
router.get('/getUserInfo', auth, userCtrl.getUserInfo);
router.post('/users/register', validate(userValidation.createUser), userCtrl.create);
router.post('/users/login', validate(userValidation.login), userCtrl.login);

module.exports = router;
