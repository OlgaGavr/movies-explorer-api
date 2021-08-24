const { celebrate, Joi } = require('celebrate');

const postSignUpValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const postSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().uri().valid(),
    trailer: Joi.string().uri().valid(),
    nameRu: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().valid(),
    movieId: Joi.string().hex().length(24),
  }),
});

const delMovieValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  postSignUpValidate,
  postSignInValidate,
  updateUserValidate,
  createMovieValidate,
  delMovieValidate,
};
