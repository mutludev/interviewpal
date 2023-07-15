const express = require('express')
const router = express.Router()

const middleware = require('./middleware')
const job = require('./job')


router.use(middleware.setUser)

router.use('/job', job)

module.exports = router