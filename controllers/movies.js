const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const OwnerError = require('../errors/owner-error');
const CastError = require('../errors/bad-id-error');

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movie) => res.status(200).send({ data: movie }))
    .catch(next);
}

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      owner: req.user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      next(err);
    })
    .catch(next);
};

function deleteMovie(req, res, next) {
  return Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет такого фильма');
      }

      if (!movie.owner.equals(req.user._id)) {
        throw new OwnerError('Вы не можете удалять фильмы других пользователей');
      }

      return Movie.findByIdAndRemove(movie)
        .then((movieDel) => {
          res.status(200).send({ data: movieDel });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    })
    .catch(next);
}

module.exports = {
  createMovie, getMovies, deleteMovie,
};
