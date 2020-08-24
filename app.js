'use strict';

require('dotenv-flow').config({ path: './.env' });
const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('app:server');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const conditional = require('koa-conditional-get');
const eTag = require('koa-etag');
const cors = require('@koa/cors');
const jwt = require('./middlewares/jwt');
const db = require('./middlewares/database');
const { accessLogger, errorLogger } = require('./logger');
const config = require('./config');
const routes = require('./routes');

if (!config.IS_TEST) {
  app.use(logger());
}

app.use(db());
app.use(accessLogger());
app.use(cors(config.CORS));
app.use(conditional());
app.use(eTag());

app.use(function handle401(ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        message: err.originalError
          ? err.originalError.message
          : err.message
      };
    } else {
      throw err;
    }
  });
});
app.use(jwt);
// middleWares
app.use(bodyParser());
// routes
routes(app);

// error-handling
app.on('error', (err) => {
  errorLogger.error(err);
});

if (!module.parent) {
  app.listen(config.PORT, () => {
    debug(`Server start at ${config.PORT}`);
  });
}

module.exports = app;
