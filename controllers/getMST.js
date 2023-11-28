const { StatusCodes } = require('http-status-codes')

const Errors = require('../errors/index')

const utils = require('../utils')

const getMST = async (req, res) => {

    let data = req.body

    // data = {

    //     edges : [

    //         { "from": "D1", "to": "P1" },
    //         { "from": "P1", "to": "B1" },
    //         { "from": "D2", "to": "P2" },
    //         { "from": "P2", "to": "B1" },
    //         { "from": "D3", "to": "P3" },
    //         { "from": "P3", "to": "B1" },
    //         { "from": "P4", "to": "B1" },
    //         { "from": "P4", "to": "P5" },
    //         { "from": "P5", "to": "B2" },
    //         { "from": "B2", "to": "P6" },
    //         { "from": "P6", "to": "D5" },
    //         { "from": "B2", "to": "P7" },
    //         { "from": "P7", "to": "H1" },
    //         { "from": "H1", "to": "D6" },
    //         { "from": "H1", "to": "D7" },
    //         { "from": "B2", "to": "P8" },
    //         { "from": "P8", "to": "L1" },
    //         { "from": "D4", "to": "L1" },
    //         { "from": "D8", "to": "L1" },
    //     ],

    //     nodes : [

    //         { "id": "B1" },
    //         { "id": "D1" },
    //         { "id": "D2" },
    //         { "id": "D3" },
    //         { "id": "D4" },
    //         { "id": "D5" },
    //         { "id": "D6" },
    //         { "id": "D7" },
    //         { "id": "D8" },
    //         { "id": "B2" },
    //         { "id": "H1" },
    //         { "id": "P1" },
    //         { "id": "P2" },
    //         { "id": "P3" },
    //         { "id": "P4" },
    //         { "id": "P5" },
    //         { "id": "P6" },
    //         { "id": "P7" },
    //         { "id": "P8" },
    //         { "id": "L1" }
    //     ],

    //     // tables: {

    //     //     "B1" : {
    //     //         "P1B1": [],
    //     //         "P2B1": [],
    //     //         "P3B1": [],
    //     //         "P4B1": []
    //     //     },
    //     //     "B2": {
    //     //         "P1B2": [],
    //     //         "P2B2": [],
    //     //         "P3B2": [],
    //     //         "P4B2": []
    //     //     },
    //     //     "B3":{
    //     //         "P1B3": [],
    //     //     }

    //     // }

    // }


    let MST = utils.mst(data)
    
    return res.status(StatusCodes.OK).json({
        
        ...MST,
        isValid: true,
    })
}

module.exports = getMST