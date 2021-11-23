const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const MongoError = require('../errors/mongo-error');
const CastError = require('../errors/bad-id-error');
const NotAutorizationError = require('../errors/not-autorization-error');
const { CURRENT_JWT_SECRET } = require('../config');

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const ownerId = req.user._id;

  const options = { runValidators: true, new: true };

  return User.findByIdAndUpdate(ownerId, { name, email }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      if (err.name === 'MongoError') throw new MongoError('Пользователь уже существует');
      next(err);
    })
    .catch(next);
};

const createUser = (req, res, next) => bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  }))
  .then((user) => res.send({
    name: user.name,
    email: user.email,
    id: user._id,
  }))
  .catch((err) => {
    if (err.name === 'ValidationError') throw new ValidationError('При регистрации пользователя произошла ошибка.');
    if (err.name === 'MongoError') throw new MongoError('Пользователь с таким email уже существует.');
    next(err);
  })
  .catch(next);

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAutorizationError('Вы ввели неправильный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAutorizationError('Вы ввели неправильный логин или пароль.');
          }
          const token = jwt.sign({ _id: user._id }, CURRENT_JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  createUser, updateProfile, login, getMe,
};
