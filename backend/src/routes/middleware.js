const User = require('../models/user')
const mongoose = require('mongoose')

async function setUser(req, res, next) {
  req.user = null
  if(mongoose.Types.ObjectId.isValid(req.query.userId)){
    req.user = await User.findById(req.query.userId)
  }
  next()
}

async function ensureSession(req, res, next) {
  if (!req.user) {
    return res.status(401).send('You must be logged in to do that.')
  }
  next()
}

module.exports = {
  setUser,
  ensureSession
}