const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')
const middlewares = require('../middlewares/index')


router.route('/mst').post(middlewares.check, controllers.getMST)
router.route('/forward').post(middlewares.check, controllers.forward)

module.exports = router