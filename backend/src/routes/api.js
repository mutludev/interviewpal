const express = require('express')
const router = express.Router()

const middleware = require('./middleware')

const job = require('./job')
const user = require('./user')
const document = require('./document')


router.use(middleware.setUser)

router.use('/job', job)
router.use('/user', user)
router.use('/document', document)

module.exports = router