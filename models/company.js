const mongoose = require('mongoose');

const companySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    domain: {
        type: String,
        required: true
    },
    companyUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'    
    }
});


module.exports = mongoose.model('Company', companySchema);