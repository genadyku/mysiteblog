const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const config = require('../config.env');

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const createToken = (user) => {
  const tokenData = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(tokenData, process.env.SECRET, {
    expiresIn: process.env.expirein,
  });
  return token;
};

const createRefreshToken = (data) => {
  return jwt.sign(
    { type: 'refresh', date: Date.now(), data },
    process.env.SECRET,
    { expiresIn: process.env.refreshExpireIn }
  );
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  if (req.query && req.query.token) {
    return req.query.token;
  }
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  return null;
};

module.exports = {
  createToken,
  createRefreshToken,
  getToken,
  verifyPassword,
};
