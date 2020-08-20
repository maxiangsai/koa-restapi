'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-joi-router');
const Joi = Router.Joi;
const router = Router();

router.prefix('/users');

router.get('/:id', userCtrl.get);
// router.get('/', userCtrl.getList);

router.post('/register', { validate: { type: 'form', body: { username: Joi.string().required(), password: Joi.string().required() } } }, userCtrl.create);

router.post('/login', { validate: { type: 'form', body: { username: Joi.string().required(), password: Joi.string().required() } } }, userCtrl.login);

module.exports = router;
