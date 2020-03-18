const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({

    company: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Interview', interviewSchema);