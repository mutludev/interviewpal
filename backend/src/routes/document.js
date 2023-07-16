const express = require('express')
const router = express.Router()
const Document = require('../models/document')
const { ensureSession } = require('./middleware')

router.get('/', ensureSession , async (req, res) => {
  const documents = await req.user.getDocuments()
  res.json(documents)
})

router.get('/:id', ensureSession , async (req, res) => {
  try {
    const document = await req.user.getDocument(req.params.id)
    res.json(document)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.put('/:id', ensureSession , async (req, res) => {
  try {
    const document = await req.user.getDocument(req.params.id)
    document.set(req.body)
    await document.save()
    res.json(document)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.delete('/:id', ensureSession , async (req, res) => {
  try {
    const document = await req.user.getDocument(req.params.id)
    if(!document) throw new Error('Document not found')
    await Document.deleteOne({_id: document._id})
    req.user.documents = req.user.documents.filter(id => id != document._id)
    await req.user.save()
    res.json(document)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/', ensureSession , async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const id = new mongoose.Types.ObjectId();

  let document = new Document({
    _id: id,
    name: req.params.name || req.files.file.name,
    tag: req.params.tag,
    date: Date.now(),
  })

  console.log(req.file)

  res.send('File uploaded!');

})


module.exports = router