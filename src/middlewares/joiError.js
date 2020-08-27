'use strict';

module.exports = async (ctx, next) => {
  if (ctx.invalid) {
    ctx.status = 400;
    ctx.body = {
      code: 0,
      message: ctx.invalid.type instanceof Error ? ctx.invalid.type.msg : ctx.invalid.body.msg
    };
  } else await next();
};
