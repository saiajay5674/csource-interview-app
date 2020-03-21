const mongoose = require('mongoose');

const companySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    domain: {
        type: String
    }
});


module.exports = mongoose.model('Company', companySchema);