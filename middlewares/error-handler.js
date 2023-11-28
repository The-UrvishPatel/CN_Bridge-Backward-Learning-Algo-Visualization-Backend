const { StatusCodes } = require('http-status-codes')

const Errors = require('../errors/index')

const errorHandler = (err, req, res, next) => {

  let customError = {
    
    // set default

    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
    isValid: err.isValid || false
  
  }

  
  if (err instanceof Errors.CustomAPIError) {

    return res.status(err.statusCode).json({ msg: err.message, isValid: err.isValid })
  
  }

  
  return res.status(customError.statusCode).json({ msg: customError.msg, isValid: customError.isValid })
}

module.exports = errorHandler
