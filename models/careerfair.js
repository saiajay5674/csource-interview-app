const mongoose = require('mongoose');

const Company = require('./company');


const careerfairSchema = mongoose.Schema({

    term: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    comapanies: [{
        type: String,
        default: []
    }],
    students: [{

    }],
    interviews: [{
        type: String,
        defualt: []
    }]

});

module.exports = mongoose.model('Careerfair', careerfairSchema);