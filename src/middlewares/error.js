import httpStatus from "http-status";
import APIError from "../utils/APIError";

const handler = (err, req, res, next) => {
  const response = {
    status: String(err.status).startsWith("4") ? "fail" : "error",
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (process.env.NODE_ENV !== "development") {
    delete response.stack;
  }

  return res.status(err.status).json(response);
};

/**
 * Convert other types of error (ex: db error) into APIError for consistent response
 */

const converter = (err, req, res, next) => {
  let convertedError = new APIError({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.type == "validation") {
    convertedError.status = httpStatus.BAD_REQUEST;
    convertedError.errors = err.errors;
  }
};

/**
 * Handle 404
 */
const notFound = (req, res, next) => {
  const err = new APIError({
    status: httpStatus.NOT_FOUND,
    message: "Not found!",
  });
  return handler(err, req, res);
};

export { handler, converter, notFound };
