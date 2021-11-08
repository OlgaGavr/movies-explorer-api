const { Status } = require('./er-status');

class MongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.CONFLICT;
  }
}

module.exports = MongoError;
