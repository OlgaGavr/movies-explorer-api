const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouters = require('./users');
const movieRouters = require('./movies');
const { postSignUpValidate, postSignInValidate } = require('../middlewares/validation');

router.post('/signin', postSignInValidate, login);
router.post('/signup', postSignUpValidate, createUser);

router.use(auth);
router.use('/users', userRouters);
router.use('/movies', movieRouters);

router.use((req, res, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

module.exports = router;
