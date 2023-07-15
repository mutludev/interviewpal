const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  phone: String,
  notes: String,
})

module.exports = contactSchema