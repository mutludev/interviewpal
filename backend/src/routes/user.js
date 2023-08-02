const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { compare, hash } = require('bcrypt')

const { ensureSession } = require('./middleware')

router.get('/', ensureSession , async (req, res) => {
  req.user.password = null
  res.send(req.user)
})

router.post('/', async (req, res) => {
  const passwordHash = await hash(req.body.password, 10)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash
  })
  try {
    const result = await user.save()
    res.send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.put('/', ensureSession, async (req, res) => {
  try {
    Object.assign(req.user, {name, email} = req.body)
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email })
    if(!user) {
      throw new Error('Invalid login credentials')
    }
    console.log(req.body.password, user.password)
    const isPasswordMatch = await compare(req.body.password, user.password)
    if(!isPasswordMatch) {
      throw new Error('Invalid login credentials')
    }
    req.authSession.userId = user._id
    return res.send({
      user
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router