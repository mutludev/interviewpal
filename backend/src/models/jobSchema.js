const mongoose = require('mongoose');
const contactSchema = require("./contactSchema");

const jobSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    company: {
        type: String,
        required: [true,"Company name is required"]
    },
    title: {
        type: String,
        required: [true,"Title is required"]
    },
    url: String,
    salary: String,
    Location: String,
    description: String,
    notes: String,
    deadline: Date,
    contacts: [contactSchema],
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
    activities: [
        {
            title: String,
            tag: String,
            date: Date,
            notes: String,
            done: Boolean
        }
    ]
})

module.exports = jobSchema