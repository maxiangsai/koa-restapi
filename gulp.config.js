'use strict';

const {
  DEPLOY_HOST,
  DEPLOY_PORT,
  DEPLOY_USERNAME,
  DEPLOY_PASSWORD,
  DEPLOY_COMMANDS
} = process.env;
module.exports = {
  host: DEPLOY_HOST,
  port: DEPLOY_PORT,
  username: DEPLOY_USERNAME,
  password: DEPLOY_PASSWORD,
  commands: DEPLOY_COMMANDS
};
