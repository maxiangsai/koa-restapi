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

const passport = require('koa-passport');
const { jwtStrategy } = require('./lib/passport');

const { db } = require('./middlewares');
const { accessLogger, errorLogger } = require('./logger');
const config = require('./config');
const routes = require('./routes');

app.use(db());
app.use(logger());
app.use(accessLogger());
app.use(cors(config.CORS));
app.use(conditional());
app.use(eTag());
app.use(bodyParser());

app.use(passport.initialize());
passport.use(jwtStrategy);
// routes
routes(app);

// error-handling
app.on('error', (err, ctx) => {
  errorLogger.error(err);
});

if (!module.parent) {
  app.listen(config.PORT, () => {
    debug(`Server start at ${config.PORT}`);
  });
}

module.exports = app;
