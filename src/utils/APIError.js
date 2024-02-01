class APIError extends Error {
  constructor({
    status = 500,
    message,
    errors,
    isOperational = true,
    stack = "",
  }) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default APIError;
