const { Status } = require('./er-status');

class OwnerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.FORBIDDEN;
  }
}

module.exports = OwnerError;
