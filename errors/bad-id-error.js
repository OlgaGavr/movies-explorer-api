const { Status } = require('./er-status');

class BadIdError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.BAD_REQUEST;
  }
}

module.exports = BadIdError;
