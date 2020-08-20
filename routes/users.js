'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-joi-router');
const Joi = Router.Joi;
const router = Router();

const validate = {
  body: { type: 'form', body: { username: Joi.string().required(), password: Joi.string().required() } }
};

router.prefix('/users');

router.get('/:id', userCtrl.get);
// router.get('/', userCtrl.getList);

router.post('/register', { validate: validate.body }, userCtrl.create);

router.post('/login', { validate: validate.body }, userCtrl.login);

module.exports = router;
