const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    passport: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);