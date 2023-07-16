const mongoose = require('mongoose')
const jobSchema = require("./jobSchema");
const Document = require('./document')

const user = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      required: true
  },
  jobs: [jobSchema],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
})

user.methods.getDocuments = async function() {
  let documents = []
  for(let documentId of this.documents) {
    let document = await Document.findById(documentId)
    documents.push(document)
  }
  return documents
}

user.methods.getDocument = async function(id) {
  if(!this.documents.includes(id)) throw new Error('Document not found')
  let document = await Document.findById(id)
  if(!document) throw new Error('Document not found')
  return document
}

module.exports = mongoose.model('User', user)