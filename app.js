const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const routesIndex = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CURRENT_PORT, CURRENT_DB_ADRESS } = require('./config');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3003',
    'http://mestechko.students.nomoredomains.club',
    'https://mestechko.students.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
app.use(cors(options));

mongoose.connect(CURRENT_DB_ADRESS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(routesIndex);
app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(CURRENT_PORT);
