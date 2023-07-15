const User = require('../models/user')

async function setUser(req, res, next) {
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