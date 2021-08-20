const router = require('express').Router();
//const NotFoundError = require('../errors/not-found-err');

const userRouters = require('./users');
const movieRouters = require('./movies');

router.use('/users', userRouters);
router.use('/movies', movieRouters);

// router.use((req, res, next) => {
//   const err = new NotFoundError('Запрашиваемый ресурс не найден');
//   next(err);
// });

module.exports = router;
