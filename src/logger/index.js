'use strict';

const path = require('path');
const log4 = require('koa-log4');

log4.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join(__dirname, 'logs', 'access')
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join(__dirname, 'logs', 'application')
    },
    out: {
      type: 'console'
    }
  },

  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'WARN' }
  }
});

module.exports = {
  // 记录所有访问级别的日志
  accessLogger: () => log4.koaLogger(log4.getLogger('access')),
  // 记录所有应用级别的日志
  errorLogger: log4.getLogger('application')
};
