const router = require('express').Router();
const { createMovieValidate, delMovieValidate } = require('../middlewares/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.post('/', createMovieValidate, createMovie);
router.get('/', getMovies);
router.delete('/:movieId', delMovieValidate, deleteMovie);

module.exports = router;
