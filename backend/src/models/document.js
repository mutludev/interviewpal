const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: String,
  tag: String,
  date: Date,
})

module.exports = mongoose.model('Document', documentSchema);