'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-joi-router');
const joiError = require('../middlewares/joiError');
const Joi = Router.Joi;
const router = Router();

const validate = {
  continueOnError: true,
  type: 'form',
  body: { username: Joi.string().required(), password: Joi.string().required() }
};

router.prefix('/users');

router.get('/:id', userCtrl.get);
// router.get('/', userCtrl.getList);

router.post('/register', { validate }, joiError, userCtrl.create);

router.post('/login', { validate }, joiError, userCtrl.login);

module.exports = router;
