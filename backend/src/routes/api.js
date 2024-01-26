const express = require('express')
const router = express.Router()

router.use('/job', require('./job'))
router.use('/user', require('./user'))

module.exports = router