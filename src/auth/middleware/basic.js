'use strict';

const base64 = require('base-64');
const { users } = require('../../index.js');

module.exports = async (req, res, next) => {

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    next(e.message);
  }
}