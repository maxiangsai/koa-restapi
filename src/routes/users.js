'use strict';

const userCtrl = require('../controllers/user');
const Router = require('koa-joi-router');
const joiError = require('../middlewares/joiError');
const Joi = Router.Joi;
const router = Router();

router.prefix('/users');

router.get('/:id', userCtrl.get);
// router.get('/', userCtrl.getList);

router.post('/register', {
  validate: {
    continueOnError: true,
    type: 'form',
    body: { username: Joi.string().required(), password: Joi.string().required(), role: Joi.string().required().valid('user', 'admin') }
  }
}, joiError, userCtrl.create);

router.post('/login', {
  validate: {
    continueOnError: true,
    type: 'form',
    body: { username: Joi.string().required(), password: Joi.string().required() }
  }
}, joiError, userCtrl.login);

module.exports = router;
