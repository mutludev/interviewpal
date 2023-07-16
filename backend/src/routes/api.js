const express = require('express')
const router = express.Router()

const middleware = require('./middleware')

const job = require('./job')
const user = require('./user')


router.use(middleware.setUser)

router.use('/job', job)
router.use('/user', user)

module.exports = router