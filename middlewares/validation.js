const { celebrate, Joi } = require('celebrate');

const postSignUpValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    password: Joi.string().required().min(6),
  }),
});

const postSignInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    password: Joi.string().required().min(6),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
  }),
});

const createMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9~:_@%.#=]{1,256}\.[a-zA-Z0-9]{1,3}([-a-zA-Z0-9~/?!$&'()*+,;:@%.#=]*)?/),
    trailer: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9~:_@%.#=]{1,256}\.[a-zA-Z0-9]{1,3}([-a-zA-Z0-9~/?!$&'()*+,;:@%.#=]*)?/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9~:_@%.#=]{1,256}\.[a-zA-Z0-9]{1,3}([-a-zA-Z0-9~/?!$&'()*+,;:@%.#=]*)?/),
    movieId: Joi.number().integer().required(),
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
