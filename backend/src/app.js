const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const { setUser } = require('./routes/middleware')
const sessions = require("client-sessions");
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()


const app = express()
app.use(cors({
    origin: 'https://interviewpal.netlify.app',
}))
app.use(sessions({
    cookieName: 'authSession', // cookie name dictates the key name added to the request object
    secret: process.env.SESSION_SECRET, // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));
app.use(bodyParser.json())
app.use(fileUpload());
app.use(setUser)



require('./db-connection')

app.use('/api', require('./routes/api'))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${3000}`)
})