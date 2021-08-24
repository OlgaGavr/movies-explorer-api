const { Status } = require('./er-status');

class NotAutorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.UNAUTHORIZED;
  }
}

module.exports = NotAutorizationError;
