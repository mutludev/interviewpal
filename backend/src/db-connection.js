const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI || "localhost", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))

module.exports = mongoose.connection