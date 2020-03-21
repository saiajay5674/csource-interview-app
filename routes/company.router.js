const express = require('express');
const router = express.Router();

const Company = require('../models/company');

//Get ALL companies
router.get('/', (req, res, next) => {

    console.log('Received GET request')

    Company.find((error, companies) => {
        res.json(companies);
    });
});

//Create new company
router.post('/', (req, res, next) => {

    console.log('Received POST request');
    console.log(req.body);


    let newCompany = new Company({
        name: req.body.name,
        domain: req.body.domain
    });

    newCompany.save((error, company) => {

        if (error) {
            res.json({msg: 'Failed to add company ' + error});
        }
        else {
            res.json({msg: 'New company has been added', company});
        }
    });
});

//Delete a company
router.delete('/:id', (req, res, next) => {

    Company.remove({_id: req.params.id}, (error, result) => {
        if (error) {
            res.json(error);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;