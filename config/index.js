require('dotenv').config();

const {
  PORT, JWT_SECRET, DB_ADRESS, NODE_ENV,
} = process.env;

const CURRENT_JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'some-secret-key';
const CURRENT_DB_ADRESS = NODE_ENV === 'production' && DB_ADRESS ? DB_ADRESS : 'mongodb://localhost:27017/moviesdb';
const CURRENT_PORT = NODE_ENV === 'production' && PORT ? PORT : '3000';

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_DB_ADRESS,
  CURRENT_PORT,
};
