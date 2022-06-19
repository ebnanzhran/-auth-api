'use strict';

const { users } = require('../../index.js');

module.exports = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    next(e.message);
  }
}