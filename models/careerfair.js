const mongoose = require('mongoose');


const careerfairSchema = mongoose.Schema({

    term: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    comapanies: {

    }

});

module.exports = mongoose.model('Careerfair', careerfairSchema);