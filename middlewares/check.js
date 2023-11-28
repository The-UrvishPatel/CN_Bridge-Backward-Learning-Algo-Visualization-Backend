const {StatusCodes} = require('http-status-codes')

const check = (req, res, next) => {

    next()
    // res.status(StatusCodes.OK).send('Check Done')
}

module.exports = check