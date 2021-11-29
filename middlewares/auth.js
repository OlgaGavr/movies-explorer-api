const jwt = require('jsonwebtoken');
const NotAutorizationError = require('../errors/not-autorization-error');
const { CURRENT_JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAutorizationError(''); //  Необходима авторизация
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, CURRENT_JWT_SECRET);
  } catch (e) {
    const err = new NotAutorizationError('');
    next(err);
  }
  req.user = payload;
  next();
};
