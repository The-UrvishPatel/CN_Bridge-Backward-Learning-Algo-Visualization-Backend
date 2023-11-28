const { StatusCodes } = require('http-status-codes')

const Errors = require('../errors/index')

const utils = require('../utils')


const forward = async (req, res) => {

    let { selectedEdges, nodes, bridgeTables, sender, receiver } = req.body

    let answer = utils.forwardTracing(selectedEdges, nodes, bridgeTables, sender, receiver)

    return res.status(StatusCodes.OK).json({

        ...answer,
        isValid: true,
    })

} 

module.exports = forward