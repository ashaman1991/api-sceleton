/**
 * Common error responses
 */
const errorCodes = {
  400: {
    code: 'E_BAD_REQUEST',
    status: 400,
    message: 'The request cannot be fulfilled due to bad syntax'
  },
  401: {
    code: 'E_UNAUTHORIZED',
    status: 401,
    message: 'Missing or invalid authentication token'
  },
  403: {
    code: 'E_FORBIDDEN',
    status: 403,
    message: 'User not authorized to perform the operation'
  },
  404: {
    code: 'E_NOT_FOUND',
    status: 404,
    message: 'The requested resource could not be found but may be available again in the future'
  },
  500: {
    code: 'E_INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Something bad happened on the server'
  }
};

/**
 * @param  {Integer} status - HTTP status code
 * @param  {String} message - error message
 * @param  {String} code - internal error code
 * @param  {object} data - extra error data
 * @returns {object} ApiError object
 */
class ApiError extends Error {
  constructor(status = 500,
    message = (errorCodes[status] && errorCodes[status].message) || errorCodes[500].message,
    code = (errorCodes[status] && errorCodes[status].code) || errorCodes[500].code,
    data = {}) {
    super();
    this.status = status;
    const rawData = {
      message,
      code,
      data
    };
    this.message = rawData;
  }
}

/**
 * Error handling middleware
 */
// eslint-disable-next-line no-unused-vars
function handler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json(err.message);
  }
  return res.status(500).send(err);
}

module.exports = {
  ApiError,
  handler
};
