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
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: []
    }],
    students: [{
        type: String,
        default: []
    }],
    interviews: [{
        type: String,
        defualt: []
    }]

});

module.exports = mongoose.model('Careerfair', careerfairSchema);