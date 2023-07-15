const express = require('express')
const bodyParser = require('body-parser')
require('./db-connection')

const app = express()
app.use(bodyParser.json())
const port = 3000
const api = require('./routes/api')

app.use('/api', api)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})