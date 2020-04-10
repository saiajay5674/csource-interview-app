const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Interview', interviewSchema);