'use strict';

module.exports = async (ctx, next) => {
  if (ctx.invalid) {
    ctx.status = ctx.invalid.body.status;
    ctx.body = {
      code: 0,
      message: ctx.invalid.body.msg
    };
  } else await next();
};
