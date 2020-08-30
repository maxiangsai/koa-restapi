'use strict';

const passport = require('koa-passport');

const auth = async (ctx, next) => {
  await passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        message: 'token失效'
      };
    } else {
      console.log('user---', user);
      ctx.state.user = user;
      return next();
    }
  })(ctx, next);
};

module.exports = auth;
