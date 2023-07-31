const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const { setUser } = require('./routes/middleware')

const app = express()
app.use(bodyParser.json())
app.use(fileUpload());
app.use(setUser)

require('./db-connection')

app.use('/api', require('./routes/api'))

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})