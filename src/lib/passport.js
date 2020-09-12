'use strict';

const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { JWT: { secret, options } } = require('../config');
const User = require('../models/user');

const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};
// jwt验证头部token策略
const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

// jwt签发token
const sign = (user) => {
  const token = jwt.sign({
    userId: user._id,
    username: user.username
  }, secret, options);
  return token;
};

module.exports = {
  jwtStrategy,
  sign
};
