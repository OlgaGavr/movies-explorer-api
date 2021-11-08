const { Status } = require('./er-status');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.BAD_REQUEST;
  }
}

module.exports = ValidationError;
