const User = require('../models/user')
const mongoose = require('mongoose')

async function setUser(req, res, next) {
  if(!mongoose.Types.ObjectId.isValid(req.query.userId)){
    req.user = null
    return next()
  }
  req.user = await User.findById(req.query.userId)
  next()
}

async function ensureSession(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('You must be logged in to do that.')
  }
}

module.exports = {
  setUser,
  ensureSession
}