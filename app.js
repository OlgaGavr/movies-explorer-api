const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { cors } = require('cors');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const routesIndex = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CURRENT_PORT, CURRENT_DB_ADRESS } = require('./config');
const { Options } = require('./middlewares/cors');

const app = express();
app.use(cors(Options));

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
console.log('clushayu port', CURRENT_PORT);
