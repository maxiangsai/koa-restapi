'use strict';

require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const tokenVerify = require('./middlewares/verifyToken');
const initDB = require('./db');

const index = require('./routes/index');
const users = require('./routes/users');
const posts = require('./routes/posts');
const categories = require('./routes/categories');

initDB();

// error handler
onerror(app);

app.use(cors());
app.use(conditional());
app.use(etag());

app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError
          ? err.originalError.message
          : err.message
      };
    } else {
      throw err;
    }
  });
});
// app.use(tokenVerify);
app.use(jwt({
  secret: process.env.SECRET
}).unless({
  method: 'GET',
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  path: [/^\/users\/login/]
}));

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
// 开发日志
app.use(logger());

// 自定义logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(posts.routes(), posts.allowedMethods());
app.use(categories.routes(), categories.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.warn('-----------------');
  console.error(err.status, err, ctx);
});

module.exports = app;
